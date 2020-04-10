<template>
	<view>
		<mine-info :isSuccess="isSuccess" :userSignIn="userSignIn" :mineInfo="mineInfo" :switchTo="switchTo"></mine-info>
		<view class="mine-content">
			<mine-order :moreOrderClick="moreOrderClick" :list="orderList" :switchTo="switchTo"></mine-order><!-- 订单 -->
			<mine-order :list="functionList" :switchTo="switchTo"></mine-order><!-- 功能 -->
		</view>
		<signIn-success :isSuccess="isSuccess" :confirm="signSuccessConfirm"></signIn-success>
	</view>
</template>

<script>
	import mineInfo from './children/mine-info'
	import mineOrder from './children/mine-order'
	import signInSuccess from '@/components/signIn-success'
	import { getPersonalInfo, getMessageList, signIn, getOrderList, getAfterSaleRecord } from '@/api'
	export default {
		data() {
			return {
				orderList: {
					type: 'order',
					title: '我的订单',
					 list: [
						{icon: '/static/images/mine/wode-icon-dfk@2x.png', text: '待付款'},
						{icon: '/static/images/mine/wode-icon-dsh@2x.png', text: '待收货'},
						{icon: '/static/images/mine/wode-icon-dpj@2x.png', text: '待评价'},
						{icon: '/static/images/mine/wode-icon-sh@2x.png', text: '售后/退款'},
					]
				},
				functionList: {
					type: 'function',
					title: '常用功能', 
					list: [
						{icon: '/static/images/mine/wode-icon-vip@2x.png', text: '会员卡'},
						{icon: '/static/images/mine/wode-icon-address@2x.png', text: '收货地址'},
						{icon: '/static/images/mine/wode-icon-wallet@2x.png', text: '我的钱包'},
						{icon: '/static/images/mine/wode-icon-gift@2x.png', text: '邀请有礼'},
						{icon: '/static/images/mine/wode-icon-kf@2x.png', text: '联系客服'},
						{icon: '/static/images/mine/wode-icon-yjfk@2x.png', text: '意见反馈'},
						{icon: '/static/images/mine/wode-icon-sz@2x.png', text: '设置'},
					]
				},
				minHeight: 0,
				mineInfo: {},
				isShowRedDot: false,
				isSuccess: false, // 签到成功与否
			};
		},
		onNavigationBarButtonTap () {  // 消息按钮点击
			uni.navigateTo({
				url: '/pages/mine/subPages/message/message',
				animationType: 'slide-in-right'
			})
		},
		onLoad () {
			
		},
		onShow () {
			this._getOrderList();
			this._getPersonalInfo();
			this._getMessageList();
			this._getAfterSaleRecord()
		},
		onReady () {
			
		},
		onPullDownRefresh () {
			this._getPersonalInfo();
		},
		methods: {
			async _getAfterSaleRecord () {
				let result = await getAfterSaleRecord({
					token: uni.getStorageSync('token')
				})
				if(result.recode == 10000) {
					let num4 = 0;
					result.data.forEach((val, index) => {
						num4 ++;
						this.$set(this.orderList.list[3], 'num', num4)
					})
				}
			},
			async _getOrderList () {
				let result = await getOrderList ({
					token: uni.getStorageSync('token'),
					status: 'all'
				})
				let list = [];
				if(result.recode == 10000) {
					if(result.data.length) {
						list = result.data;
					}else {
						list = Object.values(result.data)
					}
				}
				let num1 = 0, num2 = 0, num3 = 0, num4 =0
				list.forEach((val, index) => {
					if(val.order_status == '待付款' || val.order_status == '代付款') {
						num1 ++;
						this.$set(this.orderList.list[0], 'num', num1)
					}
					if(val.order_status == '待收货') {
						num2 ++;
						this.$set(this.orderList.list[1], 'num', num2)
					}
					if(val.order_status == '待评价') {
						num3 ++;
						this.$set(this.orderList.list[2], 'num', num3)
					}
				})
			},
			async userSignIn () {     // 用户签到
				let result = await signIn ({
					token: uni.getStorageSync('token')
				})
				if(result.recode == 10000) {
					this.isSuccess = true;
					this._getPersonalInfo();
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
			signSuccessConfirm () {   // 点击取消签到成功弹窗
				this.isSuccess = false;
			},
			async _getPersonalInfo () {     // 获取个人信息
				let token = uni.getStorageSync('token');
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await getPersonalInfo({
					token: uni.getStorageSync('token')
				});
				uni.hideLoading();
				uni.stopPullDownRefresh();
				if(result.recode == 10000) {
					this.mineInfo = result.data;
				}else {
					uni.redirectTo({
						url: '/pages/login/login/login',
						animationType: 'slide-in-right'
					})
				}
			},
			async _getMessageList () {      // 获取消息列表判断是否右上角红点是否显示
				let result = await getMessageList ({
					token: uni.getStorageSync('token')
				})
				if(result.recode == 10000) {
					let flag = false;
					result.data.forEach((val, index) => {
						if(val.reading_state == 0) {
							flag = true
						}
					})
					this.isShowRedDot = flag;
					this.setStyle(0, this.isShowRedDot);
				}else {
					this.isShowRedDot = false;
					this.setStyle(0, this.isShowRedDot);
				}
			},
			setStyle(index, show,text) {     // 动态设置消息右上角红点
				let self = this;
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				// #ifdef APP-PLUS
				let currentWebview = page.$getAppWebview();
				if(show){
					currentWebview.showTitleNViewButtonRedDot({index:index,text:text})
				}else{
					currentWebview.hideTitleNViewButtonRedDot({index:index})
				}
				// #endif
			},
			switchTo (type, index) {   // 页面跳转
				if(type == 'order') {
					if(index == 0) {
						uni.navigateTo({
							url: '/pages/mine/subPages/order/order?id=0',
							animationType: 'slide-in-right'
						})
					}
					if(index == 1) {
						uni.navigateTo({
							url: '/pages/mine/subPages/order/order?id=2',
							animationType: 'slide-in-right'
						})
					}
					if(index == 2) {
						uni.navigateTo({
							url: '/pages/mine/subPages/order/order?id=3',
							animationType: 'slide-in-right'
						})
					}
					if(index == 3) {
						uni.navigateTo({
							url: '/pages/mine/subPages/after-sale/after-sale',
							animationType: 'slide-in-right'
						})
					}
				}
				if(type == 'function') {
					if(index == 0) {
						uni.navigateTo({
							url: '/pages/mine/subPages/member/member',
							animationType: 'slide-in-right'
						})
					}
					if(index == 1) {   // 收获地址
						uni.navigateTo({
							url: '/pages/mine/subPages/addressList/addressList',
							animationType: 'slide-in-right'
						})
					}
					if(index == 2) {   // 钱包
						uni.navigateTo({
							url: '/pages/mine/subPages/wallet/wallet',
							animationType: 'slide-in-right'
						})
					}
					if(index == 3) {   // 邀请有礼
						uni.navigateTo({
							url: '/pages/mine/subPages/invite/invite',
							animationType: 'slide-in-right'
						})
					}
					if(index == 4) {    // 联系客服
						uni.navigateTo({
							url: '/pages/mine/subPages/customer-service/customer-service',
							animationType: 'slide-in-right'
						})
					}
					if(index == 5) {    // 意见反馈
						uni.navigateTo({
							url: '/pages/mine/subPages/feedback/feedback',
							animationType: 'slide-in-right'
						})
					}
					if(index == 6) {   // 设置
						uni.navigateTo({
							url: '/pages/mine/subPages/set/set',
							animationType: 'slide-in-right'
						})
					}
				}
				if(type == 'coupon') {   // 优惠券
					uni.navigateTo({
						url: '/pages/mine/subPages/coupon/coupon',
						animationType: 'slide-in-right'
					})
				}
				if(type == 'score') {   // 积分
					let score = this.mineInfo.score || 0;
					let max_sign = this.mineInfo.max_sign || 0
					uni.navigateTo({
						url: '/pages/mine/subPages/score/score?score=' + score + '&max_sign=' + max_sign,
						animationType: 'slide-in-right'
					})
				}
			},
			moreOrderClick () {
				uni.navigateTo({
					url: '/pages/mine/subPages/order/order',
					animationType: 'slide-in-right'
				})
			}
		},
		components: {
			mineInfo,
			mineOrder,
			signInSuccess
		}
	}
</script>

<style scoped lang="scss">
.mine-content {
	padding: 0 30upx;
}
.mine-content {
	margin-top: 80upx;
}
/* #ifdef APP-PLUS */
.mine-content {
	margin-top: 80upx;
}
/* #endif */
/* #ifdef H5 */
.mine-content {
	margin-top: 55upx;
}
/* #endif */
</style>
