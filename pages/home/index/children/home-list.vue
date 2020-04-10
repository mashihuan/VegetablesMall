<template>
	<view class="home-list">
		<home-item :addShopCar="addShopCar" :section="section" :goToDetail="goToDetail"></home-item>
	</view>
</template>

<script>
	import homeItem from './home-item'
	export default {
		props: {
			section: Array,
			goToDetail: Function,
			addShopCar: Function
		},
		data() {
			return {
				
			};
		},
		components: {
			homeItem
		}
	}
</script>

<style scoped lang="scss">

</style>
