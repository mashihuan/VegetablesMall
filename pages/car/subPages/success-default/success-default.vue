<template>
	<view>
		<success :info="info"></success>
		<click-button text="确定" :buttonClick="buttonClick"></click-button>
	</view>
</template>

<script>
	import success from '@/components/success'
	import clickButton from '@/components/click-button'
	export default {
		data() {
			return {
				info: {icon: '/static/images/order/dingdan-qrdd-icon-chenggong@2x.png', text: '支付成功'}
			};
		},
		methods: {
			buttonClick () {
				uni.navigateBack()
			}
		},
		components: {
			success,
			clickButton
		}
	}
</script>

<style scoped lang="scss">

</style>
