<template>
	<view>
		<view class="carList">
			<car-list @input="changeInputNumber" :goToDetail="goToDetail" :changeNumber="changeNumber" :carList="carList" :singleClick="singleClick"></car-list>
			<car-pay :totalPrice="totalPrice" :choseAllClick="choseAllClick" :isChoseAll="isChoseAll" :carStatus="carStatus" :pay="pay" :del="del"></car-pay>
		</view>
	</view>
</template>

<script>
import carList from './children/car-list';
import carPay from './children/car-pay';
import { getShopCarInfo, changeShopCarNumber, addGoodsToCar, deleteShopCarGoods, BASE_URL, goToPay } from '@/api';
export default {
	data() {
		return {
			carList: [],
			isChoseAll: false,
			carStatus: true, // 购物车展现状态  结算还是删除 默认结算,
			totalPrice: 0
		};
	},
	onShow() {
		this._getShopInfo();
		this.isChoseAll = false;
		this.totalPrice = 0;
		this.carStatus = true;
	},
	methods: {
		async changeNumber(item, type) {
			// 购物车数量加减
			if (type == 'minus') {
				// 减
				if (item.num <= 1) {
					uni.showToast({
						title: '宝贝不能再减少了哦',
						icon: 'none'
					});
					return;
				}
				let result = await changeShopCarNumber({
					xgoods_id: item.xgoods_id,
					num: item.num - 1,
					token: uni.getStorageSync('token')
				});
				if (result.recode == 10000) {
					item.num = result.data.num;
					item.price = result.data.price;
					this.formatSingePrice();
				}
				console.log(result);
				this.countTotalPrice();
			}
			if (type == 'plus') {
				// 加
				let result = await changeShopCarNumber({
					xgoods_id: item.xgoods_id,
					num: Number(item.num) + 1,
					token: uni.getStorageSync('token')
				});
				console.log(result);
				if (result.recode == 10000) {
					item.num = result.data.num;
					item.price = result.data.price;
					this.formatSingePrice();
				} else {
					uni.showToast({
						title: result.remsg,
						icon: 'none'
					});
				}
				this.countTotalPrice();
			}
		},
		formatSingePrice() {
			// 格式化价格   防止单价 * 数量 后  小数点增多，限制成两位小数
			this.carList.forEach((val, index) => {
				console.log(val)
				let sinleCarPrice = (val.num * val.price).toFixed(2);
				this.$set(val, 'sinleCarPrice', sinleCarPrice)
				// val.sinleCarPrice = sinleCarPrice;
			})
			this.carList = this.carList;
		},
		async changeInputNumber(options) {
			// 输入商品数量
			let temp = options.value;
			let price = options.item.price;
			let result = await changeShopCarNumber({
				xgoods_id: options.item.xgoods_id,
				num: options.value,
				token: uni.getStorageSync('token')
			});
			console.log(JSON.stringify(result));
			if (result.recode == 10000) {
				options.item.num = options.value;
				// options.item.price = result.data.price;
				// options.item.sinleCarPrice = options.value * price;
				this.formatSingePrice();
			} else if (result.recode == 10003) {
				options.item.num = 1;
				// options.item.price = price;
				options.item.sinleCarPrice = options.value * price
				this.formatSingePrice();
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				});
			} else {
				options.item.num = result.data.num;
				// options.item.price = result.data.price;
				// options.item.sinleCarPrice = options.value * price
				this.formatSingePrice();
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				});
			}
		},
		singleClick(item) {
			// 单选框点击
			if (item.checked == 'undefined') {
				this.$set(item, 'checked', true);
			} else {
				this.$set(item, 'checked', !item.checked);
			}
			this.judgeIsChoseAll();
			this.countTotalPrice();
		},
		judgeIsChoseAll() {
			// 判断是否全选
			let flag = true;
			if(this.carList.length <= 0) {
				flag = false;
			}else {
				this.carList.forEach((item, index) => {
					if (!item.checked) {
						flag = false;
					}
				});
			}
			this.isChoseAll = flag;
		},
		choseAllClick() {
			// 全选框点击
			this.isChoseAll = !this.isChoseAll;
			Object.values(this.carList).forEach((item, index) => {
				if (item.checked == 'undefined') {
					this.$set(item, 'checked', this.isChoseAll);
				} else {
					this.$set(item, 'checked', this.isChoseAll);
				}
			});
			this.countTotalPrice();
		},
		countTotalPrice() {
			// 计算总价
			let _totalPrice = 0;
			Object.values(this.carList).forEach((item, index) => {
				if (item.checked) {
					_totalPrice += item.price * item.num;
				}
			});
			this.totalPrice = _totalPrice;
		},
		async _getShopInfo() {
			let token = uni.getStorageSync('token');
			if(!token) {
				this.$dealLogin();
				return;
			}
			// 获取购物车信息
			uni.showLoading({
				title: '正在加载数据...'
			});
			this.carList = [];
			let result = await getShopCarInfo({
				token: uni.getStorageSync('token')
			});
			uni.hideLoading();
			if (result.recode == 10001) {
				uni.redirectTo({
					url: '/pages/login/login/login',
					animationType: 'slide-in-right'
				});
				return;
			}
			if (result.recode == 10000) {
				this.carList = result.data;
				this.carList.forEach((val, index) => {
					let sinleCarPrice = (val.num * val.price).toFixed(2);
					val.sinleCarPrice = sinleCarPrice;
				});
				this.carList = this.carList;
			} else {
				uni.showToast({
					title: result.remsg,
					icon: 'none'
				});
// 				uni.redirectTo({
// 					url: '/pages/login/login/login',
// 					animationType: 'slide-in-right'
// 				});
			}
		},
		async goToDetail(item) {
			// 点击查看商品详情
			uni.navigateTo({
				url: '/pages/home/subPages/mealDetail/mealDetail?id=' + item.xgoods_id,
				animationType: 'slide-in-right'
			});
		},
		pay() {
			// 付款
			let tempArr = [];
			let addressArr 
			this.carList.forEach((val, index) => {
				if(val.checked) {
					tempArr.push(val.id)
				}
			})
			let tempStr = JSON.stringify(tempArr);
			if(tempArr.length <= 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				})
				return
			}
			uni.request({
				method: 'POST',
				url: BASE_URL + '/app/close/close',
				data: {
					shop: tempArr,
					token: uni.getStorageSync('token')
				},
			}).then (res => {
				let [err, result] = res;
				console.log(result)
				if(result.data.recode == 10000) {
					let data = JSON.stringify(result.data.data);
					uni.navigateTo({
						url: '/pages/car/subPages/pay/pay?data=' + data + '&carId=' + tempArr,
						animationType: 'slide-in-right'
					});
				}
			})
		},
		async del() {
			// 删除
			let self = this;
			let tempArr = [];
			this.carList.forEach((val, index) => {
				if (val.checked) {
					tempArr.push(val.id);
				}
			});
			if(tempArr.length <= 0) {
				uni.showToast({
					title: '请至少选择一个商品',
					icon: 'none'
				})
				return;
			}
			uni.showModal({
				title: '提示',
				content: '确定要删除此商品吗？',
				success: function(res) {
					if (res.confirm) {
						uni.request({
							method: 'POST',
							url: BASE_URL + '/app/shopping/deleteGoods',
							header: {
								'content-type': 'application/json'
							},
							data: {
								cart_id: tempArr,
								token: uni.getStorageSync('token')
							},
							success: function(res) {
								if (res.data.recode == 10000) {
									uni.showToast({
										title: '删除成功'
									});
									self._getShopInfo();
									self.countTotalPrice()
									self.judgeIsChoseAll()
								} else {
									uni.showToast({
										title: res.data.remsg,
										icon: 'none'
									});
								}
							}
						});
					}
				}
			});

			// 				let result = await deleteShopCarGoods({
			// 					cart_id: tempArr,
			// 					token: uni.getStorageSync('token')
			// 				})
		}
	},
	onNavigationBarButtonTap(e) {
		let self = this;
		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		// #ifdef APP-PLUS
		let currentWebview = page.$getAppWebview();
		let titleObj = currentWebview.getStyle().titleNView;
		console.log(JSON.stringify(titleObj))
		if (!titleObj.buttons) {
			return;
		}
		titleObj.buttons[0].text = titleObj.buttons[0].text == '管理' ? '完成' : '管理';
		self.carStatus = titleObj.buttons[0].text == '管理' ? true : false;
		//titleObj.buttons[0].text = titleObj.buttons[0].text === "\ue604" ? "\ue605" : "\ue604";
		currentWebview.setStyle({
			titleNView: titleObj
		});
		// #endif
	},
	components: {
		carList,
		carPay
	}
};
</script>

<style scoped lang="scss">
.carList {
	height: 120upx;
	padding: 0 30upx;
	background: $headerBar-color;
}
</style>
