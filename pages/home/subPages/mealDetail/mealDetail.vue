<template>
	<view>
		<mealDetail-desc :colorArr="colorArr" :previewImage="previewImage" :addShopCar="addShopCar" :detail="detail"></mealDetail-desc>
		<mealDetail-comment :commentList="commentList"></mealDetail-comment>
	</view>
</template>

<script>
import mealDetailDesc from './children/meal-detail-desc'
import mealDetailComment from './children/meal-detail-comment'
import { getMealDetail, addGoodsToCar, changeFontColor } from '@/api'
export default {
	data() {
		return {
			detail: {},
			commentList: [],
			colorArr: []
		};
	},
	onLoad (options) {
		this._getMealDetail(options.id);
		this._changeFontColor()
	},
	methods: {
		async _changeFontColor () {
			let result = await changeFontColor()
			console.log(result)
			let arr = [];
			result.data.forEach((val, index) => {
				arr.push(val[1])
			})
			this.colorArr = arr
		},
		async addShopCar (item) {      // 加入购物车
			this.$dealLogin();
			let result = await addGoodsToCar({
				token: uni.getStorageSync('token'),
				xgoods_id: item.id,
				num: 1
			})
			if(result.recode == 10000) {
				uni.showToast({
					title: '加入购物车成功'
				})
			}else {
				uni.showToast({
					title: result.remsg
				})
			}
		},
		async _getMealDetail (id) {  // 获取商品详情
			uni.showLoading({
				title: '正在加载数据...'
			})
			let result = await getMealDetail({
				g_id: id
			})
			uni.hideLoading()
			if(result.recode == 10000) {
				this.detail = result.data;
				this.commentList = result.data.evaluate;
			}else {
				uni.showToast({
					title: result.remsg,
					icon: 'loading'
				})
			}
		},
		previewImage (list) {
// 			uni.previewImage({
// 				indicator: 'number',
// 				urls: this.detail.goodsimages
// 			});
			let imgList = JSON.stringify(list)
			uni.navigateTo({
				url: '/pages/home/subPages/previewImage/previewImage?list=' + imgList,
				animationType: 'slide-in-right'
			})
		},
	},
	components: {
		mealDetailDesc,
		mealDetailComment
	}
}
</script>

<style scoped lang="scss"></style>
