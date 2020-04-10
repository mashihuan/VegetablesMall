<template>
	<view class="preview">
		<swiper v-if="list.length > 0" class="swiper" indicator-dots="true" indicator-active-color="white" style="height: 600upx; background: #eee">
				<swiper-item v-for="(item, index) of list" :key="index">
						<image @longtap="downloadImage(item)" :src="item" style="height: 100%; width: 100%"></image>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			};
		},
		onLoad (options) {
			this.list = JSON.parse(options.list);
		},
		methods: {
			downloadImage (item) {  // 下载图片并保存到相册
				uni.showActionSheet({
						itemList: ['保存到相册'],
						success: function (res) {
							if(res.tapIndex == 0) {
								uni.downloadFile({
									url: item,
									success: function (res) {
										if(res.statusCode == 200) {
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function (result) {
													uni.showToast({
														title: '保存成功'
													})
												}
											})
										}
									}
								})
							}
						}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
.preview {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	background: #000;
}
</style>
