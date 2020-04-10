<template>
	<view class="order">
		<order-address :switchTo="switchTo" :address="deliveryAddress"></order-address>
		<view class="order-info">
			<view class="order-time">
				<list-cell title="送达时间" inputColor="#63c753" :cellClick="choseDeliveryTime" :value="time" v-model="time"></list-cell>
				<!-- 二级选择器 -->
				<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="2" 
				 @onConfirm="onConfirmTime" :pickerValueArray="pickerValueArray"></mpvue-picker>
				 <scroll-view class="scroll-view_H" scroll-x="true">
							<view class="order-goods">
								<view class="goods">
									<image v-for="(item, index) of carInfo.goods" :key="index" :src="item.goods_image" @tap="goToDetail(item)"></image>
								</view>
								<view class="goods-num">共{{carInfo.good_num}}件</view>
								<image src="/static/images/order/dingdan-qrdd-icon-next@2x.png"></image>
							</view>
					</scroll-view>
			</view>
		</view>
		
		<view class="extra">
			<view class="extra-item">
				<view>优惠券</view>
				<view style="color: #63c753" @tap="choseCoupon()">{{carInfo.discount_num}}张可用</view>
			</view>
			<view class="extra-item">
				<view>可用积分{{carInfo.score}}</view>
				<view class="score" @tap="checkboxClick">
					<view class="score-radio" :class="{checked: isUseScore}"></view>使用
				</view>
				<!-- <view>
					可抵
					<text style="color: #d40300;margin: 0 10upx">{{minus}}</text>
					元
				</view> -->
			</view>
			<view class="extra-item">
				<view>备注</view>
				<textarea v-model="remark" name="" id="" cols="30" rows="10" placeholder="有什么需要告诉我们的"></textarea>
			</view>
			<view class="extra-item">
				<view>总计</view>
				<view>￥{{totalPrice}}</view>
			</view>
			<view class="extra-item" v-if="freight > 0">
				<view>配送费：</view>
				<view>￥{{freight}}</view>
			</view>
			<view class="extra-item">
				<view>实付</view>
				<view style="color: #d40300">￥{{realPrice}}</view>
			</view>
		</view>
		<view style="background: #fff; padding-bottom: 30upx;">
			<click-button class="btn" text="确定" :buttonClick="onCreateOrder"></click-button>
		</view>
		<view>
			<!-- 选择支付方式弹框 -->
		<uni-popup :show="type === 'bottom'" position="bottom" msg="">
			<view class="pay-methods">
				<pay-methods @payTypeClick="payTypeClick" :buttonClick="payClick" :realPrice="realPrice"></pay-methods>
			</view>
		</uni-popup>
		<!-- 优惠券弹窗 -->
		<uni-popup :show="showCoupon" position="bottom" msg="优惠券" @hidePopup="togglePopup('')">
			<view class="coupon-list">
				<view class="coupon-popup" @tap="couponClick(item)" v-for="(item, index) of carInfo.discount" :key="index">
					<view>{{item.content}}</view>
					<view class="coupon-radio" :class="{checked: item.checked}"></view>
				</view>
				<view class="coupon-popup" @tap="noCouponClick()">
					<view>不使用优惠</view>
					<view class="coupon-radio" :class="{checked: noCoupon}"></view>
				</view>
				<click-button style="margin-top: 100upx;" text="确定" :buttonClick="confirmCoupon"></click-button>
			</view>
		</uni-popup>
		</view>
	</view>
</template>

<script>
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import orderAddress from './children/order-address';
import listCell from '@/components/list-cell';
import payMethods from '@/components/pay-methods';
import clickButton from '@/components/click-button';
import moment from 'moment';
import { goToPay, createOrder, getAddressList, getPersonalInfo, dealRealPrice, BASE_URL } from '@/api';
import { mapMutations, mapState } from 'vuex'
import choseTime from '@/common/choseTime.js'
export default {
	data() {
		return {
			address: {},
			timeValue: '',
			time: '请选择',
			themeColor: '##63c753',
			pickerValueArray: [],
			type: '',
			goods: [],
			couponId: '',
			score: '',
			carInfo: {},
			carId: [],
			car_id: [],
			isUseScore: false,
			showCoupon: false,
			noCoupon: false,
			subtract_price: 0, // 优惠券减少的价格
			realPrice: 0,
			remark: '',
			useScore: '',
			payType: 'alipay',   // 支付方式    
			freight: '', // 运费
			order_sn: ''
		};
	},
	onLoad (options) {
		
		this.data = JSON.parse(options.data);  // 获取拼接在url后面的商品信息
		this.carInfo = this.data;
		console.log(options.carId)
		if(options.carId.includes('[')) {
			this.carId = JSON.parse(options.carId);
		}else {
			this.carId = options.carId.split(',')
		}
		if(options.freight) {
			this.freight = Number(options.freight);
		}else {
			this._getDelivery()
		}
		console.log(this.carId)
		
	},
	onShow () {
		this._getAddressList();
	},
	onReady() {
		this._dealRealPrice(this.subtract_price, this.isUseScore)
	},
	computed: {
		...mapState(['deliveryAddress']),
		
		totalPrice () {  // 计算总价格
			let price = this.carInfo.money;
			return price.toFixed(2)
		},
	},
	methods: {
		...mapMutations(['saveDeliveryAddress']),
		_getDelivery () {   // 获取路费
			let that = this;
			uni.request({
				url: BASE_URL + '/app/close/close',
				method: 'POST',
				data: {
					token: uni.getStorageSync('token'),
					shop: this.carId,            
				}
			}).then(res => {
				let [err, data] = res;
				that.freight = data.data.data.freight
			})
		},
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
							uni.redirectTo({
								url: '/pages/fail/index?title=支付失败'
							})
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
							uni.redirectTo({
								url: '/pages/fail/index?title=支付失败'
							})
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
		couponClick (item) {   // 点击优惠券  获取优惠券减少的价格
			this.noCoupon = false;
			this.couponId = item.id;
			Object.values(this.carInfo.discount).forEach((val, index) => {
				this.$set(val, 'checked', false)
			})
			if(item.checked === undefined) {
				this.$set(item, 'checked', true)
			}else {
				this.$set(item, 'checked', true)
			}
			this.subtract_price = item.subtract_price
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
		noCouponClick () {
			Object.values(this.carInfo.discount).forEach((val, index) => {
				this.$set(val, 'checked', false)
			})
			this.noCoupon = true;
			this.subtract_price = 0;
		},
		confirmCoupon () {   // 点击确定使用优惠券
			this._dealRealPrice(this.subtract_price, this.isUseScore);
			this.showCoupon = false;
			
		},
		checkboxClick () {   // 是否使用积分
			if(this.carInfo.score < 100) {
				uni.showToast({
					title: '积分不足100',
					icon: 'none'
				})
			}else {
				this.isUseScore = !this.isUseScore;
				this._dealRealPrice(this.subtract_price, this.isUseScore);
			}
		},
		async _dealRealPrice (minus, isUseScore) {   // 根据积分优惠券计算实付价格
			isUseScore = isUseScore == true ? 1 : 0;
			let result = await dealRealPrice ({
				token: uni.getStorageSync('token'),
				money: this.totalPrice,
				discount: minus,
				score: isUseScore
			})
			if(result.recode == 10000) {
				this.realPrice = (result.data.money + this.freight).toFixed(2)
				this.useScore = Number(result.data.use)
			}else {
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				})
			}
		},
		switchTo () {   // 选择收获地址
			uni.navigateTo({
				url: '/pages/mine/subPages/addressList/addressList?chose=true',
				animationType: 'slide-in-right'
			})
		},
		goToDetail (item) {   // 点击商品查看详情
			uni.navigateTo({
				url: '/pages/home/subPages/mealDetail/mealDetail?id=' + item.xgoods_id,
				animationType: 'slide-in-right'
			})
		},
		choseDeliveryTime () {  // 选择送达时间
			this.pickerValueArray = choseTime;
			this.$refs.mpvuePicker.show();
		},
		onConfirmTime (e) {    // 确认送达时间
		 this.time = e.label;
		 this.judgeTime();
		},
		judgeTime () {  // 判断时间是否合法
			let currentHours = new Date().getHours();
			let currentMinutes = new Date().getMinutes();
			let choseDay = this.time.slice(0, 2);
			let choseHours = this.time.slice(this.time.lastIndexOf('-') + 1, this.time.lastIndexOf(':'));
			let choseMinutes = this.time.slice(this.time.length-2);
			if(choseDay == '今天') {
				if(choseHours < currentHours) {
					uni.showToast({
						title: '所选时间不能小于当前时间',
						icon: 'none'
					})
					this.time = '请选择'
					return;
				}
				if(choseHours == currentHours && choseMinutes < currentMinutes) {
					uni.showToast({
						title: '所选时间不能小于当前时间',
						icon: 'none'
					})
					this.time = '请选择'
					return;
				}	
			}	
		},
		async _getAddressList() {    // 获取地址列表
			if (this.deliveryAddress) {
				return;
			}
			let result = await getAddressList({
				token: uni.getStorageSync('token')
			});
			if (result.data) {    // 如果有默认地址，则使用默认地址，如果没有则使用最后添加的一个地址
				this.addressLength = result.data.length;
				result.data.forEach((val, index) => {
					if(val.status == 1) {
						this.saveDeliveryAddress(val)
					}else {
						this.saveDeliveryAddress(result.data[0])
					}
				})
			} else {
				this.addressLength = 0;
			}
			if (this.addressLength <= 0) {   // 如果没有地址 跳转到添加地址页面
				uni.showModal({
					title: '提示',
					content: '当前没有收获地址，请添加后继续购买',
					success: function(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/mine/subPages/addressList/addressList',
								animationType: 'slide-in-right'
							});
						} else if (res.cancel) {
							uni.navigateBack();
						}
					}
				});
				
			}
		},
		choseCoupon () {  // 点击弹出优惠券
			if(this.carInfo.discount_num > 0) {
				this.showCoupon = true
			}
		},
		bindChange(e) {
			console.log(e);
		},
		async onCreateOrder() {
			let that = this;
			// 确定订单
			if(this.time == '请选择') {
				uni.showToast({
					title: '请选择送达时间',
					icon: 'none',
				})
				return;
			}
			
			uni.request({
				url: BASE_URL + '/app/close/createOrder',
				method: 'POST',
				data: {
					token: uni.getStorageSync('token'),
					shop: this.carId,
					xaddress_id: this.deliveryAddress.id,
					discount_id: this.couponId,
					remark: this.remark,
					score: this.useScore,
					money: this.realPrice,
					time: this.time,
					freight: this.freight
				}
			}).then(res => {
				let [err, data] = res;
				console.log(data.data)
				if(data.data.recode == 10000) {
					that.type = 'bottom';
					that.order_sn = data.data.data.order_sn;
				}else {
					uni.showToast({
						title: data.data.remsg,
						icon: 'none'
					})
				}
			})
// 			uni.redirectTo({
// 				url: '/pages/car/subPages/success-default/success-default',
// 				animationType: 'slide-in-right'
// 			});
		},
		togglePopup () {
			this.type = '';
			this.showCoupon = false
		}
	},
	components: {
		orderAddress,
		listCell,
		payMethods,
		clickButton,
		mpvuePicker,
		uniPopup
	}
};
</script>

<style scoped lang="scss">
/deep/ .item {
	border-bottom: none !important;
}
/deep/ .payMethods {
	margin-top: 20upx;
}
.score {
	display: flex;
	align-items: center;
}
.score-radio {
	width: 40upx;
	height: 40upx;
	margin-right: 10upx;
	background: url('~@/static/images/car/gwc-icon1@2x.png');
	background-size: 100% 100%;
	&.checked {
		background: url('~@/static/images/car/gwc-icon2@2x.png');
		background-size: 100% 100%;
	}
}
.coupon-list {
	padding-bottom: 30upx;
}
.coupon-popup {
	display: flex;
	justify-content: space-between;
	padding: 30upx;
	.coupon-radio {
		width: 40upx;
		height: 40upx;
		background: url('~@/static/images/car/gwc-icon1@2x.png');
		background-size: 100% 100%;
	}
	.coupon-radio.checked {
		background: url('~@/static/images/car/gwc-icon2@2x.png');
		background-size: 100% 100%;
	}
}
.order-info {
	margin-top: 20upx;
	background: #fff;
	.order-goods {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15upx 30upx 40upx 30upx;
		.goods {
			display: flex;
			flex: 1;
			image {
				width: 120upx;
				height: 100upx;
				margin-right: 10upx;
			}
		}
		.goods-num {
			min-width: 100upx;
			margin: 0 30upx 0 20upx;
			text-align: right;
		}
		image {
			width: 18upx;
			height: 26upx;
		}
	}
}
.pay-methods {
	padding: 50upx 70upx;
	// margin-top: 20upx;
	background: #fff;
}
.extra {
	padding: 40upx 30upx 30upx 30upx;
	margin-top: 20upx;
	background: #fff;
	.extra-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30upx;
		textarea {
			width: 100%;
			height: 160upx;
			padding: 17upx;
			border: 1upx solid $content-bgColor;
			font-size: 26upx;
		}
	}
}
</style>
