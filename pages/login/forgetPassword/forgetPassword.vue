<template>
	<view class="content">
		<view class="input-group">
			<inputCell
				icon="/static/images/login/zhuce-icon-1@2x.png"
				text="请输入您的手机号"
				type="text"
				v-model="phone"
				:padding="true"
			></inputCell>
			<inputCell
				icon="/static/images/login/zhuce-icon-2@2x.png"
				text="请输入短信验证码"
				type="text"
				v-model="sms"
				cellClass="pwd-icon"
				button="button"
				:getCode="getCode"
				:padding="true"
				:count="count"
			></inputCell>
			<inputCell
				icon="/static/images/login/zhuce-icon-3@2x.png"
				text="请设置您的密码"
				type="password"
				v-model="pwd"
				cellClass="pwd-icon"
				:padding="true"
			></inputCell>
			<inputCell
				icon="/static/images/login/zhuce-icon-3@2x.png"
				text="请确认您的密码"
				type="password"
				cellClass="pwd-icon"
				v-model="pwd2"
				:padding="true"
			></inputCell>
		</view>
		<clickButton text="确定修改" :buttonClick="buttonClick"></clickButton>
	</view>
</template>

<script>
import { getSms, forgetPassword } from '@/api'
import inputCell from '@/components/input-cell.vue';
import clickButton from '@/components/click-button'
export default {
	data() {
		return {
			phone: '',
			sms: '',
			pwd: '',
			pwd2: '',
			count: 0
		};
	},
	methods: {
		async getCode () {  // 获取验证码
			let phoneReg = /^1[3456789]\d{9}$/g;
			if(this.phone == "") {
				uni.showToast({
					title: '请输入您的手机号',
					icon: 'none'
				})
				return;
			}
			let result = await getSms({
				mobile: this.phone,
				event: 'reset_pwd'
			})
			if(result.recode == 20023) {
				uni.showToast({
					title: '验证码发送成功',
				})
				this.count = 60;
				let timer = setInterval(() => {
					this.count --;
					if(this.count <= 0) {
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
		async buttonClick () { // 确定修改
			let result = await forgetPassword({
				mobile: this.phone,
				captcha: this.sms,
				password1: this.pwd,
				password2: this.pwd2
			})
			console.log(result)
			if(result.recode == 10000) {
				uni.showToast({
					title: '修改成功',
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/login/login/login'
					})
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
	},
};
</script>

<style lang="scss" scoped>
.content {
	height: 100%;
	background: #fff;
	padding: 0 30upx;
	.input-group {
		margin-bottom: 97upx;
	}
}
</style>
