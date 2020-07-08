<template>
    <view class="content">
		<navigator url="/pages/arena/arena">
			<!-- <view class="item">
				<view class="title">竞技场</view>
				<view class="dec">王者荣耀solo赚零花钱</view>
			</view> -->
			<view class="img-box">
				<image src="../../static/img/other/center.png" mode="widthFix"></image>
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

<style lang="scss">
   .content{
		 padding: 0;
		 .img-box{
			 padding: 30upx 9upx 0 5upx;
			 image{
				 width: 736upx;
				 height: 176upx;
			 }
		 }
	 }
</style>
