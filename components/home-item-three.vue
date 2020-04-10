<template>
	<swiper v-if="goods.length > 0" :style="{height: swiperHeight}"  class="swiper" display-multiple-items="3" :autoplay="autoplay" :interval="interval" :duration="duration">
		<swiper-item v-for="item of dealGoods" :key="item.id">
			<view class="item-img-wrap">
				<image lazy-load="true" class="item-img" :src="item.goods_image || item.recipe_image" @tap="goToDetail(item)"></image>
				<view v-if="item.restrictions_num" class="item-limit">限{{item.restrictions_num}}份</view>
			</view>
			<view class="item-desc ellipsis" @tap="goToDetail(item.id)">{{item.name}}</view>
			<view class="item-bottom"  v-if="item.price">
				<view>
					<text class="original_price" :class="{decoration: item.cheap_price !=0 && item.cheap_price !=0.00}">{{ '￥' + item.price }}</text>
					<view class="discount_price" v-if="item.cheap_price !=0 && item.cheap_price !=0.00">{{ '￥' + item.cheap_price}}</view>
				</view>
				<image v-if="item && item.price" src="/static/images/home/shouye-icon-jia@2x.png" @tap="addShopCar(item)"></image>
			</view>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	props: {
		goods: Array,
		goToDetail: Function,
		addShopCar: Function,
		showMoney: Boolean
	},
	data() {
		return {
			autoplay: false,
			interval: 2000,
			duration: 500,
			isSplice: false,
			test: '',
			newGoods: this.goods
		};
	},
	computed: {
		dealGoods () {
			let _goods = this.goods;
			if(_goods.length == 1) {
				_goods = _goods.concat([{}, {}])
			}
			if(_goods.length == 2) {
				_goods.push([{}])
			}
			return _goods
		},
		swiperHeight () {
			let height = 0;
			if(this.showMoney) {
				height = uni.upx2px(270) + 'px'
			}else {
					height = uni.upx2px(348) + 'px'
			}
			return height;
		}
	},
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
@import '../common/mixin.scss';
.swiper {
	padding: 25upx 0;
	swiper-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		.item-img-wrap {
			position: relative;
			width: 220upx;
			height: 200upx;
			border-radius: 20upx;
			.item-img {
				width: 220upx;
				height: 200upx;
				border-radius: 15upx;
			}
		}
		.item-desc {
			width: 100%;
			text-align: left;
			color: #484848;
			margin-top: 20upx;
			font-size: 24upx;
			// line-height: 24upx;
			// height: 24upx;
			padding: 0 15upx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			text {
				padding-left: 10upx;
				font-size: 24upx;
			}
		}
		.item-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			margin-top: 10upx;
			padding: 0 15upx;
			height: 74upx;
			image {
				/* position: relative;
				top: -2upx; */
				width: 32upx;
				height: 32upx;
			}
			text {
				font-size: 20upx;
				color: $money-color;
			}
		}
	}
}
.discount_price {
	line-height: 1;
	font-size: 20upx;
	color: $money-color;
	text-align: left;
}
.decoration {
	text-decoration: line-through;
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
