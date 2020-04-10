<template>
	<view>
		<view class="eat-season" v-show="goods.length">
			<homeItemTitle title="季节菜谱"></homeItemTitle>
			<homeItem-three :showMoney="false" :goods="goods" :goToDetail="goToDetail"></homeItem-three>
		</view>
		<view class="eat-menu">
			<homeItemTitle title="今日菜单"></homeItemTitle>
			<view class="tag-list">
				<view class="tag-item" :class="{active: current == index}" 
							v-for="(item, index) of tags" :key="index" 
							@tap="showSinglePicker(item, index)">
					{{item.name}}
				</view>
			</view>
			<eatMenu-list :menuList="menuList" :goToDetail="goToDetail"></eatMenu-list>
		</view>
		<!-- pieker -->
		<!-- <mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker> -->
	</view>
</template>

<script>
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	import homeItemTitle from '@/components/home-item-title'
	import homeItemThree from '@/components/home-item-three'
	import eatMenuList from './children/eat-menu-list'
	import { getSeasonMenu, getMenuClassify, getMenuList } from '@/api'
	export default {
		data() {
			return {
				goods: [],
				menuList: [],
				current: 100,
				tags: [],
				themeColor: '#1aad19',
				pickerText: '',
				mode: 'selector',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[],
				pickerSingleArray: [],
			};
		},
		onLoad () {
			this._getSeasonMenu();
			this._getMenuClassify();
			this._getMenuList();
		},
		methods: {
			async _getSeasonMenu () {  // 季节菜谱
				let result = await getSeasonMenu();
				this.goods = result.data;
			},
			async _getMenuClassify () { // 菜谱分类
				let result = await getMenuClassify();
				this.tags = result.data;
				this.tags.push({name: '全部'})
// 				let arr = [];
// 				result.data.forEach((val, index) => {
// 					let obj = {};
// 					obj.label = val.name;
// 					obj.value = val.id;
// 					arr.push(obj)
// 				})
// 				this.pickerSingleArray = arr;
			},
			async _getMenuList () {   // 菜谱列表
				uni.showLoading({
					title: '正在加载数据'
				})
				let result = await getMenuList({
					c_id: ''
				});
				if(result.recode == 10000) {
					uni.hideLoading();
					this.menuList = result.data;
				}else {
					uni.hideLoading();
				}
			},
			goToDetail (item) {   // 跳转菜谱详情
				if(item.id) {
					if(item.recipe_image) {
						uni.navigateTo({
							url: '/pages/eat/subPages/menuDetail/menuDetail?id=' + item.id,
							animationType: 'slide-in-right'
						})
					}
				}
			},
			async showSinglePicker (item, index) {  // 选择菜系
				this.menuList = []
				this.current = index;
				uni.showLoading({
					title: '正在加载数据'
				})
				let result = await getMenuList({
					c_id: item.id
				});
				if(result.recode == 10000) {
					uni.hideLoading();
					this.menuList = result.data;
				}else {
					uni.hideLoading();
				}
				if(item.name == '全部') {
					this._getMenuList()
// 					this.pickerValueArray = this.pickerSingleArray
// 					this.$refs.mpvuePicker.show()
				}
			},
			onConfirm (e) {
				console.log(e)
			},
		},
		components: {
			homeItemTitle,
			homeItemThree,
			mpvuePicker,
			eatMenuList
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.eat-season {
	background: #fff;
	padding: 0 30upx;
	margin-bottom: 20upx;
}
.eat-menu {
	background: #fff;
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		padding-left: 40upx;
		.tag-item {
			width: 90upx;
			height: 32upx;
			line-height: 32upx;
			text-align: center;
			border: 1upx solid #48b238;
			font-size: 20upx;
			color: #48b238;
			border-radius: 5upx;
			margin: 0 22upx 22upx 0;
			@include ellipsis
		}
		.active {
			color: #fff;
			background: #48b238;
		}
	}
}
</style>
