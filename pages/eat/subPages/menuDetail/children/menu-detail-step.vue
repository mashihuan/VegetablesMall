<template>
	<view class="step">
		<view class="step-title">步骤</view>
		<view class="step-list">
			<view class="step-item" v-for="(item, index) of menuStep" :key="index">
				<image lazy-load="true" :src="item.procedure_img"></image>
				<view class="step-right">
					<view class="step-step">{{item.step}}</view>
					<view class="step-content">{{item.procedure}}
					</view>
				</view>
			</view>
			<view class="nodata" v-if="menuStep.length <= 0">
				<image src="/static/images/mine/nodata1.png"></image>
				<view>没有更多了...</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			menuStep: Array
		},
		data() {
			return {
				
			};
		},
		
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.nodata {
	padding-top: 50upx;
}
.step {
	padding: 40upx 30upx;
	background: #fff;
	margin-top: 20upx;
	.step-title {
		@include fontStyle($size: 32upx, $color: #292929)
	}
	.step-list {
		margin-top: 40upx;
		.step-item {
			display: flex;
			margin-bottom: 40upx;
			image {
				width: 200upx;
				height: 200upx;
				margin-right: 30upx;
				border-radius: 10upx;
			}
			.step-right {
				flex: 1;
				.step-step {
					@include fontStyle($size: 32upx, $color: #292929)
				}
				.step-content {
					margin-top: 30upx;
					line-height: 1.53;
				}
			}
		}
	}
}
</style>
