<template>
	<view class="payMethods">
		<view class="pay-title" v-if="realPrice">￥{{realPrice}}</view>
		<view class="pay-title" style="font-size: 30upx;">支付方式</view>
		<view class="pay-list">
			<view class="pay-item checked" 
						:class="{realPriceStyle: realPrice}"
						v-for="(item, index) of showPayType"
						:key="index" 
						@tap="payTypeClick(index)"
			>
				<image :src="item.icon"></image>
				<text>{{item.text}}</text>
				<view class="pay-radio" :class="{checked: currentIndex == index}"></view>
			</view>
		</view>
		<click-button v-if="realPrice" style="padding: 0; margin-top: 100upx;" :buttonClick="buttonClick" text="确定" ></click-button>
	</view>
</template>

<script>
import clickButton from '@/components/click-button'	
export default {
	props: {
		buttonClick: Function,
		realPrice: {type: [String, Number]},
		recharge: String,
	},
	data() {
		return {
			payType: [
				{icon: '/static/images/mine/zhifubao@2x.png', text: '支付宝支付'},
				{icon: '/static/images/mine/wode-hy-icon-wx@2x.png', text: '微信支付'},
				{icon: '/static/images/mine/wode-hy-icon-qb@2x.png', text: '钱包支付'}
			],
			currentIndex: 0
		};
	},
	computed: {
		showPayType () {
			let payType = this.payType;
			if(this.recharge) {
				payType = [
					{icon: '/static/images/mine/zhifubao@2x.png', text: '支付宝支付'},
					{icon: '/static/images/mine/wode-hy-icon-wx@2x.png', text: '微信支付'}
				];
			}
			return payType
		}
	},
	methods: {
		payTypeClick (index) {
			this.currentIndex = index;
			this.$emit('payTypeClick', index)
		}
	},
	components: {
		clickButton
	}
};
</script>

<style scoped lang="scss">
.payMethods {
	margin-top: 55upx;
	.pay-title {
		font-size: 50upx;
		margin-bottom: 40upx;
	}
	.pay-list {
		.pay-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40upx;
			image {
				width: 60upx;
				height: 60upx;
				margin-right: 30upx;
			}
			text {
				flex: 1;
				font-size: 30upx;
				text-align: left;
			}
			.pay-radio {
				width: 40upx;
				height: 40upx;
				background: url('~@/static/images/mine/wode-hy-icon-wxz@2x.png');
				background-size: 100% 100%;
			}
			.pay-radio.checked {
				background: url('~@/static/images/mine/wode-hy-icon-xz@2x.png');
				background-size: 100% 100%;
			}
		}
		.pay-item.realPriceStyle {
			margin-bottom: 50upx !important;
			image {
				width: 80upx;
				height: 80upx;
			}
		}
	}
}
</style>
