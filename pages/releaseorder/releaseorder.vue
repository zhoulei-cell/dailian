<template>
	<view class="release-order">
		<view class="wrapper">
			<!-- 段位信息 -->
			<view class="list-group">
				<view class="list-title">基本信息</view>
				<custom-picker :array="data.area" @confirm="selectArea">
					<view class="list-item">
						<view class="item-title">选择区服</view>
						<view class="item-text d-flex ai-center jc-between">
							<input class="text" disabled="disabled" v-model="area" placeholder="请在此选择..." placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</custom-picker>
				<custom-picker :array="data.segment" @confirm="originSegment">
					<view class="list-item">
						<view class="item-title">当前段位</view>
						<view class="item-text d-flex ai-center jc-between">
							<input disabled="disabled" placeholder="当前段位" v-model="current_segment" class="text" placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</custom-picker>
				<custom-picker :array="data.segment" @confirm="targetSegment">
					<view class="list-item">
						<view class="item-title">目标段位</view>
						<view class="item-text d-flex ai-center jc-between">
							<input disabled="disabled" placeholder="目标段位" v-model="tag_segment" class="text" placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</custom-picker>
				<view class="list-item">
					<view class="item-title">订单价格</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text" v-model="price" placeholder="请在此输入" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
			</view>
			<!-- 段位信息 -->
			<!-- 联系方式 -->
			<view class="list-group">
				<view class="list-title">联系方式</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">电话号码</view>
						<input type="text" v-model="rel_phone" placeholder="请填写常用联系方式" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">QQ号码</view>
						<input type="text" v-model="rel_qq" placeholder="请填写QQ" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 联系方式 -->

			<!-- 账号信息 -->
			<view class="list-group">
				<view class="list-title">账号信息</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">游戏账号</view>
						<input type="text" v-model="game_account" placeholder="请填写正确的游戏账号" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">账号密码</view>
						<input type="text" v-model="game_password" placeholder="请填写正确的账号密码" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">游戏角色</view>
						<input type="text" v-model="game_role_name" placeholder="请填写正确的游戏角色" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 账号信息 -->

			<!-- 服务保障 -->
			<view class="list-group">
				<view class="list-title">服务保障</view>
				<view class="list-item">
					<view class="item-title">安全保证金</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text" v-model="promise_price" placeholder="请输入安全保证金" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">效率保证金</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text" v-model="eff_price" placeholder="请输入效率保证金" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
			</view>
			<!-- 服务保障 -->

			<!-- 游戏详细信息 -->
			<view class="list-group">
				<view class="list-title">游戏详细信息</view>
				<view class="list-item last">
					<textarea class="textarea" v-model="rel_message" placeholder-class="placeholder" placeholder="请填写游戏详情信息，如：xx个英雄xx级铭文"></textarea>
				</view>
			</view>
			<!-- 游戏详细信息 -->
		</view>

		<view class="next">
			<button  type="default" @tap="confirmOrder">确认发布</button>
		</view>
	</view>
</template>

<script>
	import customPicker from '../../components/custom-picker'
	import data from '../../common/area'
	export default {
		components: {
			customPicker
		},
		data() {
			return {
				data,
				area: '',
				originSm: '',
				targetSm: '',
				order_amount: '',

			}
		},
		methods: {
			//确认订单
			confirmOrder() {

			},
			//选择区服
			selectArea(area) {
				this.area = area
			},
			//当前段位
			originSegment(sm) {
				this.originSm = sm
			},
			//目标段位
			targetSegment(sm) {
				this.targetSm = sm
			}
		},
		onLoad() {
			//console.log(111)
			const arr = []
			for (var i = 0; i <= 249; i++) {
				arr.push({text:  "微信" + i + "区"})
			}
			console.log(JSON.stringify(arr))
		}
	}
</script>

<style lang="scss">
	.release-order{
		width: 100%;
		.wrapper{
			padding-bottom: 120rpx;
			.list-group{
				font-family: SimHei;
				font-weight: 400;
				.list-title{
					height: 90rpx;
					padding-left: 41rpx;
					background:rgba(244,244,244,1);
					font-size: 28rpx;
					color:rgba(51,51,51,1);
					line-height: 90rpx;
				}
				.list-item{
					padding: 18rpx 41rpx;
					background-color: #fff;
					&.last{
						border-bottom: 10rpx solid rgba(244,244,244,1);
					}
					.placeholder{
						font-size: 24rpx;
						color:rgba(153,153,153,1);
						line-height: 70rpx;
					}
					textarea{
						color:rgba(51,51,51,1);
						font-size: 24rpx;
						line-height: 70rpx;
					}
					.item-box{
						border-bottom: 1rpx solid #ccc;
						.left{
							font-size: 28rpx;
							color:rgba(51,51,51,1);
							line-height: 70rpx;
						}
						&>input{
							font-size: 24rpx;
							color:#000;
							line-height: 70rpx;
						}
					}
					.item-title{
						font-size: 28rpx;
						color:rgba(51,51,51,1);
						line-height: 70rpx;
					}
					.item-text{
						padding-bottom: 15rpx;
						border-bottom: 1rpx solid #ccc;
						input{
							font-size: 24rpx;
							color:#000;
							line-height: 70rpx;
						}
						image{
							width: 21rpx;
							height: 31rpx;
						}
						.money{
							font-size: 24rpx;
							color:rgba(153,153,153,1);
						}
					}
				}
			}
		}
		.next{
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
		.next button{
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
	}
</style>
