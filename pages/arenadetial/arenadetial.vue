<template>
	<view class="content">
		<view class="example-body">
			<uni-steps :options="list1" :active="active" />
		</view>
		
		<view class="example-title">对战信息</view>
		<view class="line">游戏：<text>王者荣耀</text></view>
		<view class="line">模式：<text>墨家机关1V1</text></view>
		<view class="line">胜条件：<text>率先摧毁水晶获胜</text></view>
		<view class="line">区服：<text>微信</text></view>
		<view class="line">参赛金：<text>30金币（含1.5服务费）</text></view>
		<view class="line">订单号：<text>LS24412266</text></view>
		<view class="line">获胜获得：<text class="red">30金币</text></view>
		
		<view class="example-title">对战角色</view>
		<view class="line">挑战后，如对手<text class="red">30分钟</text>超时未启动，补偿你<text class="red">14.25币</text></view>
		<view class="line">对方角色：哇啊的</view>
		
		<view class="example-title">我的角色</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					选择区服：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						角色：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输入角色" />
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						QQ/微信：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输QQ/微信" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<button type="primary">支付30金币，发起挑战</button>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	export default {
		components: {
			uniSteps
		},
		data() {
			return {
				active: 1,
				list1: [{
					title: '双方确认'
				}, {
					title: '开始游戏'
				}, {
					title: '审核结果'
				}, {
					title: '赢得奖金'
				}],
				multiArray: [
					['亚洲', '欧洲'],
					['中国', '日本'],
					['北京', '上海', '广州']
				],
				multiIndex: [0, 0, 0],
			}
		},
		methods: {
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1
				} else {
					this.active = 0
				}
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
				this.multiIndex[e.detail.column] = e.detail.value
				switch (e.detail.column) {
					case 0: //拖动第1列
						switch (this.multiIndex[0]) {
							case 0:
								this.multiArray[1] = ['中国', '日本']
								this.multiArray[2] = ['北京', '上海', '广州']
								break
							case 1:
								this.multiArray[1] = ['英国', '法国']
								this.multiArray[2] = ['伦敦', '曼彻斯特']
								break
						}
						this.multiIndex.splice(1, 1, 0)
						this.multiIndex.splice(2, 1, 0)
						break
					case 1: //拖动第2列
						switch (this.multiIndex[0]) { //判断第一列是什么
							case 0:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['北京', '上海', '广州']
										break
									case 1:
										this.multiArray[2] = ['东京','北海道']
										break
								}
								break
							case 1:
								switch (this.multiIndex[1]) {
									case 0:
										this.multiArray[2] = ['伦敦', '曼彻斯特']
										break
									case 1:
										this.multiArray[2] = ['巴黎', '马赛']
										break
								}
								break
						}
						this.multiIndex.splice(2, 1, 0)
						break
				}
				this.$forceUpdate()
			},
		}
	}
</script>

<style>
	.content{
		padding-bottom: 150rpx;
	}
	.red{
		color: red;
	}
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	
	.line{
		padding: 20rpx;
		color: #666666;
		font-size: 26rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
	}
	.uni-list-cell-left{
		color: #666;
	}
	.uni-input{
		color: #666;
		font-size: 24rpx;
		line-height: 27px !important;
	}
	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	.btn button {
		background: red;
		color: #fff;
		height: 100rpx;
		line-height: 100rpx;
	}
</style>