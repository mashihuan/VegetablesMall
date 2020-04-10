<template>
	<view>
		<view class="car-item" v-for="(item, index) of carList" :key="index">
			<view class="checkbox" :class="{active: item.checked}" @tap="singleClick(item)"></view>
			<image class="car-item-img" :src="item.goods_image" @tap="goToDetail(item)"></image>
			<view class="car-item-info">
				<view class="item-name" @tap="goToDetail(item)">{{item.name}}</view>
				<view class="item-price">
					<text>{{'￥' + item.sinleCarPrice}}</text>
					<view class="number-box">
						<view @tap="changeNumber(item, 'minus')">-</view>
						<input disabled @input="$emit('input', {value:$event.target.value, item: item})" type="number" v-model="item.num" :value="item.num">
						<view @tap="changeNumber(item, 'plus')">+</view>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata" v-if="carList.length <= 0">
			<image src="/static/images/mine/nodata1.png"></image>
			<view>没有更多了...</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			carList: {type: [Array, Object]},
			singleClick: Function,
			changeNumber: Function,
			goToDetail: Function,
			changeInputNumber: Function
		},
		data() {
			return {
				singleChecked: false,
				allChecked: false,
			};
		},
		computed: {
			// dealSinglePrice () {
			// 	this.carList.forEach((val, index) => {
			// 		
			// 	})
			// }
		},
		watch: {
			carList () {
				console.log(222222)
			}
		},
		methods: {
			
		},
		components: {
			
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.nodata {
	@extend .nodata
}	
.checkbox {
	width: 40upx;
	height: 40upx;
	background: url('~@/static/images/car/gwc-icon1@2x.png');
	background-size: 100% 100%;
}
.checkbox.active {
	background: url('~@/static/images/car/gwc-icon2@2x.png');
	background-size: 100% 100%;
}
.car-item {
	display: flex;
	align-items: center;
	padding: 30upx;
	border-radius: 20upx;
	background: #fff;
	margin-bottom: 20upx;
}
.car-item-img {
	width: 180upx;
	height: 160upx;
	margin: 0 40upx 0 30upx;
	border-radius: 15upx;
}
.car-item-info {
	flex: 1;
	.item-name {
		font-size: 28upx;
		color: $title-color;
	}
	.item-price {
		display: flex;
		justify-content: space-between;
		align-items: cetner;
		margin-top: 80upx;
		text {
			font-size: 26upx;
			line-height: 52.5upx;
			color: $money-color;
		}
	}
}
.number-box {
	display: flex;
	width: 160upx;
	height: 52upx;
	overflow: hidden;
	border: 1upx solid #ccc;
	border-radius: 5upx;
	> view {
		width: 50upx;
		height: 52.5upx;
		text-align: center;
		color: #9a9a9a;
		line-height: 52.5upx;
		font-size: 32upx;
	}
	input {
		width: 60upx;
		height: 52.5upx;
		box-sizing: border-box;
		line-height: 52.5upx;
		border-right: 1upx solid #ccc;
		border-left: 1upx solid #ccc;
		text-align: center;
		font-szie: 24upx;
		color: #9a9a9a;
	}
}

</style>
