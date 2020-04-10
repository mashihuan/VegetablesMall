<template>
	<view>
		<!-- 状态栏 -->
		<status-bar></status-bar>
		<view class="header">
			<!-- 搜索部分 -->
			<home-search :currentCity="addressName" :searchInputClick="searchInputClick"></home-search>
			<view class="carousel-wrap"><homeCarousel :carouselHeight="carouselHeight" :carousel="carousel"></homeCarousel></view>
		</view>
		<!-- 十宫格 -->
		<home-grid :grid="grid" :switchTo="switchTo"></home-grid>
		<!-- 列表 -->
		<home-list :addShopCar="addShopCar" :section="section" :goToDetail="goToDetail"></home-list>
		<!-- 优惠券弹窗 -->
		<view class="coupon-popup" v-show="showCoupon && couponList.length > 0" @touchmove.stop.prevent="">
			<view class="coupon-mask">
				<text @tap="hideCoupon" class="iconfont close-icon">&#xe603;</text>
				<image class="coupon-icon" src="/static/images/home/00@2x.png"></image>
				<view class="coupon-mention">恭喜您获得</view>
				<scroll-view class="uni-center center-box" :scroll-y="true" style="overflow: inherit" @touchmove.stop.prevent="">
					<view class="couponList">
						<view class="couponItem" v-for="(item, index) of couponList" :key="index">
							<view class="coupon-left">
								<view class="coupon-title">{{ item.applicable }}</view>
								<view class="coupon-range">满{{ item.buy_price }}减{{ item.subtract_price }}</view>
							</view>
							<view class="coupon-right"><view class="coupon-btn" @tap="get(item)">领取</view></view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import amap from '@/common/amap-wx.js';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import statusBar from '@/components/status-bar.vue';
import homeSearch from './children/home-search.vue';
import homeCarousel from './children/home-carousel';
import homeGrid from './children/home-grid';
import homeList from './children/home-list';
import { mapState, mapMutations } from 'vuex';
import { getCarousel, getGrid, getSection, addGoodsToCar, getAllCoupon, getCoupon, userGetCoupon } from '@/api';
export default {
	data() {
		return {
			carousel: [],
			grid: [
				{ image: '/static/images/home/shouye-fl-icon6@2x.png', name: '每日签到' },
				{ image: '/static/images/home/shouye-fl-icon7@2x.png', name: '大会员' },
				{ image: '/static/images/home/shouye-fl-icon8@2x.png', name: '邀请有礼' },
				{ image: '/static/images/home/shouye-fl-icon9@2x.png', name: '四季菜谱' },
				{ image: '/static/images/home/shouye-fl-icon10@2x.png', name: '更多分类' }
			],
			section: [],
			couponList: [],
			currentCity: '获取中...',
			showCoupon: false,
			myTop: false,
			amapPlugin: null,
			key: '2934f3cd95a763a7262e1b21a0820075',
			addressName: '获取中...',
		};
	},
	computed: {
		carouselHeight () {
			return uni.upx2px(300) + 'px'
		}
	},
	onReady() {
		this._getCarousel();
		this._getGrid();
		this._getSection();
		this._getAllCoupon();
	},
	onLoad() {
		// this.amapPlugin = new amap.AMapWX({
		// 	key: this.key
		// });
		// this.getRegeo()
		// #ifdef APP-PLUS
		plus.geolocation.getCurrentPosition(  
			function(p) {  
					this.addressName = p.address.district;  
					console.log('获取地址' + JSON.stringify(p));  
			}.bind(this),
			 function(e) {  
					console.log('获取地址失败' + e.message);  
			},  
			{ provider: 'amap' }  
		);  
		// #endif	
	},
	methods: {
		...mapMutations(['saveHomeGridId']),
		getRegeo() {  // 获取位置信息
			let self = this;
			// #ifdef APP-PLUS
			this.amapPlugin.getRegeo({
				success: (data) => {
					self.addressName = data[0].regeocodeData.addressComponent.district;
				}
			});
			// #endif
		},
		async get(item) {
			// 领取优惠券
			let token = uni.getStorageSync('token');
			if (!token) {
				this.$dealLogin();
			}
			let result = await userGetCoupon({
				token: uni.getStorageSync('token'),
				discount_id: item.id
			});
			if (result.recode == 10000) {
				uni.showToast({
					title: '领取成功'
				});
				this._getAllCoupon();
			}
			if (result.recode == 10001) {
				uni.redirectTo({
					url: '/pages/login/login/login',
					animationType: 'slide-in-right'
				});
			}
		},
		hideCoupon() {
			// 隐藏优惠券
			this.showCoupon = false;
		},
		async addShopCar(item) {
			// 加入购物车
			this.$dealLogin();
			let token = uni.getStorageSync('token');
			let result = await addGoodsToCar({
				token: token,
				xgoods_id: item.id,
				num: 1
			});
			if (result.recode == 10000) {
				uni.showToast({
					title: '添加购物车成功'
				});
			} else {
				uni.showToast({
					title: result.remsg
				});
			}
		},
		async _getAllCoupon() {
			// 获取优惠券列表
			let token = uni.getStorageSync('token');
			if (!token) {
				return;
				// this.$dealLogin();
			}
			let result = await getAllCoupon({
				token: uni.getStorageSync('token')
			});
			if (result.recode == 10000) {
				this.showCoupon = true;
				this.couponList = result.data;
			}else {
				this.couponList = []
			}
			if (result.recode == 10001) {
				uni.redirectTo({
					url: '/pages/login/login/login',
					animationType: 'slide-in-right'
				});
			}
		},
		async _getCarousel() {
			// 获取轮播图
			let result = await getCarousel();
			if (result.recode == 10000) {
				result.data.forEach((val, index) => {
					this.carousel.push(val.image);
				});
			}
		},
		async _getGrid() {
			// 获取分类  10宫格
			let result = await getGrid();
			if (result.recode == 10000) {
				this.grid = result.data.concat(this.grid);
			}
		},
		async _getSection() {
			// 获取板块
			uni.showLoading({
				title: '正在加载数据...'
			});
			let result = await getSection();
			uni.hideLoading();
			if (result.recode == 10000) {
				this.section = result.data;
			}
		},
		goToDetail(item) {
			// 商品详情
			if (item.id) {
				if (item.goods_image) {
					uni.navigateTo({
						url: '/pages/home/subPages/mealDetail/mealDetail?id=' + item.id,
						animationType: 'slide-in-right'
					});
				}
			}
		},
		searchInputClick() {
			// 顶部输入框点击
			uni.setStorage({
				key: 'focus',
				data: true
			});
			uni.switchTab({
				url: '/pages/classify/index/index'
			});
		},
		switchTo(gridId, gridName) {
			// 点击跳转页面
			console.log(gridId)
			if (gridId) {
				uni.setStorage({
					key: 'gridId',
					data: gridId,
					success: function () {
						uni.switchTab({
							url: '/pages/classify/index/index'
						});
					}
				})
				// this.saveHomeGridId(gridId);
			}
			if (gridName == '更多分类') {
				// 更多分类
				uni.switchTab({
					url: '/pages/classify/index/index'
				});
			}
			if (gridName == '每日签到') {
				// 签到
				uni.navigateTo({
					url: '/pages/mine/subPages/score/score',
					animationType: 'slide-in-right'
				});
			}
			if (gridName == '大会员') {
				// 会员
				uni.navigateTo({
					url: '/pages/mine/subPages/member/member',
					animationType: 'slide-in-right'
				});
			}
			if (gridName == '邀请有礼') {
				// 邀请
				uni.navigateTo({
					url: '/pages/mine/subPages/invite/invite',
					animationType: 'slide-in-right'
				});
			}
			if (gridName == '四季菜谱') {
				// 菜谱
				uni.switchTab({
					url: '/pages/eat/index/index'
				});
			}
		},
	},
	components: {
		statusBar,
		homeSearch,
		homeCarousel,
		homeGrid,
		homeList,
		uniPopup
	}
};
</script>

<style scoped lang="scss">
.coupon-popup {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 999;
	background: rgba(0, 0, 0, 0.3);
	.coupon-mask {
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -220upx;
		margin-left: -270upx;
		border-radius: 20upx;
		background: #fff;
		.close-icon {
			float: right;
			font-size: 50upx;
			color: #f8b413;
		}
	}
	.coupon-icon {
		position: absolute;
		top: -76upx;
		left: 50%;
		margin-left: -104upx;
		width: 208upx;
		height: 152upx;
	}
	.coupon-mention {
		margin-top: 100upx;
		margin-bottom: 20upx;
		text-align: center;
		font-size: 32upx;
		color: #464646;
	}
	.center-box {
		position: relative;
		width: 540upx;
		height: 440upx;
		.couponList {
			display: flex;
			flex-direction: column;
			align-items: center;
			.couponItem {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 492upx;
				height: 150upx;
				padding: 0 60upx 0 30upx;
				margin-bottom: 20upx;
				background: url('~@/static/images/home/11@2x.png');
				background-size: 100% 100%;
				view {
					color: #fefefc;
				}
				.coupon-range {
					font-size: 30upx;
				}
				.coupon-btn {
					font-size: 30upx;
				}
			}
		}
	}
}

.header {
	height: 336upx;
	background: #60c450;
	.carousel-wrap {
		padding-top: 166upx;
	}
}
</style>
