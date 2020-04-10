<template>
	<view class="container">
		<view v-for="(item, index) of message" :key="index" style="margin-bottom: 10upx;" @longtap="delMessage(item)">
			<!-- <uni-swipe-action :options="options1" @tap="delMessage(item)"> -->
				<view class="message-item" @tap="switchTo(item, index)">
					<view class="read-status" v-if="item.reading_state == 0"><view></view></view>
					<view class="message-title">
						<view class="message-type">{{ item.title }}</view>
						<view class="message-time">{{ item.create_time }}</view>
					</view>
					<view class="message-content">{{ item.content }}</view>
				</view>
			<!-- </uni-swipe-action> -->
		</view>
		<view class="nodata" v-if="message.length <= 0">
			<image src="/static/images/mine/nodata2.png"></image>
			<view>没有更多了...</view>
		</view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import { getMessageList, readMessage, deleteMessage } from '@/api';
export default {
	data() {
		return {
			message: [],
			options2: [
				{
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}
			]
		};
	},
	onLoad() {},
	onShow() {
		this._getMessageList();
	},
	onPullDownRefresh(e) {
		this._getMessageList();
	},
	methods: {
		async _getMessageList() {
			// 获取消息列表
			uni.showLoading({
				title: '正在加载数据...'
			});
			let result = await getMessageList({
				token: uni.getStorageSync('token')
			});
			uni.hideLoading();
			uni.stopPullDownRefresh();
			this.message = result.data || [];
		},
		async delMessage(item) {
			let self = this;
			// 删除消息
			uni.showModal({
				content: '确定要删除此条消息吗？',
				success: function (res) {
					if(res.confirm) {
						deleteMessage({
							token: uni.getStorageSync('token'),
							me_id: item.id
						}).then(result => {
							if (result.recode == 10000) {
								self._getMessageList();
								uni.showToast({
									title: '消息删除成功'
								});
							} else {
								uni.shoToast({
									title: result.remsg
								});
							}
						});	
					}
				}
			})
			
		},
		async switchTo(item, index) {
			// 跳转消息详情并改变消息阅读状态
			let result = await readMessage({
				token: uni.getStorageSync('token'),
				me_id: item.id,
				type: item.type
			});
			uni.navigateTo({
				url: `/pages/mine/subPages/messageDetail/messageDetail?title=${item.title}&id=${item.id}`,
				animationType: 'slide-in-right'
			});
		}
	},
	components: {
		uniSwipeAction
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.read-status {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20upx;
	float: right;
	view {
		width: 18upx;
		height: 18upx;
		border-radius: 50%;
		background: red;
	}
}
.nodata {
	padding-top: 100upx;
	image {
		width: 200upx;
		height: 200upx;
		margin-bottom: 20upx;
	}
}
.container {
	padding-top: 20upx;
}
.message-item {
	height: 150upx;
	padding: 20upx 30upx 0 30upx;
	background: #fff;
	.message-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.message-type {
			@include fontStyle($size: 32upx, $color: $title-color);
		}
		.message-time {
			@include fontStyle($size: 24upx, $color: #9a9a9a);
		}
	}
	.message-content {
		width: 640upx;
		// height: 26upx;
		// line-height: 28upx;
		margin-top: 20upx;
		color: #9a9a9a;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

</style>
