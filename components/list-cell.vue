<template>
	<view class="item" :class="{isAvatar: isAwatar}" @tap="cellClick(title)">
		<view class="item-title">{{title}}</view>
		<input v-if="title != '生日'" :disabled="disabled" @blur="changeNickname" :style="{color: inputColor}" type="text" class="item-text" :key="title" :value="value" @input="$emit('input', $event.target.value)">
		<!-- 时间选择器 -->
		<picker v-if="title=='生日'" class="item-text" mode="date" @change="bindDateChange">{{value}}</picker>
		<image @tap.stop="previewAwatar(awatar)" v-if="title=='头像'" class="item-avatar" :src="awatar"></image>
		<image v-if="isShowArrow" class="item-arrow" src="/static/images/mine/wode-zl-next@2x.png"></image>
	</view>
</template>

<script>
	export default {
		props: {
			isAwatar: Boolean,
			title: String,
			text: String,
			awatar: String,
			disabled: {type: Boolean, default: true},
			isShowArrow: {type: Boolean, default: true},
			cellClick: Function,
			value: {type: [String, Number]},
			inputColor: String,
			bindDateChange: Function,
			changeNickname: Function
		},
		data() {
			return {
				
			};
		},
		methods: {
			previewAwatar (awatar) {
				let arr = [];
				arr.push(awatar);
				console.log(arr)
				uni.previewImage({
					urls: arr,
					// longPressActions: {
					// itemList: ['发送给朋友', '保存图片', '收藏'],
					// 	success: function (res) {
					// 		console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					// 	}
					// }
				});
			}
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';		
.item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 120upx;
	padding: 0 20upx;
	border-bottom: 1upx solid #f4f4f4;
	.item-title {
		@include fontStyle($size: 30upx, $color: $title-color)
	}
	.item-text {
		flex: 1;
		text-align: right;
		color: #999999;	
	}
	.item-avatar {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
	}
	.item-arrow {
		width: 18upx;
		height: 26upx;
		margin-left: 17upx;
	}
}
.isAvatar {
	height: 160upx;
}
</style>
