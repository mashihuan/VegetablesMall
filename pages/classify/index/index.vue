<template>
	<view class="container">
		<!-- 搜索部分 -->
		<view class="search-bg" v-if="searchText">
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:' + height + 'px'" scroll-with-animation>
				<view :id="index === 0 ? 'first' : ''" class="nav-right-item" 
							v-for="(item, index) in searchList" :key="index"
							
				>
					<view class="img-wrap" style="position: relative">
						<image lazy-load="true" :src="item.goods_image" @tap.stop="goToDetail(item)" />
						<view v-if="item.restrictions_num" class="item-limit">限{{item.restrictions_num}}份</view>
					</view>
					<view class="item-content">
						<!-- <view class="item-name ellipsis" @tap.stop="goToDetail(item)">{{ item.name }}</view>
						<view class="item-desc" @tap.stop="goToDetail(item)">{{ item.content }}</view>
						<view class="item-bottom">
							<view>
								<text>{{ '￥' + item.price }}</text>
							</view>
							<image src="/static/images/classify/fenlei-icon-jia@2x.png"  @tap="addShopCar(item)"></image>
						</view> -->
						<view class="item-name ellipsis" @tap.stop="goToDetail(item)">{{ item.name }}</view>
						<view :style="{color: color1}" class="item-desc ellipsis" @tap.stop="goToDetail(item)">{{ item.content }}</view>
						<view :style="{color: color2}" class="item-desc item-remark ellipsis" @tap.stop="goToDetail(item)">{{ item.remark }}</view>
						<view class="item-bottom">
							<view>
								<view :style="{color: color3}" class="cheap_price" v-if="item.cheap_price != 0 && item.cheap_price != 0.00">{{item.cheap}}:{{ '￥' + item.cheap_price }}</view>
								<text :style="{color: color4}" :class="{decoration: item.cheap_price != 0 && item.cheap_price != 0.00}">原价:{{ '￥' + item.price }}</text>
							</view>
							
							<image src="/static/images/classify/fenlei-icon-jia@2x.png" @tap="addShopCar(item)"></image>
						</view>
					</view>
				</view>
				<view v-if="searchList.length <= 0" class="nodata" style="padding-top: 20upx">
					<view>没有匹配到内容...</view>
				</view>
			</scroll-view>
			<view class="search-mask"  @tap.stop="hideSearchBg"></view>
		</view>
		<view class="page-body">
			<!-- 左侧 -->
			<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'">
				<view class="nav-left-item"
							@tap="categoryClickMain(item, index)" 
							:key="index" :class="item.id == categoryActive ? 'active' : ''" 
							v-for="(item, index) in categoryList"
							v-if="item.name"
				>
					{{ item.name }}
				</view>
			</scroll-view>
			<!-- 右侧 -->
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:' + height + 'px'" scroll-with-animation>
				<view :id="index === 0 ? 'first' : ''" class="nav-right-item" 
							v-for="(item, index) in subCategoryList" :key="index"
							
				>
					<view class="img-wrap" style="position: relative">
						<image lazy-load="true" :src="item.goods_image" @tap.stop="goToDetail(item)" />
						<view v-if="item.restrictions_num" class="item-limit">限{{item.restrictions_num}}份</view>
					</view>
					<view class="item-content">
						<!-- <u-parse :content="item.content"></u-parse> -->
						<view class="item-name ellipsis" @tap.stop="goToDetail(item)">{{ item.name }}</view>
						<view :style="{color: color1}" class="item-desc ellipsis" @tap.stop="goToDetail(item)">{{ item.content }}</view>
						<view :style="{color: color2}" class="item-desc item-remark ellipsis" @tap.stop="goToDetail(item)">{{ item.remark }}</view>
						<view class="item-bottom">
							<view>
								<view :style="{color: color3}" class="cheap_price" v-if="item.cheap_price != 0 && item.cheap_price != 0.00">{{item.cheap}}:{{ '￥' + item.cheap_price }}</view>
								<text :style="{color: color4}" :class="{decoration: item.cheap_price != 0 && item.cheap_price != 0.00}">原价:{{ '￥' + item.price }}</text>
							</view>
							
							<image src="/static/images/classify/fenlei-icon-jia@2x.png" @tap="addShopCar(item)"></image>
						</view>
					</view>
				</view>
				<view v-if="subCategoryList.length <= 0" class="nodata">
					<image src="/static/images/mine/noContent.png"></image>
					<view>没有更多了...</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uParse from '@/components/uParse/src/wxParse.vue'
import { getClassifyLeft, getClassifyRight, getSearchFood, addGoodsToCar, changeFontColor } from '@/api'	
export default {
	data() {
		return {
			categoryList: [],
			subCategoryList: [],
			searchList: [],
			searchText: '',
			height: 0,
			categoryActive: 0,
			type: 1,
			scrollTop: 0,
			scrollHeight: 0,
			isFocus: false,
			color1: '',
			color2: '',
			color3: '',
			color4: ''
		};
	},
	components: {
		uParse
	},
	onLoad () {
		
	},
	onReady () {
		this._changeFontColor()
	},
	onShow () {
		// this.categoryActive = this.$store.state.homeGridId;
		// this.categoryActive = uni.getStorageSync('gridId') || 0;
		this._getClassifyLeft();
		this._getFocusStatus();
		this._setInputFocus();
		this.height = uni.getSystemInfoSync().windowHeight;
	},
	onHide () {
		this._removeFocusStatus();
		uni.removeStorageSync('gridId');
	},
	async onNavigationBarSearchInputChanged (res) {   // 搜索框输入监听
		this.searchText = res.text;
		let result = await getSearchFood({
			title: res.text
		})
		this.searchList = result.data || [];
	},
	methods: {
		async _changeFontColor () {    // 获取字体颜色
			let result = await changeFontColor();
			console.log(result.data)
			if(result.recode == 10000) {
				this.color1 = result.data[0][1]
				this.color2 = result.data[1][1]
				this.color3 = result.data[2][1]
				this.color4 = result.data[3][1]
			}
		},
		async addShopCar (item) {
			this.$dealLogin()
			let result = await addGoodsToCar({
				token: uni.getStorageSync('token'),
				xgoods_id: item.id,
				num: 1
			})
			if(result.recode == 10000) {
				uni.showToast({
					title: '加入购物车成功',
				})
			}else {
				uni.showToast({
					title: result.remsg
				})
			}
		},
		goToDetail (item) {  // 点击查看详情
			uni.navigateTo({
				url: '/pages/home/subPages/mealDetail/mealDetail?id=' + item.id,
				animationType: 'slide-in-right'
			})
		},
		async _getClassifyLeft () {   // 获取分类
			let leftIndex = uni.getStorageSync('gridId');
			this.categoryActive = 0;
			this.subCategoryList = [];
			uni.showLoading({
					title: '正在加载数据...'
			});
			var c_id = 0;
			var type = 2;
			// if(leftIndex) {
			// 	c_id = leftIndex;
			// 	type = 2;
			// 	this.categoryActive = leftIndex;
			// }
			var result = await getClassifyLeft();
			if(leftIndex) {
				c_id = leftIndex;
				type = 2;
				this.categoryActive = leftIndex;
			}else {
				c_id = result.data[0].id;
				type = result.data[0].type;
			}
			let result2 = await getClassifyRight({
				c_id: c_id,
				type: type
			});
			uni.hideLoading();
			// if(result2.recode == 10000) {
				this.categoryList = result.data || [];
				this.subCategoryList = result2.data || [];
			// }	
		},
		hideSearchBg (e) {   // 点击蒙版取消搜索部分
			e.stopPropagation();
			e.preventDefault()
			this.searchText = ''; 
		},
		_setInputFocus () {
			let self = this;
			let pages = getCurrentPages();  
			let page = pages[pages.length - 1];  
			// #ifdef APP-PLUS  
			let currentWebview = page.$getAppWebview();
			let titleObj = currentWebview.getStyle().titleNView;  
			// titleObj.searchInput.autoFocus = self.isFocus;
			currentWebview.setStyle({  
					titleNView: titleObj  
			});  
			// #endif  
		},
		_getFocusStatus () {
			let self = this;
			uni.getStorage({
				key: 'focus',
				success: function (res) {
					self.isFocus = true;
				}
			})
		},
		_removeFocusStatus () {
			uni.removeStorage({
				key: 'focus'
			})
			this.isFocus = false;
		},
		scroll(e) {
			this.scrollHeight = e.detail.scrollHeight;
		},
		async categoryClickMain(categroy, index) {   // 左侧点击
			console.log(1)
			uni.showLoading({
				title: '正在加载数据...'
			})
			this.categoryActive = categroy.id;
			let result2 = await getClassifyRight({
				c_id: categroy.id,
				type: categroy.type
			});
			uni.hideLoading();
			this.subCategoryList = result2.data || [];
			this.scrollTop = -this.scrollHeight * index;
		},
	},
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.ellipsis {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.search-bg {
	position: fixed;
	top: var(--window-top);
	bottom: var(--window-bottom);
	left: 0;
	right: 0;
	z-index: 999;
	.search-mask {
		position: fixed;
		top: var(--window-top);
		bottom: var(--window-bottom);
		width: 24%;
		right: 0;
		background: rgba(0, 0, 0, .7);
	}
}
.nodata {
	@extend .nodata;
	image {
		width: 300upx;
		height: 300upx;
	}
}
.page-body {
	display: flex;
}
.nav {
	display: flex;
	width: 100%;
}
.nav-left {
	width: 24%;
	.nav-left-item {
		height: 100upx;
		font-size: 26upx;
		color: $title-color;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
.nav-right {
	width: 76%;
	background: #fff;
	.nav-right-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 250upx;
		padding: 30upx 30upx 25upx;
		border: 1upx solid #f4f4f4;
		.img-wrap {
			width: 32%;
			height: 160upx;
			// margin-right: 30upx;
		}
		image {
			// width: 160upx;
			width: 100%;
			height: 160upx;
			border-radius: 15upx;
		}
		.item-content {
			width: 65%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.item-name {
				font-size: 30upx;
				line-height: 1.33;
				color: $title-color;
				width: 100%;
			}
			.item-desc  {
				font-size: 20upx;
				line-height: 1.33;
				margin-top: 12upx;
				color: #595959;
			}
			.item-remark {
				font-size: 24upx;
			}
			.item-bottom {
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10upx;
				color: $money-color;
				text, .cheap_price {
					color: $money-color;
					font-size: 24upx;
					line-height: 1;
				}
				.decoration {
					// text-decoration: line-through;
				}
				image {
					width: 34upx;
					height: 34upx;
				}
			}
		}
	}
}
.active {
	color: #68ca59 !important;
	background: #fff;
}
.item-limit {
	position: absolute;
	bottom: 0;
	right: 0;
	padding: 0 10upx;
	height: 26upx;
	text-align: center;
	font-size: 18upx;
	color: $limit-color;
	border-radius: 5upx;
	background: $limit-bgColor;
}
/*#ifdef APP-PLUS */
.item-limit {
	height: 26upx;
}
/*#endif*/ 
	
/*#ifdef H5*/ 
.item-limit {
	min-width: 80upx;
 	height: 38upx;
 }
/*#endif*/ 
</style>
