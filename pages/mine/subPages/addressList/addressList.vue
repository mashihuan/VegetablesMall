<template>
	<view class="address">
		<view class="address-item" v-for="(item, index) of addressList" :key="index">
			<view class="address-radio" :class="{active: item.checked}" v-if="!addressStatus" @tap="radioClick(item)"></view>
			<view class="address-left" @tap="choseAddress(item)">
				<view class="address-top">
					<view class="address-name">{{item.name}}</view>
					<view class="address-phone">{{item.mobile}}</view>
				</view>
				<view class="address-content">
					{{item. address_ssq}} {{item.address_content}} 
				</view>
			</view>
			<navigator v-if="addressStatus" :url="'/pages/mine/subPages/addAddress/addAddress?id='+item.id" animation-type="slide-in-right" hover-class="none" class="address-edit-btn">编辑</navigator>
		</view>
		<view class="nodata"  v-if="addressList.length <= 0">
			<image src="/static/images/mine/nodata2.png"></image>
			<view>没有更多了...</view>
		</view>
		<view class="addAddress" v-if="addressStatus" @tap="manergeAddress()">添加新地址</view>
		<view class="addAddress" v-else @tap="manergeAddress()">删除地址</view>
	</view>
</template>

<script>
	import noData from '@/components/no-data'
	import { getAddressList, deleteAddress, BASE_URL } from '@/api'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				addressStatus: true,   // 地址状态  true 管理  false 删除
				addressList: [],
				chose: false
			};
		},
		onLoad (options) {
			if(options.chose) {
				this.chose = true;
			}
		},
		onShow () {
			this._getAddressList();
		},
		methods: {
			...mapMutations(['saveDeliveryAddress']),
			choseAddress (item) {
				if(this.chose) {
					this.saveDeliveryAddress(item)
					uni.navigateBack()
				}
			},
			async _getAddressList () {   // 获取地址列表
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await getAddressList ({
					token: uni.getStorageSync('token')
				})
				uni.hideLoading();
				this.addressList = result.data || [];
			},
			async manergeAddress () {
				let self = this;
				if(this.addressStatus) {   // 添加地址
					uni.navigateTo({
						url: '/pages/mine/subPages/addAddress/addAddress',
						animationType: 'slide-in-right'
					})
				}else {                // 删除地址
					let tempArr = [];
					this.addressList.forEach((val, index) => {
						if(val.checked) {
							tempArr.push(val.id)
						}
					})
					if(tempArr.length <= 0) {
						uni.showToast({
							title: '请选择要删除的地址',
							icon: 'none'
						})
						return;
					}
					uni.showModal({
						title: '提示',
						content: '确定要删除吗？',
						success: function (res) {
							if (res.confirm) {
								uni.request({
									method: 'POST',
									url: BASE_URL + '/app/xaddress/addressdelete',
									data: {
										token: uni.getStorageSync('token'),
										data: tempArr
									},
									success: function (result) {
										console.log(result)
										if(result.data.recode == 10000) {
											uni.showToast({
												title: '删除成功'
											})
											self._getAddressList();
										}else {
											uni.showToast({
												title: result.data.remsg,
												icon: 'none'
											})
										}
									}
								})
							}
						}
					});
				}
			},
			radioClick (item) {
				if(item.checked == 'undefined') {
					this.$set(item, 'checked', true)
				}else {
					this.$set(item, 'checked', !item.checked)
				}
			}
		},
		onNavigationBarButtonTap (e) {
			let self = this;
			let pages = getCurrentPages();  
			let page = pages[pages.length - 1];  
			// #ifdef APP-PLUS  
			let currentWebview = page.$getAppWebview();  
			let titleObj = currentWebview.getStyle().titleNView;  
			if (!titleObj.buttons) {  
					return;  
			}  
			titleObj.buttons[0].text = titleObj.buttons[0].text == "管理" ? "完成" : "管理"; 
			self.addressStatus = titleObj.buttons[0].text == "管理" ? true: false
			//titleObj.buttons[0].text = titleObj.buttons[0].text === "\ue604" ? "\ue605" : "\ue604";  
			currentWebview.setStyle({  
					titleNView: titleObj  
			});  
			// #endif  
		},
		components: {
			noData
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.nodata {
	padding-top: 100upx;
	image {
		width: 200upx;
		height: 200upx;
		margin-bottom: 20upx;
	}
}
.address {
	padding-bottom: 100upx;
	.address-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx 30upx 20upx 30upx;
		background: #fff;
		border-bottom: 1upx solid $content-bgColor;
		.address-radio {
			width: 40upx;
			height: 40upx;
			background: url('~@/static/images/order/dingdan-qrdd-icon-wxz@2x.png');
			background-size: 100% 100%;
			margin-right: 50upx;
		}
		.address-radio.active {
			background: url('~@/static/images/order/dingdan-qrdd-icon-xz@2x.png');
			background-size: 100% 100%;
		}
		.address-left {
			flex: 1;
			padding-right: 80upx;
			.address-top {
				display: flex;
				align-items: center;
				.address-name {
					margin-right: 24upx;
					@include fontStyle($size: 30upx, $color: $title-color)
				}
				.address-phone {
					@include fontStyle($size: 24upx, $color: #989898)
				}
			}
			.address-content {
				margin-top: 20upx;
				@include fontStyle($color: #6d6d6d)
				line-height: 1.8;
			}
		}
		.address-edit-btn {
			@include fontStyle($color: #6d6d6d)
		}
	}
	.addAddress {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 98upx;
		width: 100%;
		background: $headerBar-color;
		font-size: 32upx;
		line-height: 98upx;
		color: #fff;
		text-align: center;
	}
}
</style>
