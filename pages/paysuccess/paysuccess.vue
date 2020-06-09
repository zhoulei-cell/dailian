<template>
	<view class="content">
		<view class="cont">
			<image src="../../static/img/common/ok.png" mode=""></image>
			<view class="text">订单交易成功</view>
			<view class="btn">
				<button style="margin: 0;">查看订单</button>
				<button>去首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				check:1
			}
		},
		methods: {

		},
		onReady() {

		}
	}
</script>

<style>
	.content {
		background-color: #f4f8fb;
		align-items: center;
		padding-top: 128rpx;
	}
	image{
		width: 118rpx;
		height: 106rpx;
	}
	.cont{
		text-align: center;
	}
	.text{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.btn{
		display: flex;
		margin-top: 32rpx;
	}
	.btn button{
		width: 250rpx;
		height: 80rpx;
		line-height: 80rpx;
		background:rgba(0,203,130,1);
		box-shadow:0px 6rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		margin-left: 57rpx;
	}
</style>
