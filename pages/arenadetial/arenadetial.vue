<template>
	<view class="content">
		<view class="example-body">
			<uni-steps :options="list1" :active="active" />
		</view>
		<view class="example-title">对战信息</view>
		<view class="line">发起人：<text>{{detailinfo.user.name}}</text></view>
		<view class="line">游戏：<text>王者荣耀</text></view>
		<view class="line">模式：<text>墨家机关1V1</text></view>
		<view class="line">胜条件：<text>率先摧毁水晶获胜</text></view>
		<view class="line">区服：<text>{{detailinfo.platforms.name}}</text></view>
		<view class="line">参赛金：<text>{{detailinfo.amount}}</text></view>
		<view class="line">订单号：<text>{{detailinfo.match_no}}</text></view>
		<view class="line">获胜获得：<text class="red">{{detailinfo.totalAmount}}</text></view>
		
		<view class="example-title">对方角色</view>
		<view class="line">挑战后，如对手<text class="red">30分钟</text>超时未启动，补偿你<text class="red">{{detailinfo.totalAmount*0.75}}币</text></view>
		<view class="line">对方角色：{{detailinfo.user_role.role_name}}</view>
		
		<view class="example-title">我的角色</view>
		<navigator url="../opposingrole/opposingrole?type=1">
		<view class="uni-list">
			<view class="uni-list-cell" style="display: flex;">
				<view class="uni-list-cell-left">
					角色：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入角色" disabled="true" v-model="role.role_name"/>
				</view>
				<view class="right">
					<image src="../../static/img/right.png" mode="" style="width: 44rpx;height: 26rpx;"></image>
				</view>
			</view>
		</view>
		</navigator>
		<view class="example-title">禁用职业</view>
		<view class="zylist">
			<view class="zyitem" v-for="(list,index) in zydata" :key="index" :class="{check:checkzy==list.value}" @click="checkzy=list.value">
				{{list.text}}
			</view>
		</view>
		<view class="btn">
			<button type="primary" @tap="nextStep">支付{{detailinfo.amount}}金币，发起挑战</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
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
				match_id:'',
				detailinfo:{
					platforms:{
						name:''
					},
					user_role:{
						role_name:''
					}
				},
				checkzy: 0,
				zydata: [{
						text: "不限",
						value: 0
					},
					{
						text: "法师",
						value: 1
					},
					{
						text: "刺客",
						value: 2
					},
					{
						text: "战士",
						value: 3
					},
					{
						text: "坦克",
						value: 4
					},
					{
						text: "辅助",
						value: 5
					},
					{
						text: "射手",
						value: 6
					}
				]
			}
		},
		computed: mapState({
			// 箭头函数可使代码更简练
			role: state => state.role
		}),
		methods: {
			// 获取详情
			getlist() {
				let opts = {
					url: '/api/match/show',
					method: 'get'
				}
				let params = {
					match_id:this.match_id
				}
				return this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						this.detailinfo=res.data.data
					}
				}, error => {
					console.log(error);
				})
			},
			//提交
			nextStep: function() {
				let opts = {
					url: '/api/match/partake',
					method: 'post'
				}
				let params = {
					partake_game_role_id: this.role.id,
					partake_ban: this.checkzy,
					match_id: this.match_id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					if (res.data.msg == 200) {
						setTimeout(() => {
							uni.navigateTo({
								url: '../arena/arena'
							})
						}, 500)
					}
			
				}, error => {
					console.log(error);
				})
			}
		},
		onLoad:function(option) {
			this.match_id=JSON.parse(option.list).id
		},
		onShow() {
			this.getlist()
		}
	}
</script>

<style>
	.content{
		padding-bottom: 150rpx;
		background: #F0F0F0;
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
	.btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height:120rpx;
		background:rgba(255,255,255,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	.btn button{
		width:100%;
		height:80rpx;
		background:rgba(0,203,130,1);
		box-shadow:0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		line-height: 80rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.zylist {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx;
	}
	
	.zylist .zyitem {
		border: 2rpx solid #01A861;
		color: #01A861;
		font-size: 24rpx;
		width: 200rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
	
	.zylist .zyitem.check {
		background: #01A861;
		color: #fff;
	}
</style>