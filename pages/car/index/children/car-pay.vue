<template>
	<view class="carPay">
		<view class="allChecked" @tap="choseAllClick">
			<view class="checkbox" :class="{active: isChoseAll}"></view>
			<text>全选</text>
		</view>
		<view class="car-totalMoney" v-if="carStatus">合计：<text>￥{{totalPriceFormat}}</text></view>
		<button v-if="carStatus" @tap="pay">结算</button>
		<button v-else class="del-btn" @tap="del">删除</button>
	</view>
</template>

<script>
	export default {
		props: {
			carStatus: Boolean,
			pay: Function,
			del: Function,
			choseAllClick: Function,
			isChoseAll: Boolean,
			totalPrice: Number
		},
		data() {
			return {
				
			};
		},
		computed: {
			totalPriceFormat () {
				return this.totalPrice.toFixed(2)
			}
		}
	}
</script>

<style scoped lang="scss">
.checkbox {
	width: 40upx;
	height: 40upx;
	margin-right: 30upx;
	background: url('~@/static/images/car/gwc-icon1@2x.png');
	background-size: 100% 100%;
}
.checkbox.active {
	background: url('~@/static/images/car/gwc-icon2@2x.png');
	background-size: 100% 100%;
}
.carPay {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 100upx;
	padding: 0 30upx 0 50upx;
	background: #fff;
	.allChecked {
		display: flex;
		align-items: center;
		font-size: 24upx;
	}
	.car-totalMoney {
		flex: 1;
		text-align: right;
		margin-right: 40upx;
		text {
			color: $money-color;
		}
	}
	button {
		width: 130upx;
		height: 60upx;
		padding: 0;
		margin: 0;
		line-height: 60upx;
		border: none;
		border-radius: 50upx;
		font-size: 32upx;
		color: #fff;
		background: $headerBar-color;
	}
	.del-btn {
		background: #fff;
		color: $money-color;
		border: 1upx solid  $money-color;
	}
}
 
/*#ifdef APP-PLUS */
.carPay {
	bottom: 0;
}
/*#endif*/ 
	
/*#ifdef H5*/ 
 .carPay {
 	bottom: 50px;
 }
/*#endif*/ 

</style>
