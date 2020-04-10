<template>
	<view class="grid">
		<view class="grid-lsit">
			<view class="grid-item" v-for="(item, index) of grid" :key="index" @tap="switchTo(item.id, item.name,item.type)">
				<image :src="item.image"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		switchTo: Function,
		grid: Array
	},
	data() {
		return {
			
		}
	},
	methods: {

	}
};
</script>

<style scoped lang="scss">
.grid {
	padding-top: 140upx;
	background: #f4f4f4;
	.grid-lsit {
		display: flex;
		flex-wrap: wrap;
		justify-cotnent: space-between;
		padding: 0 10upx;
		.grid-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 30upx;
			width: 20%;
			image {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-bottom: 22upx;
			}
			text {
				color: #424242;
			}
		}
	}
}
</style>
