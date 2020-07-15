<template>
	<view class="consult">
		<view class="wrap">
			<view class="line">
				订单编号：{{orderinfo.order_no}}
			</view>
			<view class="line">
				发单者预付代练费：￥{{orderinfo.order_price}}
			</view>
			<view class="line">
				代练员效率保证金：￥{{orderinfo.eff_price}}
			</view>
			<view class="line">
				代练员安全保证金：￥{{orderinfo.promise_price}}
			</view>
			<view class="lineinput">
				<text>需要发单者支付代练费：</text><input class="uni-input" placeholder="代练费" placeholder-style="color:#F76260" type="number" :disabled="!submittype" v-model="orderinfo.price"/>
			</view>
			<view class="line">（支付金额不能超过<text class="red">￥{{orderinfo.order_price}}</text>元）</view>
			<view class="lineinput">
				<text>接单者愿意赔偿保证金：</text><input class="uni-input" placeholder="保证金" placeholder-style="color:#F76260" type="number" :disabled="!submittype" v-model="orderinfo.bond"/>
			</view>
			<view class="line">（支付金额不能超过<text class="red">￥{{orderinfo.promise_price}}</text>元）</view>
			<view class="line">
				撤单原因:
			</view>
			<view class="lineinput">
					<textarea  placeholder="撤单原因" :disabled="!submittype" v-model="orderinfo.reason"/>
			</view>
		</view>
		<view class="result" v-if="orderinfo.consult_status === 3 && order_status !== '3'">
			<view class="title">协商结果: </view>
			<view class="result-text result-pd">发单者支付代练费：<text class="red">{{orderinfo.price}}</text>元</view>
			<view class="result-text result-pd">接单者赔偿保证金：<text class="red">{{orderinfo.bond}}</text>元</view>
			<!-- <view class="result-text">温馨提示：扣款详情请看资金流水</view> -->
		</view>
		<view class="btn" v-if="order_status!=5">
			<button type="default" @tap="submit" v-if="submittype">提交</button>
			<button type="default" @tap="tysubmit" v-if="orderinfo.agree && orderinfo.consult_status !== 3">同意协商</button>
			<button type="default" @tap="cssubmit" v-if="!orderinfo.agree && !submittype">撤销协商</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderinfo:{},
				price:"",
				bond:"",
				reason:"",
				id:"",
				type:1,
				submittype:true,
				order_status:''
			}
		},
		methods: {
			//提交
			submit(id){
				let opts = {
					url: '/api/order/consult',
					method: 'post'
				}
				let params={
					order_id:this.orderinfo.id,
					price:this.orderinfo.price,
					bond:this.orderinfo.bond,
					reason:this.orderinfo.reason
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			//获取异常信息
			getinfo(){
				let opts = {
					url: '/api/order/consult/view',
					method: 'get'
				}
				let params={
					order_id:this.id,
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						this.orderinfo=res.data.data
						console.log(this.orderinfo)
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			//同意协商
			tysubmit(){
				let opts = {
					url: '/api/order/consult/agree',
					method: 'post'
				}
				let params = {
					id: this.orderinfo.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},500)
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
			//撤销协商
			cssubmit(){
				let opts = {
					url: '/api/order/consult/cancel',
					method: 'post'
				}
				let params = {
					id: this.orderinfo.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.navigateBack({
							delta:2
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			}
		},
		onLoad: function (option) {
			this.id=option.id
			this.order_status=option.order_status
			if(option.orderinfo){
				this.orderinfo=JSON.parse(option.orderinfo)
				this.orderinfo.order_price=this.orderinfo.price
				this.orderinfo.price=""
				this.submittype=true
			}else{
				this.getinfo()
				this.submittype=false
			}
		}
	}
</script>

<style>
page{
	background-color: #f4f8fb;
}
.consult{
	width: 200%;
	margin: 20rpx; 
}
.wrap,.result{
	padding: 15rpx;
	border-radius: 15rpx;
	background-color: #fff;
}
.btn{
	padding-top: 50rpx;
}
.line{
	font-size: 24rpx;
	color: #666;
	line-height: 70rpx;
}
.lineinput{
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: red;
}
.lineinput input,textarea{
	border: 2rpx solid #E0E0E0;
	font-size: 24rpx;
}
textarea{
	width: 100%;
	padding: 20rpx;
}
text.red{
	color: red;
}
.result{
	margin-top: 20rpx;
	padding: 15rpx 15rpx 30rpx;
}
.result .title{
	height: 60rpx;
	border-bottom: 1rpx solid #eee;
	font-size: 28rpx;
	font-weight: bold;
	line-height: 60rpx;
}
.result .result-text{
	color: #999;
	font-size: 24rpx;
	line-height: 24rpx;
}
.result .result-pd{
	padding: 20rpx 0;
}
</style>
