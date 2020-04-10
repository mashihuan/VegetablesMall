<template>
	<view class="wrap">
		<image src="/static/images/home/success.png"></image>
		<text>{{newTitle}}</text>
		<button type="primary" @tap="onConfirmEvent">确定</button>
	</view>
</template>

<script>
	export default {
		props: {
			title: {type: String, default: '支付成功'}
		},
		name: '',
		data () {
			return {
				newTitle: this.title
			}
		},
		onLoad (options) {
			let that = this;
			that.newTitle = options.title || '支付成功';
			uni.setNavigationBarTitle({
					title: that.newTitle || '支付成功'
			});
		},
		methods: {
			onConfirmEvent () {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 260upx;
	image {
		width: 200upx;
		height: 200upx;
	}
	text {
		font-size: 34upx;
		margin: 30upx 0 190upx 0;
	}
	button {
		width: 600upx;
		background: #65c756;
	}
}
</style>
