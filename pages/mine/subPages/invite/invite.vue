<template>
	<view class="invite">
		<image class="invite-img" src="/static/images/mine/wode-yq-pic@2x.png"></image>
		<!-- <view class="invite-title">鱼小漠成功邀请鱼漠漠获得30元抵用券</view> -->
		<view class="invite-content">
			<home-item-title title="活动规则"></home-item-title>
			<activity-rule></activity-rule>
		</view>
		<view class="invite-btn">
			<view @tap="invite">立即邀请微信好友</view>
		</view>
	</view>
</template>

<script>
	import homeItemTitle from '@/components/home-item-title'
	import activityRule from '../about/about'
	import clickButton from '@/components/click-button'
	import { mapActions, mapState } from 'vuex'
	import { getPersonalInfo } from '@/api'
	export default {
		data() {
			return {
				id: ''
			};
		},
		onReady () {
			this.reqGetRichText({token: uni.getStorageSync('token'), category_id: 25});  // 获取积分规则富文本
		},
		onLoad () {
			this._getUserId()
		},
		methods: {
			...mapActions(['reqGetRichText']),
			async _getUserId () {
				let result = await getPersonalInfo({
					token: uni.getStorageSync('token')
				})
				this.id = result.data.id;
			},
			invite () {   // 立即邀请
				let uid = this.id;
				let token = uni.getStorageSync('token');
				if(!token) {
					this.$dealLogin();
					return;
				}
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://112.124.201.81/index.html#/?id=" + uid,
					title: "买菜帮分享",
					summary: "我正在使用买菜帮，一键下单蔬果厨料新鲜送到家，赶紧跟我一起来体验！",
					imageUrl: "",
					success: function (res) {
						// uni.showModal({
						// 	title: '提示',
						// 	content: '邀请好友成功！',
						// 	showCancel: false,
						// 	success: function (res) {
						// 			if (res.confirm) {
						// 				
						// 			}
						// 	}
						// });
					},
				});
			}
		},
		components: {
			homeItemTitle,
			activityRule,
			clickButton
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.invite {
	background: #fff;
}
.invite-img {
	display: block;
	width: 100%;
	height: 210upx;
}
.invite-title {
	height: 50upx;
	text-align: center;
	background: #fff;
	@include fontStyle($size: 24upx, $color: #979797);
	line-height: 50upx;
}
.invite-content {
	background: #fff;
	padding-bottom: 135upx;
	margin-top: 20upx;
	border-top: 20upx solid $content-bgColor;
}
.invite-btn {
	position: fixed;
	bottom: 40upx;
	left: 0;
	width: 100%;
	padding: 0 75upx;
	view {
		width: 100%;
		height: 90upx;
		background: $headerBar-color;
		@include fontStyle($size: 34upx, $color: #fff);
		text-align: center;
		line-height: 90upx;
		border-radius: 15upx;
		box-shadow: 4upx 4upx 1upx #ccc;
	}
}
</style>
