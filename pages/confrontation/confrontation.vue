<template>
    <view class="content">
		<navigator url="/pages/arena/arena">
			<view class="item">
				<image src="../../static/img/jjc.png" mode="widthFix"></image>
				<!-- <view class="title">竞技场</view>
				<view class="dec">王者荣耀solo赚零花钱</view> -->
			</view>
		</navigator>
    </view>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
            }
        },
        methods: {
            
        },
        onReady() {
        }
    }
</script>

<style>
    .item{
		padding: 20rpx;
		border-radius: 10rpx;
	}
	.item image{
		width: 100%;
	}
	.item .title{
		color: #fff;
		font-weight: bold;
		font-size: 36rpx;
	}
	.item .dec{
		color: #fff;
	}
</style>
