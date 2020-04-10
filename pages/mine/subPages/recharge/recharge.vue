<template>
	<view class="recharge">
		<input type="number" v-model="money" placeholder="充值金额">
		<pay-methods @payTypeClick="payTypeClick" recharge="recharge"></pay-methods>
		<click-button style="padding: 0; margin-top: 200upx;" text="充值" marginTop="100" :buttonClick="buttonClick"></click-button>
	</view>
</template>

<script>
	import payMethods from '@/components/pay-methods'
	import clickButton from '@/components/click-button'
	import { recharge } from '@/api'
	export default {
		data() {
			return {
				money: '',
				pay_way: 1
			};
		},
		methods: {
			async buttonClick () {
				if(this.money == "" || this.money.trim() == "") {
					uni.showToast({
						title: '请输入充值金额',
						icon: 'none'
					})
					return;
				}
				if(this.pay_way == 1) {   // 支付宝
					let result = await recharge ({
						token: uni.getStorageSync('token'),
						money: this.money,
						pay_way: this.pay_way
					})
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: result, 
						success: function (res) {
							if(res.errMsg == "requestPayment:ok") {
								uni.redirectTo({
									url: '/pages/success/index?title=充值成功'
								})
							}
						},
						fail: function (err) {
							// uni.showToast({
							// 	title: err.errMsg,
							// 	icon: 'none'
							// })
							uni.redirectTo({
								url: '/pages/fail/index?title=充值失败'
							})
						}
					});
				}	
				if(this.pay_way == 2) {   // 微信
					let result = await recharge ({
						token: uni.getStorageSync('token'),
						money: this.money,
						pay_way: this.pay_way
					})
					console.log(JSON.stringify(result))
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: result, //微信
						success: function (res) {
							console.log('success:' + JSON.stringify(res));
							if(res.errMsg == 'requestPayment:ok') {
								uni.redirectTo({
									url: '/pages/success/index?title=充值成功'
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
								url: '/pages/fail/index?title=充值失败'
							})
						}
					});
					return;
				}	
			},
			payTypeClick (index) {
				if(index == 0) {
					this.pay_way = 1;
				}
				if(index == 1) {
					this.pay_way = 2;
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
.recharge {
	width: 100%;
	height: 100%;
	background: #fff;
	padding: 100upx 30upx;
	input {
		height: 80upx;
		line-height: 80upx;
		padding: 0 10upx;
		margin-bottom: 80upx;
		border: 1upx solid #d2d2d2;
		border-radius: 10upx;
	}
}
</style>
