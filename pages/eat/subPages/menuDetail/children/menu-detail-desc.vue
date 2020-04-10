<template>
	<view class="desc">
		<image lazy-load class="desc-img" @tap="previewImage" :src="menuInfo.recipe_image"></image>
		<view class="desc-bottom">
			<view class="desc-name">{{menuInfo.name}}</view>
			<view class="desc-share" @tap="share(menuInfo)">立即分享</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			menuInfo: Object,
			share: Function,
			previewImage: Function
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped lang="scss">
@import '~@/common/mixin.scss';	
.desc {
	background: #fff;
	.desc-img {
		width: 100%;
		height: 500upx;
	}
	.desc-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 37upx 30upx;
		.desc-name {
			font-size: 32upx;
			color: #292929;
		}
		.desc-share {
			@extend .shareBtn
		}
	}
}

</style>
