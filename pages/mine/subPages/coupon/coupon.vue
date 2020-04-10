<template>
	<view class="coupon">
		<scroll-view class="scroll-view_H" scroll-x="true">
				<view id="demo1" class="scroll-view-item_H"
							:class="{active: currenIndex == index}"
						  v-for="(item, index) of couponStatus" 
						  :key="index"
							@tap="scrollClick(index)"
				>{{item}}</view>
		</scroll-view>
		<swiper class="swiper" @change="swiperChange" :current="swiperCurrent" :style="{height: minHeight}">
				<swiper-item v-for="(data, index1) of couponList" :key="index1">
					<scroll-view scroll-y="true" :style="{ height: scrollHeight }">
						<view class="swiper-item" v-for="(item, index2) of data" :key="index2">
							<view class="coupon-item" :class="{used: index1 == 1, past: index1 == 2}">
								<view class="coupon-left">
									<view class="coupon-money"><text>￥</text>{{item.subtract_price}}</view>
									<view class="coupon-range">满{{item.buy_price}}元可用</view>
								</view>
								<view class="coupon-right">
									<view class="coupon-type">{{item.applicable_name}}</view>
									<view class="coupon-time">有效时间{{item.begin_time}}-{{item.end_time}}</view>
								</view>
							</view>
						</view>
						<view class="nodata" v-if="data.length <= 0">
							<image src="/static/images/mine/nodata2.png"></image>
							<view>没有更多了...</view>
						</view>
					</scroll-view>	
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import { getCoupon } from '@/api'
	export default {
		data () {
			return {
				currenIndex: 0,
				swiperCurrent: 0,
				minHeight: 0,
				windowHeight: 0,
				scrollHeight: 0,
				couponStatus: ['未使用', '已使用', '已过期'],
				couponList: [[],[],[]]
			}
		},
		onLoad (options) {
			console.log(options)
			this._getWindowHeight(); // 获取窗口高度
			this._getCoupon(0);
		},
		methods: {
			async _getCoupon (type) {    // 获取优惠券
				uni.showLoading({
					title: '正在加载数据...',
				})
				let result = await getCoupon ({
					token: uni.getStorageSync('token'),
					type: type
				})
				uni.hideLoading()
				let tempArr = result.data || [];
				this.$set(this.couponList, type, tempArr)
// 				this.couponList[type] = tempArr;
// 				this.couponList = this.couponList;
// 				console.log(this.couponList)
			},
			swiperChange (e) {
				this.currenIndex = e.detail.current;
				this._getCoupon(e.detail.current);
				console.log(e.detail.current)
			},
			scrollClick (index) {
				this.currenIndex = index;
				this.swiperCurrent = index;
			},
			_getWindowHeight () {
				let self = this;
				uni.getSystemInfo({
					success: function (res) {
						self.windowHeight = res.windowHeight;
						self._getSwiperHeight()
					}
				})
			},
			_getSwiperHeight () {
				let arr = [];
				this.couponList.forEach((val, index) => {
					arr.push(val.length);
				})
				for(let j = 0; j < arr.length; j ++) {
					for(let i = 0; i< arr.length; i++) {
						if(arr[i+1] < arr[i]) {
							let temp = arr[i];
							arr[i] = arr[i+1];
							arr[i+1] = temp;
						}
					}
				}
				this.scrollHeight = this.windowHeight - 43 + 'px';
				// 如果最小的优惠券列表小于窗口高度，则把窗口高度赋值给swiper,保证点击屏幕任一点都可以滑动
				this.minHeight = ((arr[0] * 180) < (this.windowHeight - 33) ? (this.windowHeight - 33) : (arr[0] * 180)) + 'px'
			}
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.nodata {
	padding-top: 100upx;
	image {
		width: 200upx;
		height: 200upx;
		margin-bottom: 20upx;
	}
}
uni-swiper-item {
	overflow: inherit;
}
.coupon-item {
	display: flex;
	align-items: center;
	height: 160upx;
	padding: 25upx;
	margin: 20upx 30upx;
	border-radius: 5upx;
	background: #fff;
	.coupon-left {
		margin-right: 70upx;
		.coupon-money {
			margin-bottom: 20upx;
			@include fontStyle($size: 44upx, $color: $headerBar-color)
			text {
				@include fontStyle($size: 24upx, $color: $headerBar-color)
			}
		}
		.coupon-range {
			@include fontStyle($size: 24upx, $color: $headerBar-color)
		}
	}
	.coupon-right {
		.coupon-type {
			margin-bottom: 20upx;
			@include fontStyle($size: 28upx, $color: $title-color)
		}
		.coupon-time {
			@include fontStyle($size: 24upx, $color: $subTitle-color)
		}
	}
}
.coupon-item.used {
	.coupon-left .coupon-money {
		color: #999999;
		text {
			color: #999;
		}
	}
	.coupon-left .coupon-range {
		color: #999;
	}
	.coupon-right .coupon-type, .coupon-right .coupon-time {
		color: #999;
	}
	background: #fff url('~@/static/images/mine/wode-yhq-ysy@2x.png') right center no-repeat;
	background-size: 130upx 98upx;
}
.coupon-item.past {
	.coupon-left .coupon-money {
		color: #999999;
		text {
			color: #999;
		}
	}
	.coupon-left .coupon-range {
		color: #999;
	}
	.coupon-right .coupon-type, .coupon-right .coupon-time {
		color: #999;
	}
	background: #fff url('~@/static/images/mine/wode-yhq-ygq@2x.png') right center no-repeat;
	background-size: 130upx 98upx;
}
	
.scroll-view_H {
	white-space: nowrap;
	dispaly: flex;
	padding: 0 75upx;
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
		margin: 0 75upx;
	}
	.scroll-view-item_H.active {
		color: $headerBar-color;
		border-bottom-color: $headerBar-color;
	}
}
</style>