<template>
	<view class="score-top">
		<view class="score-title">{{title}}</view>
		<view class="score-number">{{number}}</view>
		<view class="score-signIn" v-if="title == '我的积分'">
			<image src="/static/images/mine/wode-jf-icon1@2x.png"></image>
			<view class="score-signIn-right">
				<view class="sign-btn" v-if="lessign_status == 0" @tap="signIn">签到</view>
				<view class="sign-btn" v-else @tap="signIn">已签到</view>
				<view class="sign-days">已连续签到{{max_sign}}天</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		number: {type: [String, Number]},
		signIn: Function,
		max_sign: {type: [String, Number]},
		lessign_status: Number
	},
	data() {
		return {
			
		};
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.score-top {
	height: 290upx;
	padding: 0 30upx;
	background: $headerBar-color;
	.score-title {
		padding-top: 25upx;
		@include fontStyle($size: 24upx, $color: #f2ffef);
	}
	.score-number {
		padding-top: 75upx;
		@include fontStyle($size: 75upx, $color: #fbfffa);
	}
	.score-signIn {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 180upx;
		border-radius: 20upx;
		margin-top: 30upx;
		background: #fff;
		image {
			width: 100upx;
			height: 100upx;
		}
		.score-signIn-right {
			display: flex;
			flex-direction: column;
			align-items: center;
			.sign-btn {
				width: 120upx;
				height: 50upx;
				border: 1upx solid $headerBar-color;
				border-radius: 30upx;
				text-align: center;
				@include fontStyle($size: 24upx, $color: $headerBar-color);
				line-height: 50upx;
			}
			.sign-days {
				margin-top: 25upx;
				@include fontStyle($size: 20upx, $color: #9b9b9b);
			}
		}
	}
}
</style>
