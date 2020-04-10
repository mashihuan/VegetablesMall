<template>
	<view>
		<view v-for="(item, index) of goodsInfo" :key="index">
			<goods-info :item="item"></goods-info>
			<textarea name="" id="" cols="30" rows="10" placeholder="请输入您的评价" v-model="rateList[index].content"></textarea>
			<view class="rate">打分：<uni-rate @tap="rateClick(index)" :rateIndex="index"  @change="onChange" :size="22" value="5" color="#e3e7e6" active-color="#ff5500"></uni-rate></view>
		</view>
	</view>
</template>

<script>
	import goodsInfo from '../order/children/goods-info'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import { BASE_URL, evluatePages } from '@/api'
	export default {
		data() {
			return {
				evaluate: '',
				goodsInfo: [],
				rate: '',
				rateList: []
			};
		},
		onLoad (options) {
			this._getEvaluatePage(options.id)
		},
		methods: {
			onChange (e) {    // 评分变化
				console.log(e)
				this.rateList[e.rateIndex].satisfaction = e.value
			},
			rateClick (index) {
				console.log(666)
			},
			async _getEvaluatePage (id) {  // 获取评论页面信息
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await evluatePages ({
					token: uni.getStorageSync('token'),
					order_sn: id
				})
				uni.hideLoading();
				if(result.recode == 10000) {
					this.goodsInfo = result.data;
					result.data.forEach((val, index) => {
						let obj = {content: '', satisfaction: 5, order_id: val.order_id, order_sn: val.order_sn, xgoods_id: val.xgoods_id};
						this.rateList.push(obj)
					})
				}
			},
		},
		onNavigationBarButtonTap () {
			uni.request({
				method: 'POST',
				url: BASE_URL + '/app/xgoodsevaluate/doevaluateOrder',
				data: {
					token: uni.getStorageSync('token'),
					data: this.rateList
				},
			}).then (res => {
				let [err, result] = res;
				if(result.data.recode == 10000) {
					uni.showToast({
						title: '发布成功'
					})
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/mine/subPages/order/order?id=' + 3,
							animationType: 'slide-in-right'
						})
					}, 2000)
				}else {
					uni.showToast({
						title: result.data.remsg,
						icon: 'none'
					})
				}
			})
		},
		components: {
			goodsInfo,
			uniRate
		}
	}
</script>

<style scoped lang="scss">
textarea {
	width: 100%;
	height: 200upx;
	padding: 17upx;
	font-size: 28upx;
	background: #fff;
}
.rate {
	display: flex;
	align-items: center;
	padding: 30upx;
	margin-bottom: 20upx;
	line-height: 1;
	background: #fff;
}
</style>
