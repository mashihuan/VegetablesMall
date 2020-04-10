<template>
	<view class="menu-list">
		<view class="menu-item" v-for="(item, index) of menuList" :key="index" @tap="goToDetail(item, index)">
			<image lazy-load="true" :src="item.recipe_image"></image>
			<text>{{item.name}}</text>
		</view>
		<view class="nodata" v-if="menuList.length <= 0">
			<image src="/static/images/mine/nodata1.png"></image>
			<view>没有更多了...</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			menuList: Array,
			goToDetail: Function
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.nodata {
	width: 100%;
	padding-top: 50upx;
	@extend .nodata;
	image {
		width: 300upx;
		height: 300upx;
	}
}
.menu-list {
	display: flex;
	flex-wrap: wrap;
	padding: 40upx;
	.menu-item {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin-bottom: 40upx;
		image {
			width: 320upx;
			height: 240upx;
			border-radius: 15upx;
		}
		text {
			margin-top: 20upx;
			font-size: 24upx;
			color: $subTitle-color;
		}
	}
}
</style>
