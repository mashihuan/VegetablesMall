<template>
	<view class="message">
		<view class="message-time">{{messageInfo.create_time}}</view>
		<!-- <image v-if="messageInfo.img" :src="messageInfo.img"></image>
		<view class="message-paragraph">{{messageInfo.content}}</view> -->
		<uParse :content="messageInfo.content"></uParse>
	</view>
</template>

<script>
	import { getMessageDetail } from '@/api'
		import uParse from '@/components/uParse/src/wxParse.vue'
	export default {
		data() {
			return {
				messageInfo: {}
			};
		},
		onLoad (params) {
			uni.setNavigationBarTitle({  // 导航栏设置对应的消息标题
					title: params.title
			});
			this._getMessagDetail(params.id)
		},
		methods: {
			async _getMessagDetail (id) {   // 获取消息详情
				uni.showLoading({
					title: '正在加载数据...'
				})
				let result = await getMessageDetail ({
					token: uni.getStorageSync('token'),
					me_id: id
				})
				uni.hideLoading()
				console.log(result)
				this.messageInfo = result.data;
			}
		},
		components: {
			uParse
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.message {
	height: 100%;
	padding: 30upx;
	background: #fff;
	.message-time {
		width: 300upx;
		height: 40upx;
		text-align: center;
		border-radius: 40upx;
		background: $content-bgColor;
		margin: 0 auto 20upx auto;
		@include fontStyle($size: 24upx);
		line-height: 40upx;
	}
	image {
		width: 100%;
		height: 260upx;
		margin-bottom: 30upx;
	}
	.message-paragraph {
		margin-bottom: 20upx;
		word-break: break-word;
		text-indent: 2em;
		text-align: justify;
	}
}
</style>
