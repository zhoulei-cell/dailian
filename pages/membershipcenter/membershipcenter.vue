<template>
	<view class="content">
		<view class="topbg">
			<view class="userinfo">
				<view class="img">
					<image src="http://dl.m.3yx.com/images/new-wap/pic-Photo.png" mode=""></image>
				</view>
				<view class="right">
					<view class="linename">18117961915</view>
					<view class="line red">vip0</view>
				</view>
			</view>
		</view>

		<view class="cont">
			<view class="title">选择充值类型</view>
			<view class="item" v-for="(item,index) in dataList" :key="index" :class="{check:checkindex==index}" @tap="checkitem(item,index)">
				<view class="itemleft">{{item.month}}个月</view>
				<view class="itemright">{{item.money}}元</view>
			</view>
		</view>

		<view class="paytype">
			<view class="title">选择支付方式</view>
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
		<view class="button">
			<button type="default">立即开通</button>
		</view>
	</view>
</template>

<script>
	// var wx = require('jweixin-module')
	export default {
		data() {
			return {
				checkindex: 1,
				dataList: [{
						month: 1,
						money: 10,
						check: true
					},
					{
						month: 2,
						money: 20,
						check: false
					},
					{
						month: 3,
						money: 30,
						check: false
					},
					{
						month: 4,
						money: 40,
						check: false
					}
				],
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
				current: 0
			}
		},
		components: {},
		onLoad() {
			
		},
		methods: {
			checkitem(item, index) {
				this.checkindex = index
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			}
		}
	}
</script>

<style>
	.title {
		font-weight: bold;
		font-size: 28rpx;
		width: 100%;
		margin-bottom: 10rpx;
	}

	.content {
		padding: 0;
	}

	.topbg {
		width: 100%;
		height: 300rpx;
		background-color: red;
		/* 浏览器不支持的时候显示 */
		background-image: linear-gradient(#0faeff, #b1e3fc);
		position: relative;
	}

	.topbg .userinfo {
		width: 600rpx;
		height: 100rpx;
		padding: 20rpx 0;
		display: flex;
		position: absolute;
		bottom: -70rpx;
		left: 50%;
		margin-left: -300rpx;
		border-radius: 10rpx;
		background-image: linear-gradient(#0faeff, #b1e3fc);
	}

	.topbg .userinfo .img {
		width: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.topbg .userinfo .img image {
		width: 100rpx;
		height: 100rpx;
	}

	.topbg .userinfo .right .linename {
		color: #fff;
		font-weight: bold;
	}

	.red {
		color: red;
	}

	.cont {

		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		background: #fff;
		padding: 20rpx;
		margin: 0 20rpx;
		margin-top: 80rpx;
	}

	.item {
		width: 250rpx;
		height: 50rpx;
		border: 1px solid #E0E0E0;
		border-radius: 100rpx;
		display: flex;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
	}

	.item.check {
		background: rgba(0, 162, 216, 0.1);
		color: rgba(0, 162, 216, 1);
		border: 1px solid rgba(0, 162, 216, 1);
	}

	.itemleft {
		text-align: left;
		flex: 1;
		font-size: 28rpx;
		color: #333;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.itemright {
		text-align: right;
		font-size: 24rpx;
		color: #666666;
		display: flex;
		align-items: center;
	}

	.button {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	.button button {
		background-image: linear-gradient(#0faeff, #b1e3fc);
		color: #fff;
	}

	.paytype {
		margin-top: 10rpx;
		background: #fff;
		padding: 20rpx;
		margin: 20rpx;
	}

	.paytype .title {
		font-weight: bold;
		font-size: 28rpx;
	}

	.flex {
		display: flex;
	}

	.uni-list-cell::after {
		left: 0;
	}

	.uni-list-cell-pd {
		padding-left: 0;
	}
</style>
