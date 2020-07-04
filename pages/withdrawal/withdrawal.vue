<template>
	<view class="content">
		<view class="topbg">
			<text>￥{{userinfo.balance}}</text>元
			<view class="rechergenumber">
				<view class="title">提现金额</view>
				<view class="rechergenumbercont">
					<!-- <view class="item" :class="{check:true}">50.00元</view>
					<view class="item">100.00元</view>
					<view class="item">500.00元</view>
					<view class="item">1000.00元</view>
					<view class="item">2000.00元</view>
					<view class="item">3000.00元</view> -->
					<view class="item iteminput">
						￥<input type="number" placeholder="0" v-model="amount"/>自定义金额
					</view>
				</view>
			</view>
		</view>
		<view class="zw"></view>
		<view class="contpay">
			<view class="paytype">
				<view class="paytypetitle">请选择支付方式</view>
				<view class="payitem">
					<view class="img">
						<image src="../../static/img/common/weixin.png" mode=""></image>
					</view>
					<view class="text">微信支付</view>
					<view class="check" @tap="check=0">
						<view class="checkbox" :class="{check:check==0}"></view>
					</view>
				</view>
				<view class="payitem">
					<view class="img">
						<image src="../../static/img/common/zhifubao.png" mode=""></image>
					</view>
					<view class="text">支付宝支付</view>
					<view class="check" @tap="check=1">
						<view class="checkbox" :class="{check:check==1}"></view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="btn">
			<button type="primary" @tap="submit">确认提现</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				userinfo: {},
				amount: '',
				check:0
			}
		},
		methods: {
			// 获取用户信息
			getuserinfo() {
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {

				}
				this.$http.httpTokenRequest(opts, param).then(res => {
					this.userinfo = res.data.data
				})
			},
			// 提现
			submit() {
				if(!this.amount){
					return false
				}
				let opts = {
					url: '/api/finance/withdraw',
					method: 'post'
				}
				let param = {
					amount: this.amount,
					type: this.check
				}
				this.$http.httpTokenRequest(opts, param).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.getuserinfo()
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				})
			}
		},
		onLoad() {
			this.getuserinfo()
		}
	}
</script>

<style>
	.content {
		padding: 0;
		background-color: #f4f8fb;
		padding-bottom: 200rpx;
	}
	
	.topbg {
		width: 750rpx;
		height: 380rpx;
		background: linear-gradient(45deg, rgba(0, 203, 130, 1) 0%, rgba(112, 222, 183, 1) 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		position: relative;
	}
	
	.topbg text {
		font-size: 50rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		margin-bottom: 10rpx;
		padding: 0 10rpx;
	}
	
	.rechergenumber {
		width: 700rpx;
		height: 200rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 15rpx;
		position: absolute;
		margin-left: -350rpx;
		left: 50%;
		bottom: -105rpx;
		z-index: 1;
	}
	
	.rechergenumber .title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		padding: 21rpx;
		border-bottom: 2rpx solid rgba(220, 220, 220, 1);
	}
	
	.rechergenumbercont {
		padding: 0 34rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.rechergenumbercont .item {
		width: 303rpx;
		height: 73rpx;
		border-radius: 37rpx;
		text-align: center;
		line-height: 73rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(128, 128, 128, 1);
		border: 1px solid rgba(128, 128, 128, 1);
		margin-top: 20rpx;
	}
	
	.rechergenumbercont .item.check {
		background: rgba(0, 203, 130, 1);
		border: none;
		color: #fff;
	}
	
	.rechergenumbercont .iteminput {
		width: 100%;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 65rpx;
		padding-right: 39rpx;
	}
	
	.rechergenumbercont .iteminput input {
		flex: 1;
		text-align: left;
	}
	
	.zw {
		height: 100rpx;
	}
	.contpay{
		padding: 0 20rpx;
	}
	.paytype {
		margin-top: 20rpx;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
		box-sizing: border-box;
		padding: 26rpx;
	}
	
	.paytype .paytypetitle {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(128, 128, 128, 1);
		width: 100%;
		margin-bottom: 46rpx;
	}
	
	.payitem {
		display: flex;
		align-items: center;
		margin-bottom: 49rpx;
	}
	
	.payitem .img {
		display: flex;
		align-items: center;
	}
	
	.payitem .img image {
		width: 49rpx;
		height: 49rpx;
		padding-right: 16rpx;
	}
	
	.payitem .text {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	
	.btn button {
		background: rgba(0, 203, 130, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}
	
	.checkbox {
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid rgba(104, 221, 179, 1);
		border-radius: 50%;
	}
	
	.checkbox.check {
		background: rgba(104, 221, 179, 1);
	}
</style>
