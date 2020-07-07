<template>
	<view class="load-more">
		<view class="text">{{text}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			text: {
				type: String,
				default: "上拉加载更多..."
			}
		}
	}
</script>

<style lang="scss">
	.load-more{
		padding: 30upx;
	}
	.load-more .text{
		color: #888;
		font-size: 24upx;
		text-align: center;
		line-height: 24upx;
	}
</style>
