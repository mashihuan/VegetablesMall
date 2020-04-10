<template>
	<view class="login-third" :style="{ top: initPosition + 'px' }">
		<text>第三方账号登录</text>
		<view class="third-list">
			<view class="third-item" @tap="thirdLoginClick(1)">
				<image :animation="animationData" src="/static/images/login/zhuce-icon-weixin@2x.png"></image>
				<text>微信</text>
			</view>
			<view class="third-item" @tap="thirdLoginClick(2)">
				<image :animation="animationData" src="/static/images/login/zhuce-icon-zfb@2x.png"></image>
				<text>支付宝</text>
			</view>
			<!-- <view class="third-item" @tap="thirdLoginClick(3)">
				<image :animation="animationData" src="/static/images/login/zhuce-icon-taobao@2x.png"></image>
				<text>淘宝</text>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			posTop: 0 // 底部定位top值
		};
	},
	props: {
		thirdLoginClick: Function,
		animationData: Function
	},
	computed: {
		initPosition() {
			return uni.getSystemInfoSync().windowHeight - 180;
		},
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
.login-third {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	padding: 0 140upx;
	text-align: center;
	.third-list {
		display: flex;
		justify-content: space-around;
		margin-top: 50upx;
		.third-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			image {
				width: 100upx;
				height: 100upx;
				margin-bottom: 20upx;
			}
		}
	}
}
</style>
