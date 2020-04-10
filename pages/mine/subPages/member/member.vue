<template>
	<view class="wrap" style="height: 100%; background: #fff;">
		<view style="background: #fff; padding-bottom: 30px">
			<view class="member">
				<view class="member-content">
					<!-- 会员特权 -->
					<view class="member-advantage">
						<view class="advantage-item" v-for="(item, index) of memberAdvantage" :key="index">
							<image :src="item.icon"></image>
							<text>{{item.text}}</text>
						</view>
					</view>
					<!-- 会员类型 -->
					<view class="member-type">
						<view class="member-item" @tap="memberTypeClick(item, index)" :class="{active: memberCurrentIndex == index}" v-for="(item, index) of memberType" :key="index">
							<view class="member-day">{{item.name  }}   {{  item.days + '天'}}</view>
							<view class="member-price">{{ '￥' + item.money}}</view>
						</view>
					</view>
					<!-- 支付方式 -->
					<pay-methods @payTypeClick="payTypeClick"></pay-methods>
				</view>
			</view>
			<click-button v-if="isVip == 0" text="立即开通" :buttonClick="buttonClick"></click-button>
			<click-button v-else text="续费" :buttonClick="buttonClick"></click-button>
		</view>
		
	</view>
</template>

<script>
	import payMethods from '@/components/pay-methods'
	import clickButton from '@/components/click-button'
	import { getMemberSet, buyMember, getPersonalInfo } from '@/api'
	export default {
		data() {
			return {
				memberAdvantage: [
					{icon: '/static/images/mine/wode-hy-icon1@2x.png', text: '特价'},
					{icon: '/static/images/mine/wode-hy-icon2@2x.png', text: '两倍积分'}
				],
				memberType: [],
				memberCurrentIndex: 0,
				payCurrentIndex: 0,
				payMethods: '',
				isVip: 0
			};
		},
		onLoad () {
			this._getMemberSet();
		},
		onShow () {
			this._getPersonalInfo()
		},
		methods: {
			async _getMemberSet () {   // 获取会员价格
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await getMemberSet({
					token: uni.getStorageSync('token')
				})
				uni.hideLoading()
				this.memberType = result.data;
				if(result.recode == 10001) {
					uni.redirectTo({
						url: '/pages/login/login/login',
						animationType: 'slide-in-right'
					})
					return;
				}
			},
			async _getPersonalInfo () {
				let result = await getPersonalInfo ({
					token: uni.getStorageSync('token')
				})
				this.isVip = result.data.is_vip;
				if(result.recode == 10001) {
					uni.redirectTo({
						url: '/pages/login/login/login',
						animationType: 'slide-in-right'
					})
					return;
				}
			},
			memberTypeClick (item, index) {  // 会员类型点击
				this.memberCurrentIndex = index;
			},
			payTypeClick (index) {
				this.payCurrentIndex = index;
			},
			async buttonClick () {   // 立即开通
				switch (this.payCurrentIndex) {
					case 0: this.payMethods = 'alipay';
					break;
					case 1: this.payMethods = 'wechat';
					break;
					case 2: this.payMethods = 'burse'
					break;
				}
				
				let result = await buyMember ({
					token: uni.getStorageSync('token'),
					money: this.memberType[this.memberCurrentIndex].money,
					days:  this.memberType[this.memberCurrentIndex].days,
					type: this.payMethods
				})
				if(this.payCurrentIndex == 0) {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: result, 
						success: function (res) {
							if(res.errMsg == "requestPayment:ok") {
								uni.navigateTo({
									url: '/pages/success/index?title=购买成功'
								})
							}
						},
						fail: function (err) {
							console.log('err:' + JSON.stringify(err));
							// uni.showToast({
							// 	title: err.errMsg,
							// 	icon: 'none'
							// })
							uni.redirectTo({
								url: '/pages/fail/index?title=购买失败'
							})
						}
					});
					return;
				};
				if(this.payCurrentIndex == 1) {
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: result, //微信、支付宝订单数据
						success: function (res) {
							console.log('success:' + JSON.stringify(res));
							if(res.errMsg == 'requestPayment:ok') {
								uni.redirectTo({
									url: '/pages/success/index?title=购买成功'
								})
							}
						},
						fail: function (err) {
							console.log('err:' + JSON.stringify(err));
							// uni.showToast({
							// 	title: err.errMsg,
							// 	icon: 'none'
							// })
							uni.redirectTo({
								url: '/pages/fail/index?title=购买失败'
							})
						}
					});
					return;
				}
				if(result.recode == 10000) {
					// tode
					uni.navigateTo({
						url: '/pages/success/index?title=购买成功'
					})
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
					// uni.redirectTo({
					// 	url: '/pages/fail/index?title=购买失败'
					// })
				}
			}
		},
		components: {
			payMethods,
			clickButton
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.member {
	padding: 30upx;
	.member-content {
		padding-top: 20upx;
		margin-bottom: 70upx;
		.member-advantage {
			display: flex;
			align-items: center;
			justify-content: space-around;
			.advantage-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				image {
					width: 80upx;
					height: 80upx;
					margin-bottom: 20upx; 
				}
			}
		}
		.member-type {
			margin-top: 40upx;
			border: 1upx solid #bebebe;
			border-bottom: none;
			min-height: 360upx;
			.member-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 120upx;
				padding: 0 40upx;
				margin-top: 1upx;
				border-bottom: 1upx solid #bebebe;
				margin-top: -1upx;
				.member-day {
					@include fontStyle($size: 28upx, $color: $title-color)
				}
				.member-price {
					@include fontStyle($size: 28upx, $color: $money-color)
				}
			}
			
		}
	}
}
.member-item.active {
	background: #ebf7eb;
}
/* #ifdef APP-PLUS */
.member-item.active {
	background: #ebf7eb;
	border-right: none;
}
/* #endif */
/* #ifdef H5 */
.member-item.active {
	background: #ebf7eb;
	border-right: 1upx solid #bebebe;
}
/* #endif */
</style>
