<template>
	<view>
		<view class="input-group">
			<inputCell icon="/static/images/login/zhuce-icon-1@2x.png"
			text="请输入您的手机号" 
			type="text"
			v-model="phone"
		></inputCell>
		<inputCell
			icon="/static/images/login/zhuce-icon-2@2x.png"
			text="请输入短信验证码"
			type="text"
			v-model="sms"
			cellClass="pwd-icon"
			button="button"
			:getCode="getCode"
			:count="count"
		></inputCell>
		</view>
		<clickButton text="确定" :buttonClick="buttonClick"></clickButton>
	</view>
</template>

<script>
	import inputCell from '@/components/input-cell'
	import clickButton from '@/components/click-button'
	import { getSms, bindPhone } from '@/api'
	export default {
		data() {
			return {
				phone: '',
				sms: '',
				count: 0,
				third_id: ''
			};
		},
		onLoad (options) {
			this.third_id = options.third_id
		},
		// onNavigationBarButtonTap () {
		// 	uni.navigateTo({
		// 		url: '/pages/login/login/login'
		// 	})
		// },
		methods: {
			async buttonClick () {  // 确定验证
				let phoneReg = /^1[3456789]\d{9}$/g;
				if(this.phone == "") {
					uni.showToast({
						title: '请输入您的手机号',
						icon: 'none'
					})
					return;
				}
				if(this.sms === "") {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}
				let result = await bindPhone({
					third_id: this.third_id,
					mobile: this.phone,
					captcha: this.sms
				})
				console.log(JSON.stringify(result));
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
			async getCode () {  // 获取验证码
				let phoneReg = /^1[3456789]\d{9}$/g;
				let self = this;
				if(this.phone == "") {
					uni.showToast({
						title: '请输入您的手机号',
						icon: 'none'
					})
					return;
				}
				let result = await getSms({
					mobile: this.phone,
					event: 'reset_mobile'
				})
				if(result.recode == 20023) {
					uni.showToast({
						title: '验证码发送成功',
					})
					self.count = 60;
					let timer = setInterval(() => {
						self.count --;
						if(self.count <= 0) {
							clearInterval(timer)
						}
					}, 1000)
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
		},
		components: {
			inputCell,
			clickButton
		}
	}
</script>

<style scoped lang="scss">
.input-group {
	margin-bottom: 230upx;
}
</style>
