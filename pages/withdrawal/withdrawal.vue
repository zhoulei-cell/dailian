<template>
    <view class="content">
       <view class="topline">我的余额:<text>￥0.00</text></view>
	   <view class="inputline">
		   <input class="uni-input" placeholder="请输入提现金额" />
	   </view>
	   <view class="paytype">
		   <view class="title">提现到</view>
		   <view class="line">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view class="flex">
						<radio :value="item.value" :checked="index === current" />
						<view>{{item.name}}</view>
					</view>
				</label>
			</radio-group>
		   </view>
	   </view>
	   <view class="btn">
		   <button type="primary">确认提现</button>
	   </view>
    </view>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
				items: [{
					value: 'weixin',
					name: '微信支付'
				},
				{
					value: 'apay',
					name: '支付宝支付',
					checked: 'true'
				},
			],
			current:0
            }
        },
        methods: {
           radioChange: function(evt) {
			   for (let i = 0; i < this.items.length; i++) {
				   if (this.items[i].value === evt.target.value) {
					   this.current = i;
					   break;
				   }
			   }
		   }
        },
        onReady() {
            
        }
    }
</script>

<style>
	.content{
		padding: 0;
	}
    .topline{
	background: #fff;	
	padding: 20rpx;
	}
	.topline text{
		color: red;
		font-size: 36rpx;
	}
	.btn{
		padding-top: 20rpx;
	}
	.paytype{
		margin-top: 10rpx;
		background: #fff;
		padding: 20rpx;
	}
	.paytype .title{
		font-weight: bold;
		font-size: 28rpx;
	}
	.flex{
		display: flex;
	}
	.uni-list-cell::after{
		left: 0;
	}
	.uni-list-cell-pd{
		padding-left: 0;
	}
</style>
