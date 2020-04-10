<template>
	<swiper class="swiper" style="height: 600upx;">
		<swiper-item v-for="(item, index) of imgList" :key="index">
			<view class="swiper-item"><image @tap="previewImage(imgList)" :src="item"></image></view>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	props: {
		imgList: Array,
		previewImage: Function
	},
	data() {
		return {};
	}
};
</script>

<style scoped lang="scss">
uni-swiper {
	height: 600upx;
}	
image {
	width: 100%;
	height: 600upx;
}
</style>
