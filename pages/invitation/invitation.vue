<template>
    <view class="content">
		<view class="title">邀请有奖</view>
		<view class="img">
			<image :src="imgurl" mode="widthFix"></image>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
			imgurl:""
        }
    },
    methods: {
		//获取订单详情
		getorderdetail(id){
			let opts = {
				url: '/api/auth/qrcode',
				method: 'get'
			}
			let params = {
			}
			this.$http.httpTokenRequest(opts, params).then(res => {
				if (res.data.code == 200) {
					this.imgurl=res.data.data
				}
			}, error => {
				console.log(error);
			})
		}
    },
	onLoad: function (option) { 
		this.getorderdetail()
	}
}
</script>
<style>
	image{
		border: 2rpx solid #E0E0E0;
	}
	.img{
		text-align: center;
	}
	uni-image{
		width: 500rpx !important;
		height: 500rpx !important;
	}
</style>