<template>
	<view class="swiper-item" :class="{afterSale: afterSale}">
		<view class="swiper-top">
			<image :src="item.goods_image"></image>
			<view class="goods-info">
				<view class="goods-name">{{item.goods_name}}</view>
				<view class="goods-price">￥{{item.shop_price || item.price}}</view>
			</view>
			<view class="goods-num">
				<view class="goods-num" v-if="!afterSale">×{{item.num}}</view>
				<view class="goods-num" v-else-if="item.state">{{item.state}}</view>
				<view class="goods-num" v-else @tap="apply(item)">申请</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		afterSale: String,
		apply: Function,
		item: {type: [Object, Array]},
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.swiper-item.afterSale {
	margin-bottom: 20upx;
	border-radius: 10upx;
}
.swiper-item {
	padding: 30upx 50upx;
	margin-bottom: 1upx;
	background: #fff;
	.swiper-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30upx;
		image {
			width: 140upx;
			height: 140upx;
			margin-right: 40upx;
		}
		.goods-info {
			flex: 1;
			padding-top: 30upx;
			.goods-name {
				line-height: 1;
			}
			.goods-price {
				margin-top: 40upx;
				color: $money-color;
				line-height: 1;
			}
		}
		.goods-num {
			.goods-status {
				color: $money-color;
				line-height: 1;
			}
			.goods-num {
				margin-top: 80upx;
				text-align: right;
				@include fontStyle($size: 28upx, $color: #9b9b9b);
			}
		}
	}
	.goods-total,
	.goods-btn {
		display: flex;
		justify-content: flex-end;
		@include fontStyle($size: 24upx);
	}
	.goods-btn view {
		margin: 30upx 0 0 17upx;
		@extend .shareBtn;
		color: $money-color;
		border: 1upx solid $money-color;
		background: #fff;
	}
	.goods-btn view.cancel {
		@extend .shareBtn;
		color: #999999;
		border: 1upx solid $content-bgColor;
		background: #fff;
	}
}
</style>
