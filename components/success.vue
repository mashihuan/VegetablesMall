<template>
	<view class="success">
		<image :src="info.icon"></image>
		<view>{{info.text}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: Object
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.success {
	padding-top: 260upx;
	margin-bottom: 190upx;
	text-align: center;
	image {
		width: 200upx;
		height: 200upx;
		margin-bottom: 30upx;
	}
	view {
		font-size: 34upx;
	}
}
</style>
