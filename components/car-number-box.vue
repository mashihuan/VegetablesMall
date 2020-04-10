<template>
	<view class="number-box">
		<view class="subtract">-</view>
		<input class="value" type="text" value="1">
		<view class="addition">-</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.number-box  {
	display: flex;
	height: 52.5upx;
	line-height: 52.5upx;
	border: 1upx solid $content-bgColor;
	border-radius: 3upx;
	text-align: center;
	.value {
		width: 50upx;
		line-height: 30upx;
		height: 100%;
		border-right: 1upx solid $content-bgColor;
		border-left: 1upx solid $content-bgColor;
	}
	.subtract, .addition {
		width: 30upx;
		height: 100%;
	}
}
</style>
