<template>
	<view>
		<mine-score title="钱包余额" :number="balance"></mine-score>
		<view class="recharge">
			<view class="recharge-btn" @tap="recharge">去充值</view>
		</view>
	</view>
</template>

<script>
	import mineScore from '@/components/mine-score'
	import { getPersonalInfo } from '@/api'
	export default {
		data() {
			return {
				balance: '',
				
			};
		},
		onLoad () {
			
		},
		onShow () {
			this._getPersonalInfo()
		},
		methods: {
			recharge () {     // 充值
				uni.navigateTo({
					url: '/pages/mine/subPages/recharge/recharge',
					animationType: 'slide-in-right'
				})
			},
			async _getPersonalInfo () {  // 获取余额
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await getPersonalInfo ({
					token: uni.getStorageSync('token')
				})
				uni.hideLoading()
				this.balance = result.data.balance || 0
			}
		},
		components: {
			mineScore
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.recharge {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 30upx;
	height: 80upx;
	background: #48b236;
	.recharge-btn {
		width: 100upx;
		height: 44upx;
		text-align: center;
		border: 1upx solid #fefefe;
		border-radius: 10upx;
		@include fontStyle($size: 24upx, $color: #fefefe);
		line-height: 44upx;
	}
}
</style>
