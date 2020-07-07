<template>
	<view class="chat-list"></view>
</template>

<script>
	export default {
		onShow() {
			uni.navigateTo({
				url: '/pages/chat/chat'
			})
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
</style>
