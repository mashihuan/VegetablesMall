<template>
	<view class="item-title">{{ title }}</view>
</template>

<script>
export default {
	props: {
		title: String
	},
	data() {
		return {
			
		};
	}
};
</script>

<style scoped lang="scss">
.item-title {
	position: relative;
	font-size: 32upx;
	line-height: 80upx;
	color: #444444;
	text-align: center;
	&:after,
	&:before {
		position: absolute;
		top: 50%;
		content: '';
		width: 120upx;
		height: 1px;
		background: #999999;
	}
	&:before {
		left: 140upx;
	}
	&:after {
		right: 140upx;
	}
}
</style>
