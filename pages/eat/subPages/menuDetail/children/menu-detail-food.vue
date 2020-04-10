<template>
	<view class="food">
		<view class="food-title">食材</view>
		<view class="food-list">
			<view class="food-item" v-for="(item, index) of foodList" :key="index">
				<view class="food-name">{{item.second_name}}</view>
					<menuDetail-item :itemList="item.goods" :goToDetail="goToDetail" :addShopCar="addShopCar"></menuDetail-item>
			</view>
		</view>
	</view>
</template>

<script>
import menuDetailItem from './menu-detail-item'
export default {
	props: {
		foodList: Array,
		goToDetail: Function,
		addShopCar: Function
	},
	data() {
		return {};
	},
	methods: {
		scroll() {
			
		}
	},
	components: {
		menuDetailItem
	}
};
</script>

<style scoped lang="scss">
.food {
	margin-top: 20upx;
	padding: 40upx 30upx;
	background: #fff;
	.food-title {
		margin-bottom: 20upx;
		font-size: 32upx;
		color: #292929;
	}
	.food-item {
		.food-name {
			line-height: 70upx;
			font-size: 28upx;
			color: #292929;
		}
	}
}
</style>
