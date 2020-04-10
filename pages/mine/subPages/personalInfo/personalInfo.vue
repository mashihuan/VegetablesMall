<template>
	<view class="personalInfo">
		<view class="list">
			<list-cell :cellClick="cellClick" title="头像" :awatar="awatar" :isAwatar="true" :isShowArrow="false"></list-cell>
			<list-cell :changeNickname="changeNickname" :cellClick="cellClick" :disabled="false" :value="nickName" v-model="nickName" title="昵称"></list-cell>
			<list-cell :cellClick="cellClick" title="性别" :value="sex" v-model="sex"></list-cell>
			<list-cell :cellClick="cellClick" title="生日" :value="birthday" :bindDateChange="bindDateChange"></list-cell>
			<list-cell :cellClick="cellClick" title="手机号" :value="phone"></list-cell>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell';
import { getPersonalInfo, uploadAwatar, BASE_URL, changePersonalInfo } from '@/api';
function getDate(type) {
	const date = new Date();

	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}

export default {
	data() {
		return {
			awatar: '',
			nickName: '',
			sex: '',
			birthday: '',
			phone: '',
			itemList: ['男', '女'],
			isShowTimePicker: false,
			date: getDate({
				format: true
			})
		};
	},
	onLoad() {
		this._getPersonalInfo();
	},
	methods: {
		// previewAwatar (avatar) {  // 点击头像预览
		// 	uni.previewImage({
		// 		urls: [avatar]
		// 	})
		// },
		async _getPersonalInfo() {
			// 获取个人信息
			uni.showLoading({
				title: '正在加载数据...'
			})
			let result = await getPersonalInfo({
				token: uni.getStorageSync('token')
			});
			uni.hideLoading()
			if (result.recode == '10000') {
				this.awatar = result.data.avatar || '/static/images/mine/wode-zl-tx@2x.png';
				(this.sex = result.data.sex == 1 ? '男' : '女'), (this.nickName = result.data.nickname || '待完善');
				this.birthday = result.data.birthday || '待完善';
				this.phone = result.data.mobile || '待完善';
			}
		},
		async cellClick(params) {
			// item 点击事件
			let self = this;
			if (params == '头像') {
				// 更改头像
				this.changeAwatar();
			}
// 			if (params == '昵称') {
// 				// 更改昵称
// 			}
			if (params == '性别') {
				// 更改性别
				uni.showActionSheet({
					itemList: self.itemList,
					success: e => {
						console.log(e.tapIndex);
						self.sex = self.itemList[e.tapIndex];
						changePersonalInfo({
							token: uni.getStorageSync('token'),
							sex: e.tapIndex + 1
						}).then(res => {
							if(res.recode == 10000) {
								uni.showToast({
									title: '性别修改成功'
								})
							}
						})
						
					}
				});
			}
			if (params == '手机号') {
				// 更改手机号
				uni.navigateTo({
					url: '/pages/mine/subPages/changePhone/changePhone',
					animationType: 'slide-in-right'
				});
			}
		},
		async changeNickname () {
			if(this.nickName == "") {
				uni.showToast({
					title: '昵称不能为空',
					icon: 'none'
				})
				return
			}
			let result = await changePersonalInfo({
				token: uni.getStorageSync('token'),
				nickname: this.nickName
			})
			if(result.recode == 10000) {
				uni.showToast({
					title: '昵称修改成功'
				})
			}else {
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				})
			}
		},
		changeAwatar() {
			let self = this;
			let token = uni.getStorageSync('token');
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					console.log(tempFilePaths)
					uni.uploadFile({
						url: BASE_URL + '/api/common/upload', 
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							token: token
						},
						success: uploadFileRes => {
							console.log(uploadFileRes.data);
							let url = BASE_URL +  JSON.parse(uploadFileRes.data).data.url;
							self.awatar = url;
							self.upHeadimg(url)
						}
					});
				}
			});
		},
		async upHeadimg (url) {
			let result = await changePersonalInfo ({
				token: uni.getStorageSync('token'),
				headimg: url
			})
			
		},
		async bindDateChange(e) {
			// 更改生日
			let result = await changePersonalInfo({
				token: uni.getStorageSync('token'),
				birthday: e.target.value
			})
			if(result.recode == 10000) {
				uni.showToast({
					title: '生日完善成功'
				})
				this.birthday = e.target.value;
			}else {
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				})
			}
		}
	},
	components: {
		listCell
	}
};
</script>

<style scoped lang="scss">
.personalInfo {
	height: 185upx;
	padding: 50upx 30upx;
	background: $headerBar-color;
	.list {
		background: #fff;
		border-radius: 10upx;
		padding: 0 20upx;
	}
}
</style>
