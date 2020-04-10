<template>
	<view class="btn-wrap" :class="{position: position}" :style="{'margin-top': marginTop + 'px'}">
		<button class="register-btn" @tap="buttonClick">{{text}}</button>
	</view>
</template>

<script>
export default {
	props: {
		text: String,
		buttonClick: Function,
		position: String,
		marginTop: {type: [Number, String]}
	},
	data() {
		return {
			
		};
	}
};
</script>

<style scoped lang="scss">
.btn-wrap {
	padding: 0 75upx;
	button {
		width: 100%;
		background: $headerBar-color;
		color: #fff;
	}
}
.position {
	position: fixed;
	bottom: 40upx;
	left: 0;
	width: 100%;
	button {
		box-shadow: 4upx 4upx 1upx #ccc;
	}
}
</style>
