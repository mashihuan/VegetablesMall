<template>
	<view>
		<view class="login-bg">
			<view class="login-form">
				<inputCell 
					icon="/static/images/login/zhuce-icon-1@2x.png" 
					text="请输入您的手机号" 
					type="text"
					v-model="phone"
				></inputCell>
				<inputCell 
					icon="/static/images/login/zhuce-icon-3@2x.png" 
					text="请输入您的密码" 
					type="password"
					cellClass="pwd-icon"
					v-model="pwd"
				></inputCell>
				<view class="login-nav">
					<navigator animation-type="slide-in-right" animation-duration="300" hover-class="none" url="/pages/login/register/register?id=1">立即注册</navigator>
					<navigator animation-type="slide-in-right" animation-duration="300" hover-class="none" url="/pages/login/forgetPassword/forgetPassword">忘记密码</navigator>
				</view>
				<button hover-class="btn-style" class="login-btn" @tap="userLogin">登 录</button>
				<!-- 三方登录 -->
				<!-- <thirdLogin :animation="animationData" :thirdLoginClick="thirdLoginClick"></thirdLogin> -->
			</view>
		</view>
	</view>
</template>

<script>
	import { login, thirdPartyLogin, BASE_URL } from '@/api'
	import thirdLogin from '@/components/third-login.vue'
	import inputCell from '@/components/input-cell.vue'
	export default {
		data() {
			return {
				phone: '',
				pwd: '',
				animationData: {}
			};
		},
		components: {
			thirdLogin,
			inputCell
		},
		watch: {

		},
		onLoad () {

		},
		onShow () {
			// #ifdef APP-PLUS
			let animation = uni.createAnimation({
				transformOrigin: "50% 50%",
				duration: 1500,
				timingFunction: "ease",
				delay: 0
			})
			animation.rotateX(360).step()
			this.animationData = animation.export()
			// #endif
		},
		methods: {
			// 三方登录
			async thirdLoginClick (e) {
				if(e === 1) {   // 微信
					uni.login({
						provider: 'weixin',
						success: function (loginRes) {
							console.log(JSON.stringify(loginRes));
							uni.showLoading({
								title: '获取权限中...'
							})
							// 获取用户信息
							uni.getUserInfo({
								provider: 'weixin',
								success: function (infoRes) {
									thirdPartyLogin({
										openid: infoRes.userInfo.openId,
										platform: "wechat"
									}).then(res => {
										console.log(JSON.stringify(res))
										uni.hideLoading()
										if(res.recode == 10000) {
											uni.setStorage({
												key: 'token',
												data: res.data.token
											})
											uni.reLaunch({
												url: '/pages/home/index/index',
											})
										}else if (res.recode === 10017) {
											uni.navigateTo({
												url: '/pages/login/verifyPhone/verifyPhone?third_id=' + res.data.third_id
											})
										}else {
											uni.showToast({
												title: res.remsg,
												icon: 'none'
											})
										}
									})
								}
							});
						}
					});
				}
				if(e === 2) {   // 支付宝
					uni.showToast({
						title: '暂未开放，敬请期待',
						icon: 'none'
					})
				}
			},
			// 登录
			async userLogin () {
				let result = await login({
					mobile: this.phone,
					password: this.pwd
				})
				if(result.recode == 10000) {
					uni.setStorage({
						key: 'token',
						data: result.data.token
					})
					uni.reLaunch({
						url: '/pages/home/index/index',
					})
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},	
		}
	}
</script>

<style lang="scss" scoped>
.login-bg {
	height: 628upx;
	padding: 220upx 50upx;
	background: $headerBar-color;
	.login-form {
		height: 690upx;
		padding: 30upx 30upx;
		border-radius: 25upx;
		background: #fff;
		.cell {
			display: flex;
			align-items: center;
			padding: 70upx 30upx 30upx;
			border-bottom: 1upx solid #cfcfcf;
			.cell-icon {
				width: 30upx;
				height:44upx;
			}
			.cell-input {
				padding-left: 30upx;
				flex: 1;
			}
			.pwd-icon {
				width: 38upx;
				height: 46upx;
			}
		}
		.login-nav {
			display: flex;
			justify-content: space-between;
			padding: 40upx 30upx;
			color: $placeholder-color;
		}
		.login-btn {
			width: 400upx;
			background: $headerBar-color;
			border-radius: 15upx;
			color: #fff;
			border: none;
			margin-top: 70upx;
			box-shadow: 4upx 4upx 1upx #ccc;
		}
	}
}
.btn-style {
	opacity: .7;
}
</style>
