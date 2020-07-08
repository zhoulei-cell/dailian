<template>
	<view class="content">
		<view class="title">对战信息</view>
		<view class="line">
			游戏模式：王者荣耀墨家机关道1V1
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					参赛区服：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray"
					 :range-key="'name'" style="flex: 1;">
						<view class="uni-input">{{multiArray[0][multiIndex[0]].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="title">对局信息</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					参赛金额：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="最低6金币" type="number" v-model="price" />
				</view>
			</view>
		</view>
		<view class="line">
			服务费用：<text class="red">5%</text>
		</view>
		<view class="title">角色信息</view>
		<view class="uni-list">
			<navigator url="../opposingrole/opposingrole?type=1">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							角色：
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" placeholder="请输入角色" disabled="true" v-model="role.role_name" />
						</view>
						<view class="right">
							<image src="../../static/img/right.png" mode=""></image>
						</view>
					</view>
				</view>
			</navigator>
		</view>
		<view class="title">禁用职业</view>
		<view class="zylist">
			<view class="zyitem" v-for="(list,index) in zydata" :key="index" :class="{check:checkzy==list.value}" @click="checkzy=list.value">
				{{list.text}}
			</view>
		</view>
		<view class="next">
			<button type="default" @tap="nextStep">发布对战</button>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				multiArray: [
					[{
						name: ''
					}]
				],
				multiIndex: [0],
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
				],
				checkzy: 0,
				price: ''
			}
		},
		computed: mapState({
			// 箭头函数可使代码更简练
			role: state => state.role
		}),
		methods: {
			// 获取游戏平台
			getGameplatforms() {
				let opts = {
					url: '/api/game/platforms?game_id=1',
					method: 'get'
				}
				this.$http.httpRequest(opts).then(res => {
					if (res.data.code == 200) {
						this.multiArray[0] = res.data.data
						this.$forceUpdate()
					}
				}, error => {
					console.log(error);
				})
			},
			nextStep: function() {
				let opts = {
					url: '/api/match/post',
					method: 'post'
				}
				let params = {
					release_game_role_id: this.role.id,
					area_id: this.multiArray[0][this.multiIndex[0]].id,
					game_id: 1,
					model_id: 1,
					victory_condition: '摧毁',
					amount: this.price,
					release_ban: this.checkzy
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					uni.showToast({
						title: res.data.msg
					})
					if(res.data.code==200){
						setTimeout(() => {
							uni.navigateTo({
								url: '../arena/arena'
							})
						}, 500)
					}
					
				}, error => {
					console.log(error);
				})
			},
			bindMultiPickerColumnChange: function(e) {
				this.multiIndex[e.detail.column] = e.detail.value
				this.$forceUpdate()
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			}
		},
		onShow() {
			this.getGameplatforms()
		},
		onLoad: function(option) {
			if (option.data) {
				this.role = JSON.parse(option.data)
			}
		}
	}
</script>
<style>
	.red {
		color: red;
	}

	.cellfirst::before {
		position: absolute;
		z-index: 3;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.content {
		background-color: #f4f8fb;
		padding: 0 20rpx;
		position: relative;
		padding-bottom: 150rpx;
	}

	.next {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}

	.next button {
		width: 100%;
		height: 80rpx;
		background: rgba(0, 203, 130, 1);
		box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.uni-list::before {
		background: none;
	}

	.contentBottom {
		display: flex;
		flex-wrap: wrap;
		padding-top: 60rpx;
	}

	.contentBottom .item {
		width: 50%;
		text-align: center;
	}

	.contentBottom .item .itemtop {
		font-size: 30rpx;
	}

	.contentBottom .item .itembottom {
		font-weight: bold;
		font-size: 34px;
		color: #01a861;
	}

	.title {
		background: #fff;
		padding: 35rpx;
		padding-bottom: 0;
		padding-top: 10rpx;
		position: relative;
		font-weight: bold;
		color: red;
		border-bottom: 1px solid #E0E0E0;
		margin-top: 10rpx;
	}

	.line {
		padding: 8px 16px;
		background: #fff;
		border-bottom: 1px solid #E0E0E0;
		font-size: 15px;
	}

	.right {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.right image {
		width: 26rpx;
		height: 44rpx;
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
