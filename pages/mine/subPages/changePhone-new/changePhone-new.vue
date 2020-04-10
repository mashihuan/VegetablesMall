<template>
	<view>
		<view class="changePhone">
			<input-cell icon="/static/images/login/zhuce-icon-1@2x.png" :value="phone" v-model="phone" text="请输入您新手机号"></input-cell>
			<input-cell icon="/static/images/login/zhuce-icon-2@2x.png" :count="count" :value="sms" v-model="sms" text="请输入短信验证码" :getCode="getCode" button="button"></input-cell>
		</view>
		<click-button text="确定" :buttonClick="buttonClick"></click-button>
	</view>
	
</template>

<script>
	import inputCell from '@/components/input-cell'
	import clickButton from '@/components/click-button'
	import { getSms, changePhonNew } from '@/api'
	export default {
		data() {
			return {
				phone: '',
				sms: '',
				count: 0
			};
		},
		methods: {
			async getCode () {  // 获取验证码
				let result = await getSms({
					mobile: this.phone,
					event: "reset_mobile"
				})
				if(result.recode == 20023) {
					uni.showToast({
						title: '验证码发送成功'
					})
					this.count = 60;
					let timer = setInterval(() => {
						if(this.count <= 0) {
							this.count = 0;
							clearInterval(timer);
							return;
						}
						this.count --;
					}, 1000)
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
			async buttonClick () {
				let result = await changePhonNew({
					token: uni.getStorageSync('token'),
					mobile: this.phone,
					captcha: this.sms
				})
				console.log(result);
				if(result.recode == 10000) {
					uni.showToast({
						title: '手机号修改成功'
					})
					setTimeout (() => {
						uni.navigateBack()
					}, 2000)
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			}
		},
		components: {
			inputCell,
			clickButton
		}
	}
</script>

<style scoped lang="scss">
.changePhone {
	padding: 0 30upx;
	margin-bottom: 230upx;
}
</style>
