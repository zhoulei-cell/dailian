<template>
	<view class="content">
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
			<text>需要对方支付代练费：</text><input class="uni-input" placeholder="代练费" placeholder-style="color:#F76260" type="number" :disabled="!submittype" v-model="orderinfo.price"/>
		</view>
		<view class="line">（支付金额不能超过<text class="red">￥{{orderinfo.order_price}}</text>元）</view>
		<view class="lineinput">
			<text>我愿意赔偿保证金：</text><input class="uni-input" placeholder="保证金" placeholder-style="color:#F76260" type="number" :disabled="!submittype" v-model="orderinfo.bond"/>
		</view>
		<view class="line">（支付金额不能超过<text class="red">￥{{orderinfo.promise_price}}</text>元）</view>
		<view class="line">
			撤单原因:
		</view>
		<view class="lineinput">
		    <textarea  placeholder="撤单原因" :disabled="!submittype" v-model="orderinfo.reason"/>
		</view>
		<view class="btn">
			<button type="default" @tap="submit" v-if="submittype">提交</button>
			<button type="default" @tap="tysubmit" v-if="orderinfo.agree">同意协商</button>
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
				submittype:true
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
						uni.navigateBack({
							delta:2
						})
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
			console.log(option.id)
			this.id=option.id
			if(option.orderinfo){
				this.orderinfo=JSON.parse(option.orderinfo)
				this.orderinfo.order_price=this.orderinfo.price
				this.orderinfo.price=""
				this.submittype=true
				console.log(this.orderinfo)
			}else{
				this.getinfo()
				this.submittype=false
			}
		}
	}
</script>

<style>
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
.red{
	color: red;
}
</style>
