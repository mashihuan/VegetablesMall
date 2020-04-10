<template>
	<view>
		<view class="desc">
			<detail-swiper :previewImage="previewImage" :imgList="detail.goodsimages"></detail-swiper>
			<view class="desc-text">
				<view class="desc-name">{{detail.name}}</view>
				<view class="desc-intro" :style="{color: (colorArr[0])}">{{detail.content}}</view>
				<view class="desc-intro remark" :style="{color: (colorArr[1])}">{{detail.remark}}</view>
				<view class="desc-bottom">
					<view>
						<view class="discount_price" 
							:style="{color: (colorArr[2])}" 
							v-if="detail.cheap_price !=0 && detail.cheap_price !=0.00 && detail.cheap_price"
						>{{detail.cheap}}:{{ '￥' + detail.cheap_price}}</view>
						<text class="original_price" 
						v-if="detail.price"
							:style="{color: (colorArr[3])}" 
							:class="{decoration: detail.cheap_price !=0 && detail.cheap_price !=0.00}"
						>原价:{{ '￥' + detail.price }}</text>
					</view>
					<!-- <view class="desc-price">￥{{detail.price}}</view> -->
					<view class="button" @tap="addShopCar(detail)">加入购物车</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import detailSwiper from '@/components/detail-swiper'
	export default {
		props: {
			detail: Object,
			addShopCar: Function,
			previewImage: Function,
			colorArr: Array
		},
		data() {
			return {
				
			};
		},
		components: {
			detailSwiper
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.desc {
	background: #fff;
	.desc-img {
		width: 100%;
		height: 600upx;
	}
	.desc-text {
		padding: 30upx 30upx 20upx 30upx;    
		.desc-name {
			font-size: 32upx;
			color: $title-color;
		}
		.desc-intro {
			font-size: 24upx;
			color: $subTitle-color;
			margin-top: 10upx;
		}
		.remark {
			font-size: 26upx;
		}
		.desc-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			// margin-top: 10upx;
			.desc-price {
				font-size: 30upx;
				color: $money-color;
			}
			.button {
				@extend .shareBtn;
				height: 60upx;
				line-height: 60upx;
				width: 200upx;
				font-size: 28upx;
			}
		}
	}
	
}
.discount_price, .original_price {
	line-height: 1;
	font-size: 20upx;
	color: $money-color;
	text-align: left;
}
.decoration {
	// text-decoration: line-through;
}
.item-limit {
	position: absolute;
	bottom: 0;
	right: 0;
	// min-width: 60upx;
	padding: 0 10upx;
	height: 26upx;
	font-size: 18upx;
	color: $limit-color;
	border-radius: 5upx;
	background: $limit-bgColor;
}
</style>
