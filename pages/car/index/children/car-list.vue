<template>
	<view class="car-list">
		<car-item @input="input" :goToDetail="goToDetail" :carList="carList" :changeNumber="changeNumber" :singleClick="singleClick"></car-item>
	</view>
</template>

<script>
	import carItem from './car-item'
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
				
			};
		},
		methods: {
			input (options) {
				this.$emit('input', {value: options.value, item: options.item})
			}
		},
		components: {
			carItem
		}
	}
</script>

<style scoped lang="scss">
.car-list {
	padding-bottom: 100upx;
}
</style>
