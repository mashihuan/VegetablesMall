<template>
	<view class="nodata">
		<image src="/static/images/mine/nodata2.png"></image>
		<view>没有更多了...</view>
	</view>
</template>

<script>
	export default {
		props: {
			nodataImg: String,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
.nodata {
	image {
		width: 200upx;
		height: 200upx;
	}
	view {
		margin-top: 20upx;
		color: #999;
	}
}
</style>
