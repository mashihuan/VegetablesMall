<template>
	<swiper class="swiper" style="height: 234upx; !important">
		<swiper-item v-for="(item, index) of itemList" :key="index">
			<view class="swiper-item">
				<view class="img-wrap" style="position: relative">
					<image  lazy-load="true" :src="item.goods_image" @tap="goToDetail(item)"></image>
					<view v-if="item.restrictions_num" class="item-limit">限{{item.restrictions_num}}份</view>
				</view>
				<view class="item-right">
					<view class="item-name"  @tap="goToDetail(item)">{{item.name}}</view>
					<view class="item-price">￥{{item.price}}</view>
					<view class="item-bottom">
						<view class="item-member-price">
							会员价：
							<text>￥{{item.vip_price == '0.00' ?  item.price : item.vip_price}}</text>
						</view>
						<image src="/static/images/home/shouye-icon-jia@2x.png" @tap="addShopCar(item)"></image>
					</view>
				</view>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	props: {
		itemList: Array,
		addShopCar: Function,
		goToDetail: Function
	},
	data() {
		return {
			
		};
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.swiper-item {
		display: flex;
		align-items: center;
		padding: 25upx 10upx;
		border: 1upx solid $content-bgColor;
		.img-wrap {
			width: 180upx;
			height: 180upx;
			margin-right: 40upx;
		}
		image {
			width: 180upx;
			height: 180upx;
			border-radius: 5upx;
		}
		.item-right {
			flex: 1;
		}
		.item-name {
			@include fontStyle($size: 30upx, $color: #292929);
		}
		.item-price {
			margin-top: 60upx;
			@include fontStyle($color: $money-color);
		}
		.item-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 30upx;
			.item-member-price {
				@include fontStyle() text {
					@include fontStyle($size: 28upx, $color: $money-color);
				}
			}
			image {
				width: 34upx;
				height: 34upx;
			}
		}
	}
	.item-limit {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 0 10upx;
		height: 26upx;
		text-align: center;
		font-size: 18upx;
		color: $limit-color;
		border-radius: 5upx;
		background: $limit-bgColor;
	}
	/*#ifdef APP-PLUS */
	.item-limit {
		height: 26upx;
	}
	/*#endif*/ 
		
	/*#ifdef H5*/ 
	.item-limit {
		min-width: 80upx;
	 	height: 38upx;
	 }
	/*#endif*/ 
</style>
