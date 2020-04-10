<template>
	<view>
		<menuDetail-desc :previewImage="previewImage" :share="share" :menuInfo="menuInfo"></menuDetail-desc>
		<menuDetail-food :foodList="foodList" :addShopCar="addShopCar" :goToDetail="goToDetail"></menuDetail-food>
		<menuDetail-step :menuStep="menuStep"></menuDetail-step>
	</view>
</template>

<script>
import menuDetailDesc from './children/menu-detail-desc';
import menuDetailFood from './children/menu-detail-food';
import menuDetailStep from './children/menu-detail-step';
import { getMenuDetail, shareMenu, addGoodsToCar } from '@/api';
export default {
	data() {
		return {
			menuInfo: {},
			foodList: [],
			menuStep: []
		};
	},
	onLoad(options) {
		this._getMenuDetail(options.id);
	},
	methods: {
		async share(item) {
			// 分享菜谱  获得积分
			var token = uni.getStorageSync('token');
			var scene = '';
			if (!token) {
				this.$dealLogin();
			} else {
				uni.showActionSheet({
					itemList: ['分享到聊天', '分享到朋友圈'],
					success: function(res) {
						if (res.tapIndex == 0) {
							scene = 'WXSceneSession';
						}
						if (res.tapIndex == 1) {
							scene = 'WXSenceTimeline';
						}
						uni.share({
							provider: 'weixin',
							scene: scene,
							type: 0,
							// title: '买菜帮分享',
							imageUrl: 'http://112.124.201.81/logo.png',
							href: 'https://fir.im/g41w',
							summary: '我正在使用买菜帮APP，生鲜蔬果急宅送，赶紧跟我一起来体验!',
							success: function(res) {
								shareMenu({
									token: token,
									recipe_id: item.id
								});
								console.log('success:' + JSON.stringify(res));
							}
						});
					}
				});
			}
		},
		async addShopCar (item) {   // 添加购物车
			var token = uni.getStorageSync('token');
			if(!token) {
				this.$dealLogin()
			}else {
				let result = await addGoodsToCar({
					token: token,
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
			}
		},
		goToDetail (item) {
			uni.navigateTo({
				url: '/pages/home/subPages/mealDetail/mealDetail?id=' + item.id,
				animationType: 'slide-in-right'
			})
		},
		async _getMenuDetail(id) {
			// 菜谱详情
			uni.showLoading({
				title: '正在加载数据...'
			});
			let result = await getMenuDetail({
				r_id: id
			});
			uni.hideLoading();
			this.menuInfo = result.data;
			this.foodList = result.data.xmaterial;
			this.menuStep = result.data.procedure;
		},
		previewImage () {
// 			uni.previewImage({
// 				indicator: 'number',
// 				urls: this.menuInfo.goodsimages
// 			});
		},
	},
	onNavigationBarButtonTap(e) {
		let token = uni.getStorageSync('token');
		if (!token) {
			this.$dealLogin();
		} else {
			uni.switchTab({
				url: '/pages/car/index/index'
			});
		}
	},
	components: {
		menuDetailDesc,
		menuDetailFood,
		menuDetailStep
	}
};
</script>

<style scoped lang="scss"></style>
