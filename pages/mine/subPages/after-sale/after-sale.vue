<template>
	<view class="coupon">
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view class="scroll-view-item_H" :class="{ active: currenIndex == index }" v-for="(item, index) of couponStatus"
			 :key="index" @tap="scrollClick(index)">
				{{ item }}
			</view>
		</scroll-view>
		<swiper class="swiper" @change="swiperChange" :current="swiperCurrent" :style="{ height: minHeight }">
			<swiper-item v-for="(data, index1) of afterSale" :key="index1">
				<scroll-view scroll-y="true" :style="{ height: scrollHeight }">
					<!-- <view class="swiper-item" v-for="(item, index1) of data" :key="index1"> -->
					<!-- <goods-info :item="item" :apply="apply" afterSale="afterSale"></goods-info> -->

					<!--  -->
					<!-- </view> -->
					<block v-if="index1 == 0">
							<view class="swiper-item" v-for="(item, index) of data" :key="index">
								<view class="goods-status">{{item.order_status}}</view>
								<view class="swiper-top" v-for="(goods, index2) of item.data" :key="index2">
									<image :src="goods.goods_image"></image>
									<view class="goods-info">
										<view class="goods-name">{{goods.goods_name}}</view>
										<view class="goods-price">￥{{goods.shop_price}}</view>
									</view>
									<view class="goods-num">
										<view class="goods-num">×{{goods.num}}</view>
									</view>
								</view>
								<view class="goods-total">共{{item.snum}}件商品 合计：¥ {{item.sprice}}</view>
								<view class="goods-btn">
									<view @tap="onApplyClick(item)">申请售后</view>
								</view>
							</view>
							<view v-if="data.length <= 0" class="item nodata">
								<image src="/static/images/mine/nodata1.png"></image>
								<view>没有更多了...</view>
							</view>
					</block>
					<block v-if="index1 == 1">
						<view class="swiper-item" v-for="(item, index) of data" :key="index">
							<view class="goods-status">{{item.order_status}}</view>
							<view class="swiper-top" v-for="(goods, index2) of item.data || item.xorders" :key="index2">
								<image :src="goods.goods_image"></image>
								<view class="goods-info">
									<view class="goods-name">{{goods.goods_name}}</view>
									<view class="goods-price">￥{{goods.shop_price}}</view>
								</view>
								<view class="goods-num">
									<view class="goods-num">×{{goods.num}}</view>
								</view>
							</view>
							<view class="goods-total">共{{item.snum || item.num}}件商品 合计：¥ {{item.sprice || item.order_price}}</view>
							<view class="goods-btn">
								<view @tap="onApplyClick(item)" v-if="item.order_status == '待收货'">申请售后</view>
								<view v-if="item.state" @tap="onDelRecordEvent(item.id)">删除</view>
								<view v-if="item.state">{{item.state}}</view>
							</view>
						</view>
						<view v-if="data.length <= 0" class="item nodata">
							<image src="/static/images/mine/nodata1.png"></image>
							<view>没有更多了...</view>
						</view>
					</block>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import goodsInfo from '../order/children/goods-info'
	import { delAftersaleRecord } from '@/api'
	import {
		getAfterSale,
		getAfterSaleRecord
	} from '@/api'
	export default {
		data() {
			return {
				currenIndex: 0,
				swiperCurrent: 0,
				minHeight: 0,
				windowHeight: 0,
				scrollHeight: 0,
				couponStatus: ['售后申请', '申请记录'],
				afterSale: [
					[],
					[]
				],
			};
		},
		onLoad() {
			this._getWindowHeight(); // 获取窗口高度
		},
		onShow() {
			this._getAfterSaleList();
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/mine/subPages/customer-service/customer-service',
				animationType: 'slide-in-right'
			})
		},
		methods: {
			async onDelRecordEvent (id) {  // 删除售后记录
				let that = this;
				uni.showModal({
					content: '确定要删除此记录吗？',
					success: async function (res) {
						if(res.confirm) {
							let result = await delAftersaleRecord({
								token: uni.getStorageSync('token'),
								return_id : id
							})
							if(result.recode == 10000) {
								that._getAfterSaleRecord()
							}
						}
					}
				})
			},
			async _getAfterSaleList() { // 获取可以售后的列表
				uni.showLoading({
					title: '正在加载数据'
				})
				let result = await getAfterSale({
					token: uni.getStorageSync('token'),
					status: 2
				})
				uni.hideLoading()
				if (result.recode == 10000) {
					this.$set(this.afterSale, 0, result.data || [])
				} else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
			async _getAfterSaleRecord() { // 获取售后记录
				uni.showLoading({
					title: '正在加载数据'
				})
				let result = await getAfterSaleRecord({
					token: uni.getStorageSync('token')
				})
				uni.hideLoading()
				this.$set(this.afterSale, 1, result.data || [])
			},
			onApplyClick(item) { // 申请售后
				uni.navigateTo({
					url: '/pages/mine/subPages/apply/apply?sn=' + item.order_sn + '&id=' + item.id,
					animationType: 'slide-in-right'
				})
			},
			swiperChange(e) {
				this.currenIndex = e.detail.current;
				this.swiperCurrent = e.detail.current;
				this._getAfterSaleRecord();
				this._getAfterSaleList();
			},
			scrollClick(index) {
				this.currenIndex = index;
				this.swiperCurrent = index;
				this._getAfterSaleRecord();
				this._getAfterSaleList()
			},
			_getWindowHeight() {
				let self = this;
				uni.getSystemInfo({
					success: function(res) {
						self.windowHeight = res.windowHeight;
						self._getSwiperHeight();
					}
				});
			},
			_getSwiperHeight() {
				let arr = [];
				this.afterSale.forEach((val, index) => {
					arr.push(val.length);
				});
				for (let j = 0; j < arr.length; j++) {
					for (let i = 0; i < arr.length; i++) {
						if (arr[i + 1] < arr[i]) {
							let temp = arr[i];
							arr[i] = arr[i + 1];
							arr[i + 1] = temp;
						}
					}
				}
				this.scrollHeight = this.windowHeight - 43 + 'px';
				// 如果最小的优惠券列表小于窗口高度，则把窗口高度赋值给swiper,保证点击屏幕任一点都可以滑动
				this.minHeight = (arr[0] * 125 < this.windowHeight - 43 ? this.windowHeight - 43 : arr[0] * 125) + 'px';
			}
		},
		components: {
			goodsInfo
		}
	};
</script>

<style scoped lang="scss">
	@import '~@/common/mixin.scss';

	.swiper {
		margin-top: 20upx;
		padding: 0 30upx;
	}

	.scroll-view_H {
		white-space: nowrap;
		dispaly: flex;
		padding: 0 55upx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		.scroll-view-item_H {
			width: 150upx;
			text-align: center;
			line-height: 64upx;
			border-bottom: 2upx solid transparent;
			display: inline-block;
		}

		& .scroll-view-item_H:nth-of-type(1) {
			margin: 0 250upx 0 50upx;
		}

		.scroll-view-item_H.active {
			color: $headerBar-color;
			border-bottom-color: $headerBar-color;
		}
	}

	.swiper-item {
		padding: 30upx 50upx;
		margin-bottom: 20upx;
		background: #fff;

		.goods-status {
			color: $money-color;
			line-height: 1;
			text-align: right;
		}

		.swiper-top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30upx;

			image {
				width: 140upx;
				height: 140upx;
				margin-right: 40upx;
				border-radius: 15upx;
			}

			.goods-info {
				flex: 1;
				padding-top: 30upx;

				.goods-name {
					line-height: 1;
				}

				.goods-price {
					margin-top: 40upx;
					color: $money-color;
					line-height: 1;
				}
			}

			.goods-num {
				.goods-num {
					margin-top: 80upx;
					text-align: right;
					@include fontStyle($size: 28upx, $color: #9b9b9b);
				}
			}
		}

		.goods-total,
		.goods-btn {
			display: flex;
			justify-content: flex-end;
			@include fontStyle($size: 24upx);
		}

		.goods-btn view {
			margin: 30upx 0 0 17upx;
			@extend .shareBtn;
			color: $money-color;
			border: 1upx solid $money-color;
			background: #fff;
		}

		.goods-btn view.cancel {
			@extend .shareBtn;
			color: #999999;
			border: 1upx solid $content-bgColor;
			background: #fff;
		}
	}
</style>
