<template>
	<view class="comment">
		<view class="comment-title">商品评价</view>
		<view class="comment-list">
			<view class="comment-item" v-for="(item, index) of commentList" :key="index">
				<view class="comment-top">
					<view class="comment-person">{{item.xuser_name}}</view>
					<view class="comment-time">{{item.create_time}}</view>
				</view>
				<view class="comment-rate"><uni-rate :size="18" :disabled="true" :value="item.satisfaction" color="#e3e7e6" active-color="#ff5500"></uni-rate></view>
				<view class="comment-content">{{item.content}}</view>
			</view>
			<view class="nodata" v-if="commentList.length <=0">
				<image src="/static/images/mine/nodata1.png"></image>
				<view>没有更多评价了...</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniRate from '@/components/uni-rate/uni-rate.vue';
export default {
	props: {
		commentList: Array
	},
	data() {
		return {
			
		};
	},
	components: {
		uniRate
	}
};
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';
.nodata {
	@extend .nodata;
	padding-top: 50upx;
	image {
		width: 300upx;
		height: 300upx;
	}
}
.comment {
	padding: 40upx 30upx;
	margin-top: 20upx;
	background: #fff;
	.comment-title {
		margin-bottom: 7upx;
		font-size: 32upx;
		color: #292929;
	}
	.comment-item {
		padding: 40upx 0;
		border-bottom: 1upx solid $content-bgColor;
		.comment-top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 1;
			.comment-person {
				font-size: 28upx;
			}
			.comment-time {
				font-size: 20upx;
				color: #959595;
			}
		}
		.comment-rate {
			margin-top: 20upx;
		}
		.comment-content {
			margin-top: 30upx;
			color: $subTitle-color;
			line-height: 1.53;
		}
	}
}
</style>
