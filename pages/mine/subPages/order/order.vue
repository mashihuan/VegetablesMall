
<template>
	<view class="coupon">
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view id="demo1" class="scroll-view-item_H" :class="{ active: currenIndex == index }" v-for="(item, index) of couponStatus" :key="index" @tap="scrollClick(index)">
				{{ item }}
			</view>
		</scroll-view>
		<swiper class="swiper" @change="swiperChange" :current="swiperCurrent" :style="{ height: minHeight }">
			<swiper-item v-for="(data, index1) of couponList" :key="index1">
				<scroll-view scroll-y="true" :style="{ height: scrollHeight }">
					<view class="swiper-item" v-for="(item, index) of couponList[index1]" :key="index">
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
							<view v-if="item.order_status == '待付款' || item.order_status == '代付款'" @tap="cancel(item.order_sn)" class="cancel">取消订单</view>
							<view v-if="item.order_status == '待付款' || item.order_status == '代付款'" @tap="payment(item)">立即支付</view>
							<view v-if="item.order_status == '待评价'" @tap="evaluate(item.order_sn)">立即评价</view>
							<view v-if="item.order_status !== '待付款' && item.order_status !== '代付款'" @tap="onBuyAgain(item)">再次购买</view>
							<view v-if="item.order_status == '待收货'" @tap="confirm(item.order_sn)">确认收货</view>
						</view>
					</view>
					<view v-if="data.length <= 0" class="item nodata" v-show="data.length == 0">
						<image src="/static/images/mine/nodata1.png"></image>
						<view v-if="currenIndex == 0">您的订单是空的...</view>
						<view v-if="currenIndex == 1">没有待支付订单</view>
						<view v-if="currenIndex == 2">没有待收货订单</view>
						<view v-if="currenIndex == 3">没有待评价订单</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 支付方式 -->
		<uni-popup @hidePopup="togglePopup('')" :show="type === 'bottom'" position="bottom" msg="">
			<view class="pay-methods">
				<pay-methods @payTypeClick="payTypeClick" :buttonClick="payClick" :realPrice="realPrice"></pay-methods>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue' 
import payMethods from '@/components/pay-methods'
import { getOrderList, immediatePayment, cancelOrder, confirmReceipt, buyAgain, BASE_URL }	from '@/api'
export default {
	data() {
		return {
			currenIndex: 0,
			swiperCurrent: 0,
			minHeight: 0,
			windowHeight: 0,
			scrollHeight: 0,
			couponStatus: ['全部', '待支付', '待收货', '待评价'],
			couponList: [[], [], [], []],
			type: '',
			realPrice: 0,
			payType: 'alipay',
			order_sn: ''
		};
	},
	components: {
		uniPopup,
		payMethods
	},
	onLoad(options) {
		this._getWindowHeight(); // 获取窗口高度
		if(options.id) {
			this._getOrderList(options.id);
			if(options.id == 0) {
				this.currenIndex = 1;
				this.swiperCurrent =1;
				return;
			}
			this.currenIndex = options.id;
			this.swiperCurrent = options.id;
		}else {
			this._getOrderList('all')
		}
		
	},
	onShow () {
		this._getOrderList('all'),
		this._getOrderList(0)
	},
	methods: {
		payClick () {        // 支付-------------------------------------------------------------------
			let self = this;
			uni.request({
				url: BASE_URL + '/app/close/payMoney',
				method: 'POST',
				data: {
					token: uni.getStorageSync('token'),
					order_sn: this.order_sn,
					way: this.payType                // alipay  wechat  burse
				}
			}).then (res => {
				let [err, result] = res;
				console.log(JSON.stringify(result));
				if(self.payType == 'alipay') {
					uni.requestPayment({
						provider: 'alipay',
						orderInfo: result.data, 
						success: function (res) {
							if(res.errMsg == "requestPayment:ok") {
								uni.redirectTo({
									url: '/pages/success/index?title=支付成功'
								})
							}
						},
						fail: function (err) {
							console.log('err:' + JSON.stringify(err));
							// uni.showToast({
							// 	title: err.errMsg,
							// 	icon: 'none'
							// })
							// uni.redirectTo({
							// 	url: '/pages/fail/index?title=支付失败'
							// })
							self.type = ''
						}
					});
					return;
				}
				if(this.payType == 'wechat') {
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: result.data, //微信
						success: function (res) {
							console.log('success:' + JSON.stringify(res));
							if(res.errMsg == 'requestPayment:ok') {
								uni.redirectTo({
									url: '/pages/success/index?title=支付成功'
								})
							}
						},
						fail: function (err) {
							console.log('err:' + JSON.stringify(err));
							// uni.showToast({
							// 	title: err.errMsg,
							// 	icon: 'none'
							// })
							// uni.redirectTo({
							// 	url: '/pages/fail/index?title=支付失败'
							// })
						}
					});
					return;
				}
				if(result.data.recode == 10000) {
					// uni.showToast({
					// 	title: '支付成功'
					// })
					// setTimeout(() => {
					// 	uni.switchTab({
					// 		url: '/pages/car/index/index',
					// 		animationType: 'slide-in-right'
					// 	})
					// }, 2000)
					uni.redirectTo({
						url: '/pages/success/index?title=支付成功'
					})
				}else {
					uni.showToast({
						title: result.data.remsg,
						icon: 'none'
					})
					// uni.redirectTo({
					// 	url: '/pages/fail/index?title=支付失败'
					// })
				}
			})
		},
		togglePopup(type) {
			this.type = type
		},
		payTypeClick (index) {   // 支付方式点击
			switch (index) {
				case 0: this.payType = 'alipay';
				break;
				case 1: this.payType = 'wechat';
				break;
				case 2: this.payType = 'burse';
				break;
			}
		},
		async payment (item) {  // 立即支付
		console.log(item)
			let self = this;
			// this.payClick(item);
			this.order_sn = item.order_sn;
			this.realPrice = item.sprice;
			this.type = 'bottom'
		},
		async pay (item) {
			let result = await immediatePayment ({
				token: uni.getStorageSync('token'),
				order_sn: item.order_sn
			})
			if(item.pay_way == 1) {   // 支付宝支付
			console.log(JSON.stringify(result))
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: result, 
					success: function (res) {
						if(res.errMsg == "requestPayment:ok") {
							uni.navigateTo({
								url: '/pages/success/index?title=支付成功'
							})
						}
					},
					fail: function (err) {
						console.log('err:' + JSON.stringify(err));
						// uni.showToast({
						// 	title: err.errMsg,
						// 	icon: 'none'
						// })
						uni.redirectTo({
							url: '/pages/fail/index?title=购买失败'
						})
					}
				});
				return;
			}
			if(item.pay_way == 2) {   // 微信支付
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: result, //微信
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
						if(res.errMsg == 'requestPayment:ok') {
							uni.redirectTo({
								url: '/pages/success/index?title=购买成功'
							})
						}
					},
					fail: function (err) {
						console.log('err:' + JSON.stringify(err));
						// uni.showToast({
						// 	title: err.errMsg,
						// 	icon: 'none'
						// })
						uni.redirectTo({
							url: '/pages/fail/index?title=购买失败'
						})
					}
				});
				return;
			}
			if(result.recode == 10000) {
				this._getOrderList('all'),
				this._getOrderList(0)
			}else {
				// uni.showToast({
				// 	title: result.remsg,
				// 	icon: 'none'
				// })
				uni.redirectTo({
					url: '/pages/fail/index?title=购买失败'
				})
			}
		},
		onBuyAgain (item) {  // 再次购买
			console.log(item)
			let tempArr = [];
			item.data.forEach((val, index) => {
				// tempArr.push(val.id)
				let {xgoods_id, num, shop_price} = val;
				tempArr.push({xgoods_id, num, shop_price})
			})
			tempArr = JSON.stringify(tempArr)
			let arr = [];
			item.data.forEach((val, index) => {
				let {xgoods_id, num} = val;
				arr.push({xgoods_id, num});
			})
			uni.request({
				url: BASE_URL + '/app/xorder/buyAgain',
				method: 'POST',
				data: {
					token: uni.getStorageSync('token'),
					xgoods: arr
				},
				success: function (res) {
					if(res.data.recode == 10000) {
						let data = JSON.stringify(res.data.data);
						let freight = res.data.data.freight;
						uni.navigateTo({
							url: '/pages/car/subPages/pay/pay?data=' + data + '&carId=' + tempArr + '&freight=' + freight,
							animationType: 'slide-in-right'
						});
					}
				}
 			})
		},
		async cancel (id) {   // 取消订单
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确定要取消订单吗?',
				success: function (res) {
					if (res.confirm) {
						cancelOrder ({
							token: uni.getStorageSync('token'),
							order_sn: id
						}).then(result => {
							if(result.recode == 10000) {
								uni.showToast({
									title: '取消成功'
								})
								if(self.currenIndex == 0) {
									self._getOrderList('all')
								}
								if(self.currenIndex == 1) {
									self._getOrderList(0)
								}
							}else {
								uni.showToast({
									title: result.remsg,
									icon: 'none'
								})
							}
						})	
					} 
				}
			});
		},
		async confirm (id) {   // 确认收货
			let self = this;
			uni.showModal({
				title: '提示',
				content: '请确认收到货后再执行此操作,继续确定吗？',
				success: function (res) {
					if (res.confirm) {
						confirmReceipt ({
							token: uni.getStorageSync('token'),
							order_sn: id
						}).then (result => {
							if(result.recode == 10000) {
								uni.showToast({
									title: '确认成功',
								})
								if(self.swiperCurrent == 0) {
									self._getOrderList('all')
								}
								if(self.swiperCurrent == 2) {
									self._getOrderList(2)
								}
							}else {
								uni.showToast({
									title: result.remsg,
									icon: 'none'
								})
							}
						})
					}
				}
			});
		},
		async _getOrderList (type) {   // 获取订单列表
			uni.showLoading({
				title: '正在加载数据...',
			})
			let result = await getOrderList ({
				token: uni.getStorageSync('token'),
				status: type
			})
			uni.hideLoading();
			if(type == "all") {
				type = 0;
			}else if(type == 0) {
				type = 1;
			}
			this.$set(this.couponList, type, result.data || []);
		},
		evaluate (id) {   // 评价
			uni.navigateTo({
				url: '/pages/mine/subPages/evaluate/evaluate?id=' + id,
				animationType: 'slide-in-right'
			})
		},
		getOrderByIndex () {
			let type = '';
			switch (this.currenIndex) {
				case 0: type = 'all';
				break;
				case 1: type = 0;
				break;
				case 2: type = 2;
				break;
				case 3: type = 3;
			}
			this._getOrderList(type)
		},
		swiperChange(e) {
			this.currenIndex = e.detail.current;
			this.getOrderByIndex();
		},
		scrollClick(index) {
			this.currenIndex = index;
			this.swiperCurrent = index;
			this.getOrderByIndex();
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
			this.couponList.forEach((val, index) => {
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
			this.minHeight = (arr[0] * 180 < this.windowHeight - 43 ? this.windowHeight - 43 : arr[0] * 180) + 'px';
		}
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.swiper {
	margin-top: 20upx;
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

.nodata {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 150upx;
	view {
		color: #999;
	}
	image {
		width: 400upx;
		height: 400upx;
	}
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
	& .scroll-view-item_H:nth-of-type(2) {
		margin: 0 10upx;
	}
	& .scroll-view-item_H:nth-of-type(3) {
		margin: 0 10upx;
	}
	.scroll-view-item_H.active {
		color: $headerBar-color;
		border-bottom-color: $headerBar-color;
	}
}
.pay-methods {
	padding: 50upx 70upx;
	// margin-top: 20upx;
	background: #fff;
}
</style>
