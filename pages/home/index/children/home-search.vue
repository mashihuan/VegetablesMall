<template>
	<view class="search-wrap">
		<view class="search-bar">
			<view class="search-address">
				<image class="address-icon" src="/static/images/home/shouye-icon-wz@2x.png"></image>
				<text class="address-text">{{currentCity}}</text>
			</view>
			<header-search :searchInputClick="searchInputClick"></header-search>
		</view>
		<!-- 配送信息 -->
		<view class="delivery-info">
			<view class="delivery-time">
				<image src="/static/images/home/shouye-icon-ps@2x.png"></image>
				<text>最快29分钟到达</text>
			</view>
			<view class="delivery-money">
				<!-- <image src="/static/images/home/shouye-icon-fy@2x.png"></image> -->
				<text class="iconfont">&#xe63c;</text>
				<text>保障新鲜到家</text>
			</view>
			<view class="delivery-reason">
				<image src="/static/images/home/shouye-icon-th@2x.png"></image>
				<text>无理由退换货</text>
			</view>
		</view>
	</view>
</template>

<script>
import headerSearch from '@/components/header-search.vue'
export default {
	props: {
		currentCity: String,
		searchInputClick: Function
	},
	components: {
		headerSearch
	}
};
</script>

<style scoped lang="scss">
.search-wrap {
	position: fixed;
	top: var(--status-bar-height);
	left: 0;
	width: 100%;
	background: #60c450;
	z-index: 99;
	.search-bar {
		display: flex;
		align-items: center;
		padding: 4upx 25upx 0 30upx;
		.search-address {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			min-width: 80upx;
			margin-right: 16upx;
			.address-icon {
				width: 28upx;
				height: 40upx;
				margin-bottom: 8upx;
			}
			.address-text {
				font-size: 20upx;
				color: #fff;
			}
		}
	}
	.delivery-info {
		display: flex;
		justify-content: space-between;
		padding: 24upx 25upx 18upx 30upx;
		> view {
			display: flex;
			align-items: center;
			image {
				width: 26upx;
				height: 26upx;
				margin-right: 10upx;
			}
			.iconfont {
				margin-right: 10upx;
				font-size: 36upx;
				color: #fff;
			}
			text {
				font-size: 20upx;
				color: #fff;
			}
		}
		& view:nth-of-type(1) {
			image {
				width: 34upx;
				height: 24upx;
			}
		}
	}
}
</style>
