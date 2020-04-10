<template>
	<view class="about">
		<u-parse :content="this.$store.state.richText"></u-parse>
		<!-- <view>1、本次秒杀活动为xxxxxx用户专享。</view>
		<view>2、活动期间使用任何舞弊的用户一经发现，即刻取消秒杀活动资格。</view>
		<view>
			3、每日秒杀的礼品数量有限，秒完即止。秒杀礼品库存数量在秒杀过程中实时变化，秒杀成功
			与否以实际结果为准。
		</view>
		<view>
			4、每名用户每天可成功参与一次秒杀，活动期间每名用户最高可成功秒杀5次。	
		</view>
		<view>
			5、在成功秒杀后，用户需提供真实信息。如因用户资料不全导致活动奖品无法正确发放的情况，主
			办方不对此产生的任何后果负责。
		</view>
		<view>
			6、所有礼品将在活动结束后的15个工作日内免费寄出。
		</view>
		<view>
			7、本活动最终解释权归xxxxxx所有。
		</view> -->
	</view>
</template>

<script>
	// import uParse from '@/components/uParse/src/wxParse.vue'   如果是html使用此组件
	import uParse from '@/components/uParse/src/wxParse.vue'
	import { mapActions } from 'vuex'
	export default {
		props: {
			
		},
		data() {
			return {
				
			};
		},
		onReady () {
			this.reqGetRichText({token: uni.getStorageSync('token'), category_id: 26});  // 获取关于富文本
		},
		methods: {
			...mapActions(['reqGetRichText'])
		},
		components: {
			uParse,
		}
	}
</script>

<style scoped lang="scss">
.about {
	padding: 20upx 30upx 20upx 20upx;
	background: #fff;
}
.about view {
	margin-bottom: 30upx;
}
.about image {
	width: 100% !important;
}
.about img {
	width: 100% !important;
}
</style>
