<template>
	<view class="score">
		<mine-score title="我的积分" :lessign_status="lessign_status" :max_sign="max_sign" :number="score" :signIn="signIn"></mine-score>
		<view class="score-bottom">
			<home-item-title title="积分规则"></home-item-title>
			<score></score>
		</view>
		<signIn-success :confirm="confirm" :isSuccess="isSuccess"></signIn-success>
	</view>
</template>

<script>
	import mineScore from '@/components/mine-score'
	import homeItemTitle from '@/components/home-item-title'
	import score from '../about/about'
	import signInSuccess from '@/components/signIn-success'
	import { signIn, getPersonalInfo, getRichText } from '@/api'
	import { mapActions, mapState } from 'vuex'
	export default {
		data() {
			return {
				isSuccess: false,
				score: 0,
				max_sign: 0,
				lessign_status: 0
			};
		},
		methods: {
			...mapActions(['reqGetRichText']),
// 			async _getRichText () {   // 获取积分规则
// 				let result = await getRichText ({
// 					token: uni.getStorageSync('token'),
// 					category_id: 27
// 				})
// 			},
			async _getPersonalInfo () {  // 获取积分、签到天数
				uni.showLoading({
					title: '正在加载数据',
				})
				let result = await getPersonalInfo ({
					token: uni.getStorageSync('token')
				})
				uni.hideLoading()
				if(result.recode == 10000) {
					this.score = result.data.score;
					this.max_sign = result.data.max_sign;
					this.lessign_status = result.data.lessign_status
				}
				if(result.recode == 10001) {
					uni.redirectTo({
						url: '/pages/login/login/login',
						animationType: 'slide-in-right'
					})
				}
			},
			async signIn () {   // 签到
				let result = await signIn ({
					token: uni.getStorageSync('token'),
				})
				if(result.recode == 10000) {
					this.isSuccess = true;
					this._getPersonalInfo()
				}else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					})
				}
			},
			confirm () {
				this.isSuccess = false;
			}
		},
		onLoad (options) {
			this._getPersonalInfo();
			this.reqGetRichText({token: uni.getStorageSync('token'), category_id: 27});  // 获取积分规则富文本
		},
		components: {
			homeItemTitle,
			score,
			mineScore,
			signInSuccess
		}
	}
</script>

<style scoped lang="scss">
.score-bottom {
	margin-top: 130upx;
	background: #fff;
}

</style>
