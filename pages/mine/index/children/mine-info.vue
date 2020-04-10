<template>
	<view class="mine">
		<view class="mine-title">个人中心</view>
		<view class="mine-info-wrap">
			<view class="mine-info">
				<navigator hover-class="none" url="/pages/mine/subPages/personalInfo/personalInfo" animation-type="slide-in-right">
					<image class="mine-avatar" :src="mineInfo.avatar || '/static/images/mine/wode-icon-tx@2x.png'"></image>
				</navigator>
				<view class="mine-detail">
					<view class="mine-detail-top">
						<text class="mine-name">{{mineInfo.nickname || '待完善'}}</text> <text v-show="mineInfo.is_vip == 1" class="mine-vip">VIP</text>
					</view>
					<view class="mine-phone">
						<image class="phone-icon" src="/static/images/mine/wode-icon-shouji@2x.png"></image>
						<text class="phone-number">{{mineInfo.mobile || '待完善'}}</text>
					</view>
				</view>
				<view class="mine-signIn">
					<view class="sing-btn" v-if="!mineInfo.lessign_status" @tap="userSignIn">签到</view>
					<view class="sing-btn" v-else @tap="userSignIn">已签到</view>
					<view class="sing-day">已连续签到{{mineInfo.max_sign || 0}}天</view>
				</view>
			</view>
			<view class="mine-info-bottom">
				<view class="mine-discount" @tap="switchTo('coupon')">
					<image src="/static/images/mine/wode-icon-yhq@2x.png"></image>
					<text>优惠券</text><text class="number">{{mineInfo.discount || 0}}张</text>
				</view>
				<view class="mine-score" @tap="switchTo('score')">
					<image src="/static/images/mine/wode-icon-jf@2x.png"></image>
					<text>积分</text><text class="number">{{mineInfo.score || 0}}分</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			switchTo: Function,
			mineInfo: Object,
			userSignIn: Function,
			isSuccess: Boolean
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.mine {
	height: 310upx;
	background: $headerBar-color;
	.mine-title {
		padding-top: var(--status-bar-height);
		color: #fff;
		text-align: center;
		line-height: 44px;
		font-size: 36upx;
	}
	.mine-info-wrap {
		padding: 0 30upx;
	}
	.mine-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.mine-avatar {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
			margin-right: 30upx;
		}
		.mine-detail {
			flex: 1;
			.mine-detail-top {
				display: flex;
				align-items: center;
				.mine-name {
					@include fontStyle($size: 34upx, $color: #fff)
				}
				.mine-vip {
					padding: 3upx 5upx;
					border-radius: 3upx;
					font-style: italic;
					line-height: 1;
					@include fontStyle($size: 14upx, $color: #fff)
					background: #d8b768;
					margin-left: 30upx;
				}
			}
			.mine-phone {
				display: flex;
				align-items: center;
				margin-top: 24upx;
				.phone-icon {
					display: block;
					width: 20upx;
					height: 30upx;
					margin-right: 10upx;
				}
				.phone-number {
					font-size: 24upx;
					line-height: 24upx;
					color: #cfeeca;
				}
			}
		}
		.mine-signIn {
			display: flex;
			flex-direction: column;
			align-items: center;
			.sing-btn {
				width: 100upx;
				height: 50upx;
				text-align: center;
				background: #2a9716;
				border-radius: 5upx;
				color: #fffeff;
			}
			.sing-day {
				margin-top: 15upx;
				@include fontStyle($size: 20upx, $color: #fffeff)
			}
		}
	}
	.mine-info-bottom {
		display: flex;
		width: 100%;
		height: 90upx;
		border-radius: 10upx;
		background: #fff;
		image {
			width: 50upx;
			height: 50upx;
			margin-right: 18upx;
		}
		> view {
			flex: 1;
			display: flex;
			align-items: center;
			padding: 0 20upx 0 40upx;
			.number {
				flex:1;
				text-align: right;
			}
		}
		.mine-discount {
			border-right: 1upx solid $content-bgColor;
		}
	}
}

/* #ifdef APP-PLUS */
.mine-info-bottom {
	margin-top: 10upx;
}
/* #endif */

/* #ifdef H5 */
.mine-info-bottom {
	margin-top: 30upx;
}
/* #endif */


</style>
