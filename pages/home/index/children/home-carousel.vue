<template>
	<view class="carousel">
		<!-- <view class="page-section swiper">
			<view class="page-section-spacing">
				
			</view>
		</view> -->
		<swiper :style="{height: carouselHeight}" class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="true" indicator-active-color="#ffffff">
			<swiper-item v-for="(item, index) of carousel" :key="index">
				<image :src="item" ></image> <!-- lazy-load="true"  :style="{height: carouselHeight}"-->
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {
	props: {
		carousel: Array,
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
		};
	},
	computed: {
		carouselHeight () {
			return (uni.upx2px(300) + 'px')
		}
	}
};
</script>

<style scoped lang="scss">
.carousel {
	// height: 260upx;
	padding: 0 20upx;
	.swiper {
		// height: 260upx;
		image {
			display: block;
			width: 100%;
			// height: 260upx;
			height: 360upx;
		}
	}
	
}
</style>
