<template>
	<view class="service">
		<view class="item" v-for="(item, index) of serviceList" :key="index" @tap="serviceClick(item, index)">
			<image :src="item.icon"></image>
			<text>{{item.text}}</text>
			<text class="number" :selectable="true">{{item.number}}</text>
		</view>
	</view>
</template>

<script>
	import { getContactMethod } from '@/api'
	export default {
		data() {
			return {
				serviceList: [
					{icon: '/static/images/mine/wode-kf-icon1@2x.png', text: '客服QQ', number: ''},
					{icon: '/static/images/mine/wode-kf-icon2@2x.png', text: '客服电话', number: ''},
					{icon: '/static/images/mine/wechat.jpg', text: '客服微信', number: ''},
				]
			};
		},
		onReady () {
			this._getContactMethods();
		},
		methods: {
			async _getContactMethods () {
				let result = await getContactMethod ({
					token: uni.getStorageSync('token')
				})
				console.log(result)
				if(result.recode == 10000) {
					this.$set(this.serviceList[0], 'number', result.data.qq)
					this.$set(this.serviceList[1], 'number', result.data.phone)
					this.$set(this.serviceList[2], 'number', result.data.weixin)
				}
			},
			serviceClick (item, index) {
				if(index == 0) {  // qq
					// plus.runtime.openURL('http://wpa.qq.com/msgrd?v=3&uni="1067615605"&site=qq&menu=yes');
					plus.runtime.openURL(`mqq://im/chat?chat_type=wpa&uin=${item.number}&version=1&src_type=web`);
					
				}
				if(index == 1) {  // 打电话
					uni.makePhoneCall({
							phoneNumber: item.number
					});
				}
				if(index == 2) {  // 微信
					// plus.runtime.openURL('weixin://');
					plus.runtime.openURL('weixin://');
				}
			}
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.service {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	padding: 120upx 30upx;
	.item {
		display: flex;
		flex-direction: column;
		width: 50%;
		align-items: center;
		margin-bottom: 60upx;
		image {
			width: 170upx;
			height: 180upx;
			margin-bottom: 40upx;
		}
		.number {
			margin-top: 12upx;
			@include fontStyle($size: 22upx)
		}
	}
}
</style>
