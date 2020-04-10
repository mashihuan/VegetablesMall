<template>
	<view class="apply" style="min-height: 100%">
		<list-cell title="申请类型" :value="applyType" :cellClick="cellClick"></list-cell>
		<view class="apply-content">
			<view class="title">详细说明</view>
			<textarea name="" v-model="content" id="" cols="30" rows="10" placeholder="请输入您的详细说明"></textarea>
			<view class="title">上传图片</view>
			<view class="imageList">
				<view class="img-wrap" v-for="(item, index) of imgList" :key="index">
					<image :src='item'></image>
					<view class="close-icon iconfont" @tap="deleteImg(index)">&#xe603;</view>
				</view>
				<view class="add-btn" @tap="addImg"></view>
			</view>
			<view class="apply-personal">
				<view class="item">
					<view>联系人：</view><input v-model="name" type="text" placeholder="输入姓名">
				</view>
				<view class="item">
					<view>联系电话：</view><input v-model="phone" type="text" placeholder="输入联系电话">
				</view>
				<view class="item">
					<view>联系地址：</view><input v-model="address" type="text" placeholder="输入联系地址">
				</view>
			</view>
		</view>
		<click-button text="提交" :buttonClick="buttonClick"></click-button>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell'
	import clickButton from '@/components/click-button'
	import { afterSalePage, submitAfterSale, uploadAwatar, BASE_URL } from '@/api'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				imgList: [],
				applyType: '选择申请类型',
				applyTypeList: [], // 申请类型
				addressInfo: {},
				content: '',
				order_id: '',
				name: '',
				phone: '',
				address: ''
			};
		},
		onLoad (options) {
			this._getAfterSaleInfo(options.sn);
			// this.order_id = options.id;
		},
		methods: {
			async _getAfterSaleInfo (sn) {  // 申请详情
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await afterSalePage ({
					token: uni.getStorageSync('token'),
					order_sn: sn,
					// order_id: id
				})
				uni.hideLoading()
				if(result.recode == 10000) {
					this.applyTypeList = result.data.type;
					this.addressInfo = result.data.order_sn;
				}else {
					this.applyTypeList = []
				}
			},
			async buttonClick () {  // 提交申请
				if(this.applyType == '选择申请类型') {
					uni.showToast({
						title: '请选择申请类型',
						icon: 'none'
					})
					return
				}
				if(this.name == '') {
					uni.showToast({
						title: '请输入联系人姓名',
						icon: 'none'
					})
					return;
				}
				if(this.phone == '') {
					uni.showToast({
						title: '请输入联系电话',
						icon: 'none'
					})
					return;
				}
				let result = await submitAfterSale ({
					token: uni.getStorageSync('token'),
					type: this.applyType,
					images: this.imgList.join(','),
					order_sn: this.addressInfo,
					content: this.content,
					// order_id: this.order_id,
					name: this.name,
					phone: this.phone,
					address: this.address
				})
				if(result.recode == 10000) {
					uni.showToast({
						title: '申请成功',
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}				
			},
			addImg () {  // 添加图片
				let self = this;
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: BASE_URL + '/api/common/upload', 
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								token: uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(JSON.stringify(uploadFileRes.data))
								let result = JSON.parse(uploadFileRes.data);
								if(result.recode == 20026) {
									self.imgList.push(BASE_URL + result.data.url);
								}
							}
						});
					}
				});
			},
			deleteImg (index) {  // 删除图片
				this.imgList.splice(index, 1);
			},
			cellClick () {        // 选择售后类型
				let self = this;
				uni.showActionSheet({
					itemList: self.applyTypeList,
					success: function (res) {
						self.applyType = self.applyTypeList[res.tapIndex]
					}
				});
			}
		},
		components: {
			listCell,
			clickButton,
			uniIcon
		}
	}
</script>

<style scoped lang="scss">
.img-wrap {
	position: relative;
	margin: 30upx;
	border: 1upx dotted #cfcfcf;
	.close-icon {
		position: absolute;
		top: -45upx;
		right: -25upx;
		font-size: 50upx;
	}
}	
.apply {
	min-height: 100%;
	background: #fff;
	.apply-content {
		padding: 0 20upx;
		textarea {
			width: 100%;
			height: 240upx;
			background: $content-bgColor;
			padding: 17upx;
			font-size: 28upx;
			box-sizing: border-box;
		}
		.title {
			font-size: 30upx;
			padding-top: 40upx;
		}
		.imageList {
			display: flex;
			flex-wrap: wrap;
			image {
				width: 140upx;
				height: 140upx;
				display: block;
			}
			.add-btn {
				position: relative;
				width: 140upx;
				height: 140upx;
				margin: 30upx;
				border: 1upx solid #cfcfcf;
				&:after, &:before {
					position: absolute;
					top: 50%;
					left: 50%;
					content: ''
				}
				&:before {
					width: 60upx;
					height: 4upx;
					background: #cfcfcf;
					margin-top: -2upx;
					margin-left: -30upx;
				}
				&:after {
					width: 4upx;
					height: 60upx;
					background: #cfcfcf;
					margin-top: -30upx;
					margin-left: -2upx;
				}
			}
		}
		.apply-personal {
			border-top: 20upx solid $content-bgColor;
			margin: 0 -20upx;
			padding: 30upx 20upx;
			.item {
				display: flex;
				margin-bottom: 25upx;
				input {
					flex: 1;
				}
			}
		}
	}
}
</style>
