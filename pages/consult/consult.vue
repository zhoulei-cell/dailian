<template>
	<view class="content">
		<view class="line">
			订单编号：8113161561516
		</view>
		<view class="line">
			发单者预付代练费：￥20
		</view>
		<view class="line">
			代练员效率保证金：￥20
		</view>
		<view class="line">
			代练员安全保证金：￥20
		</view>
		<view class="lineinput">
			<text>需要对方支付代练费：</text><input class="uni-input" placeholder="代练费" placeholder-style="color:#F76260" type="number" v-model="price"/>
		</view>
		<view class="line">（支付金额不能超过<text class="red">21.00</text>元）</view>
		<view class="lineinput">
			<text>我愿意赔偿保证金：</text><input class="uni-input" placeholder="保证金" placeholder-style="color:#F76260" type="number" v-model="bond"/>
		</view>
		<view class="line">（支付金额不能超过<text class="red">21.00</text>元）</view>
		<view class="line">
			撤单原因:
		</view>
		<view class="lineinput">
		    <textarea  placeholder="撤单原因" v-model="reason"/>
		</view>
		<view class="btn">
			<button type="default" @tap="submit">提交</button>
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
				id:""
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
					order_id:this.id,
					price:this.price,
					bond:this.bond,
					reason:this.reason
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
			}
		},
		onLoad: function (option) {
			console.log(option.id)
			this.id=option.id
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
