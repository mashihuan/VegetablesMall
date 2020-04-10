<template>
	<view class="status-bar"><view class="top_view"></view></view>
</template>

<script>
export default {
	
};
</script>

<style scoped lang="scss">
.status-bar {
	height: var(--status-bar-height);
	background: #60c450;
	.top_view {
		position: fixed;
		top: 0;
		z-index: 999;
		height: var(--status-bar-height);
		width: 100%;
		background: #60c450;
	}
}
</style>
