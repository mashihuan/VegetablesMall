<template>
	<!-- 签到成功弹窗 -->
	<view class="mask" v-if="isSuccess" @touchmove.stop="">
		<view class="mask-content">
			<image src="/static/images/mine/wode-qd-bg@2x.png"></image>
			<view class="sign-content">
				<view class="sign-success">签到成功，记得每天来签到哦!</view>
				<view class="sign-confirm" @tap="confirm">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		confirm: Function,
		isSuccess: Boolean,
	},
	data() {
		return {
			animationData: {}
		};
	},
	onShow: function(){
   
  },
	methods:{
    
  }
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.mask {
	position: fixed;
	top: -69px;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.4);
	z-index: 99999999999999999999999999999;
	.mask-content {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -301upx;
		margin-top: -246upx;
		width: 602upx;
		height: 492upx;
		image {
			width: 602upx;
			height: 492upx;
		}
		.sign-content {
			position: absolute;
			width: 420upx;
			bottom: 64upx;
			left: 50%;
			transform: translate(-50%, 0);
			text-align: center;
			.sign-success {
				@include fontStyle($size: 24upx, $color: #949494);
			}
			.sign-confirm {
				margin-top: 65upx;
				@include fontStyle($size: 32upx);
			}
		}
	}
}
</style>
