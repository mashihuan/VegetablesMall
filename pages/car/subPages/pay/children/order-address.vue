<template>
	<view>
		<view class="address">
			<view class="address-info" v-if="true" @tap="switchTo">
				<view class="info-top">
					<view>收货人：{{address.name}}</view>
					<view>{{address.mobile}}</view>
				</view>
				<view class="info-bottom">
					<image class="address-icon" src="/static/images/order/dingdan-qrdd-icon-wz@2x.png"></image>
					<view class="info-detail">收货地址：{{address.address_ssq}} {{address.address_content}}</view>
					<image class="address-arrow" src="/static/images/order/dingdan-qrdd-icon-next@2x.png"></image>
				</view>
			</view>
			<image class="info-flag" src="/static/images/order/dingdan-qrdd-icon-xt@2x.png"></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		address: {type: [String, Object]},
		switchTo: Function
	},
};
</script>

<style scoped lang="scss">
.address {
	position: relative;
	min-height: 172upx;
	background: #fff;
	.address-info {
		padding: 30upx;
		.info-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 100upx 0 55upx;
		}
		.info-bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 15upx;
			.address-icon {
				width: 36upx;
				height: 44upx;
			}
			.info-detail {
				flex: 1;
				padding: 0 45upx 0 20upx;
				line-height: 1.5;
			}
			.address-arrow {
				width: 18upx;
				height: 26upx;
			}
		}
	}
	.info-flag {
		position: absolute;
		bottom: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 4upx;
	}
}	
</style>
