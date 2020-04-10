<template>
	<view>
		<view class="home-item" v-for="item of section" :key="item.id">
			<homeItem-title :title="item.name"></homeItem-title>
			<image class="item-banner" :src="item.image"></image>
			<homeItem-three :addShopCar="addShopCar" :goToDetail="goToDetail" :goods="item.goods"></homeItem-three>
		</view>
	</view>
</template>

<script>
import homeItemTitle from '@/components/home-item-title';
import homeItemThree from '@/components/home-item-three';
export default {
	props: {
		section: Array,
		goToDetail: Function,
		addShopCar: Function
	},
	data() {
		return {};
	},
	components: {
		homeItemTitle,
		homeItemThree
	}
};
</script>

<style scoped lang="scss">
.home-item {
	padding: 0 20upx;
	margin-bottom: 20upx;
	text-align: center;
	background: #fff;
	.item-banner {
		width: 100%;
		height: 300upx;
	}
}
</style>
