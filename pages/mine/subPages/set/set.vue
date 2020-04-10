<template>
	<view class="set">
		<list-cell title="检查更新" :isShowArrow="false" :cellClick="cellClick"></list-cell>
		<list-cell title="关于" :cellClick="cellClick"></list-cell>
		<list-cell title="退出登录" :cellClick="cellClick"></list-cell>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell'
	import { checkUpdate } from '@/api'
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				a: ''
			};
		},
		methods: {
			...mapMutations(['saveDeliveryAddress']),
			async cellClick (title) {
				// #ifndef H5
				let version = plus.runtime.version;
				// #endif
				let self = this;
				if(title == '检查更新') {  // 检查更新
					uni.showLoading({
						title: '正在检查新版本'
					})
					let result = await checkUpdate ({
						version: version
					})
					uni.hideLoading()
					if(result.recode == 10000) {
						uni.showModal({
							content: '检查到新版本，是否更新？',
							success: function (res) {
								if(res.confirm) {
									// #ifdef APP-PLUS
									plus.runtime.openURL(result.data.downloadurl);  // res.data.downloadurl
									// #endif
								}
							}
						})
					}else {
						uni.showToast({
							title: '当前已是最新版本，无需更新',
							icon: 'none'
						})
					}
				}
				if(title == '关于') {  // 关于页面跳转
					uni.navigateTo({
						url: '/pages/mine/subPages/about/about',
						animationType: 'slide-in-right'
					})
				}
				if(title == '退出登录') {  // 退出登录
					let self = this;
					uni.showModal({
						content: '确定要退出登录吗？',
						success: function (res) {
							if(res.confirm) {
								uni.clearStorage();
								self.saveDeliveryAddress('')
								uni.reLaunch({
									url: '/pages/login/login/login',
									animationType: 'slide-in-right'
								})
							}
						}
					})
// 					uni.navigateTo({
// 						url: '/pages/mine/subPages/about/about',
// 						animationType: 'slide-in-right'
// 					})
				}
			}
		},
		components: {
			listCell
		}
	}
</script>

<style scoped lang="scss">
.set {
	padding: 0 30upx;
	background: #fff;
}
</style>
