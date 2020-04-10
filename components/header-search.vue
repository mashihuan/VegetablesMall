<template>
	<view class="search-input">
		<image class="search-icon" src="/static/images/home/shouye-icon-ss@2x.png"></image>
		<input type="text" disabled @tap="searchInputClick" placeholder-style="color: #b2b2b2" placeholder="请输入" />
	</view>
</template>

<script>
export default {
	props: {
		searchInputClick: Function
	},
	data() {
		return {
			
		};
	}
};
</script>

<style scoped lang="scss">
.search-input {
	display: flex;
	align-items: center;
	flex: 1;
	height: 60upx;
	padding-left: 40upx;
	background: #fff;
	border-radius: 100upx;
	.search-icon {
		width: 30upx;
		height: 30upx;
	}
	input {
		flex: 1;
		padding: 0 30upx 0 10upx;
	}
}
</style>
