<template>
	<view class="mine-order">
		<view class="order-top">
			<view class="order-title">{{list.title}}</view>
			<view class="order-more" v-if="list.type == 'order'">
				<view @tap="moreOrderClick">查看更多订单</view>
				<image src="/static/images/mine/wode-zl-next@2x.png"></image>
			</view>
		</view>
		<view class="order-list">
			<view class="order-item" v-for="(item, index) of list.list" :key="index" @tap="switchTo(list.type, index)">
				<view class="order-icon">
					<image :src="item.icon"></image>
					<view class="order-redDot" v-if="list.type == 'order' && item.num">{{item.num}}</view>
				</view>
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: Object,
			switchTo: Function,
			moreOrderClick: Function,
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.mine-order {
	padding: 30upx 30upx 20upx 30upx;;
	margin-bottom: 20upx;
	background: #fff;
	border-radius: 10upx;
	.order-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.order-title {
			@include fontStyle($size: 30upx, $color: $title-color)
		}
		.order-more {
			display: flex;
			align-items: center;
			view {
				@include fontStyle($size: 24upx, $color: #9b9b9b)
			}
			image {
				width: 18upx;
				height: 26upx;
				margin-left: 15upx;
			}
		}
	}
	.order-list {
		display: flex;
		flex-wrap: wrap;
		.order-item {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
			height: 130upx;
			margin-bottom: 10upx;
			width: 25%;
			.order-icon {
				position: relative;
				// width: 48upx;
				// height: 38upx;
				width: 44upx;
				height: 40upx;
				image {
					width: 100%;
					height: 100%;
				}
				.order-redDot {
					position: absolute;
					right: -16upx;
					top: -16upx;
					width: 32upx;
					height: 32upx;
					line-height: 32upx;
					font-size: 24upx;
					text-align: center;
					background: #fff;
					border: 1upx solid #63c753;
					color: #63c753;
					border-radius: 50%;
				}
			}
			text {
				margin-top: 24upx;
				@include fontStyle($color: #999999)
			}
		}
		// & .order-item:nth-of-type(2) .order-icon {
		// 	width: 48upx;
		// 	height: 34upx;
		// }
		// & .order-item:nth-of-type(3) .order-icon {
		// 	width: 48upx;
		// 	height: 44upx;
		// }
		// & .order-item:nth-of-type(4) .order-icon {
		// 	width: 42upx;
		// 	height: 48upx;
		// }
		// & .order-item:nth-of-type(5) .order-icon {
		// 	width: 48upx;
		// 	height: 48upx;
		// }
		// & .order-item:nth-of-type(6) .order-icon {
		// 	width: 48upx;
		// 	height: 47upx;
		// }
		// & .order-item:nth-of-type(7) .order-icon {
		// 	width: 48upx;
		// 	height: 48upx;
		// }
	}
}
</style>
