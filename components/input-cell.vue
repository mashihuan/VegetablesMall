<template>
	<view class="cell" :class="{cellPadding: padding}">
		<image class="cell-icon" :class="cellClass" :src="icon"></image>
		<input class="cell-input" :type="type" :placeholder="text" @input="$emit('input', $event.target.value)"/>
		<template v-if="button">
			<button v-if="count == 0" @tap="getCode">获取验证码</button>
			<button v-else disabled>重新获取({{count}})</button>
		</template>
	</view>
</template>

<script>
export default {
	props: {
		icon: { type: String, default: '/static/images/login/zhuce-icon-2@2x.png' },
		text: { type: String, default: '' },
		type: { type: String, default: '' },
		cellClass: {type: String, default: ''},
		button: {type: String, default: ''},
		padding: {type: Boolean, default: false},
		getCode: Function,
		count: Number,
		previewAwatar: Function
	},
	methods: {
		
	}
};
</script>

<style scoped lang="scss">
.cell {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 60upx 30upx 30upx;
	border-bottom: 1upx solid #cfcfcf;
	.cell-icon {
		width: 30upx;
		height: 44upx;
	}
	.cell-input {
		padding-left: 30upx;
		flex: 1;
	}
	.pwd-icon {
		width: 38upx;
		height: 46upx;
	}
	button {
		font-size: 28upx;
		background: none;
		color: #43b431;
	}
	button::after {
		border: none;
	}
}
.cellPadding {
	padding-left: 0;
	padding-right: 0;
}
</style>
