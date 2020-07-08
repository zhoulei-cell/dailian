<template>
	<view class="content">
		<view class="topinfo">
			<view class="topinfoleft">开通会员</view>
			<view class="topinforight">￥200</view>
		</view>
		<view class="paytype">
			<view class="paytypetitle">请选择支付方式</view>
			<!-- <view class="payitem">
				<view class="img"><image src="../../static/img/common/yue.png" mode=""></image></view>
				<view class="text">余额支付</view>
				<view class="check" @tap="check=1">
					<view class="checkbox" :class="{check:check==1}"></view>
				</view>
			</view> -->
			<view class="payitem" @tap="check=2">
				<view class="img"><image src="../../static/img/common/weixin.png" mode=""></image></view>
				<view class="text">微信支付</view>
				<view class="check">
					<view class="checkbox" :class="{check:check==2}"></view>
				</view>
			</view>
			<view class="payitem" @tap="check=3">
				<view class="img"><image src="../../static/img/common/zhifubao.png" mode=""></image></view>
				<view class="text">支付宝支付</view>
				<view class="check">
					<view class="checkbox" :class="{check:check==3}"></view>
				</view>
			</view>
		</view>
		<custom-popup ref="popup" :title="content" :isCancel="false" @confirm="confirm"/>
		<view class="btn">
			<button @tap="submit">立即支付</button>
		</view>
	</view>
</template>

<script>
	// var wx = require('jweixin-module')
	import customPopup from '../../components/custom-popup/custom-popup.vue'
	export default {
		data() {
			return {
				check: 2,
				content: "后台订单已生成，点击确认获取向银行卡转账信息，向银行卡转账成功以后联系客服充值"
			}
		},
		onLoad() {
			this.getuserinfo()
		},
		methods: {
			// 开通会员
			submit(){
				let opts = {
					url: '/api/app/recharge',
					method: 'post'
				}
				let params = {
					payment_method: this.check==3?'ali_app_pay':'wechat_app_pay',
					amount:200,
					type:0
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						/*uni.showToast({
							icon: 'none',
							title: res.data.msg
						})*/
						this.$refs['popup'].open()
						// uni.reLaunch({
						// 	url: '../user/user'
						// })
					}else{
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			confirm() {
				this.$refs['popup'].close()
				uni.redirectTo({
					url: '/pages/paymentguide/paymentguide'
				})
			},
		}
	}
</script>

<style>
	.content {
		background-color: #f4f8fb;
	}
	.topinfo{
		width:100%;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		display: flex;
		box-sizing: border-box;
		padding: 26rpx;
	}
	.topinfo .topinfoleft{
		flex: 1;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.topinfo .topinforight{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(103,221,179,1);
	}
	.paytype{
		margin-top: 20rpx;
		width:100%;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		box-sizing: border-box;
		padding: 26rpx;
	}
	.paytype .paytypetitle{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(128,128,128,1);
		width: 100%;
		margin-bottom: 46rpx;
	}
	.payitem{
		display: flex;
		align-items: center;
		margin-bottom: 49rpx;
	}
	.payitem .img{
		display: flex;
		align-items: center;
	}
	.payitem .img image{
		width: 49rpx;
		height: 49rpx;
		padding-right: 16rpx;
	}
	.payitem .text{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		flex: 1;
		display: flex;
		align-items: center;
	}
	.btn{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background:rgba(255,255,255,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	.btn button{
		background:rgba(0,203,130,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.checkbox{
		width:30rpx;
		height:30rpx;
		border:2rpx solid rgba(104,221,179,1);
		border-radius:50%;
	}
	.checkbox.check{
		background: rgba(104,221,179,1);
	}
</style>
