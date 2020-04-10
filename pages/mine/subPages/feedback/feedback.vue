<template>
	<view>
		<form>
			<textarea name="" v-model="content" placeholder-style="color: #bbbbbb" placeholder="我们想听听你的心声,如果愿意,你也可以留下联系方式,我们期待与您的真诚沟通." id="" cols="30" rows="10"></textarea>
		</form>
		<click-button text="提交" :buttonClick="buttonClick"></click-button>
	</view>
</template>

<script>
	import clickButton from '@/components/click-button'
	import { userFeedback } from '@/api'
	export default {
		data() {
			return {
				content: ''
			};
		},
		methods: {
			async buttonClick () {
				let result = await userFeedback ({
					token: uni.getStorageSync('token'),
					content: this.content
				})
				if(result.recode == 10000) {
					uni.showToast({
						title: '提交成功'
					})
					setTimeout(() => {
						uni.navigateBack({
							url: '/pages/mine/subPages/feedback/feedback',
							animationType: 'slide-in-right'
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
			clickButton
		}
	}
</script>

<style scoped lang="scss">
textarea {
	width: 100%;
	height: 400upx;
	padding: 20upx;
	background: #fff;
	margin-bottom: 40upx;
	box-sizing: border-box;
	line-height: 1.8;
}
</style>
