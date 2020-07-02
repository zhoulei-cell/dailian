<template>
	<view class="battle-details">
		<view class="container">
			<view class="info-card">
				<view class="card-title">对战信息</view>
				<view class="card-box">
					<view class="card-desc">
						<text>发起人：</text>
						<text>凌凌漆</text>
					</view>
					<view class="card-desc">
						<text>联系方式：</text>
						<text>13344455566</text>
					</view>
					<view class="card-desc">
						<text>游戏：</text>
						<text>王者荣耀</text>
					</view>
					<view class="card-desc">
						<text>区服：</text>
						<text>QQ</text>
					</view>
					<view class="card-desc">
						<text>模式：</text>
						<text>墨家机关道1V1</text>
					</view>
					<view class="card-desc">
						<text>胜利条件：</text>
						<text>率先摧毁敌方水晶获胜</text>
					</view>
					<view class="card-desc">
						<text>参赛金额：</text>
						<text>双方各出25帮币（含手续费）</text>
					</view>
				</view>
			</view>
			<view class="info-card">
				<view class="card-title">奖程规则</view>
				<view class="card-box">
					<view class="desc">
						<text>胜利者可赢得奖金 </text>
						<text class="red">50帮币</text>
					</view>
					<view class="desc">
						发起挑战后，如对手超过
						<text class="red">30.00分钟</text>
						未启动，补偿您
						<text class="red">10帮币</text>                                       
					</view>
				</view>
			</view>

			<view class="info-card">
				<view class="card-title">对战双方</view>
				<view class="card-box d-flex jc-between">
					<view class="avatar-box">
						<view class="avatar"></view>
						<view class="text">xxxx</view>
					</view>
					<view class="avatar-box">
						<view class="avatar"></view>
						<view class="text">角色信息</view>
					</view>
				</view>
				<view class="btn-box">
					<button>联系对手</button>
				</view>
			</view>
			<view class="info-card">
				<view class="card-title">订单流程</view>
				<view class="card-box steps-box">
					<evan-steps :active="stepsActive" direction="horizontal" primaryColor="#00CB82">
						<block v-for="item in stepsList" :key="item.id">
							<evan-step :title="item.title"></evan-step>
						</block>
					</evan-steps>
				</view>
			</view>
		</view>
		<view class="fixed-btn d-flex">
			<view class="btn flex-1 d-flex ai-center jc-center">
				<view class="pay">支付25帮币</view>
				<view class="go">发起挑战</view>
			</view>
		</view>
	</view>
</template>

<script>
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep
		},
		data() {
			return {
				stepsList: [{
					id: 1,
					title: '双方确认'
				}, {
					id: 2,
					title: '等待结果'
				}, {
					id: 3,
					title: '结算审核'
				}],
				stepsActive: 1
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		padding: 0 20rpx;
		background-color: #F0F0F0;
	}
	.battle-details{
		width: 100%;
		padding-bottom: 118rpx;
		font-family: SimHei;
		font-weight: bold;
		.container{
			padding-bottom: 20rpx;
			.info-card{
				margin-top: 14rpx;
				background-color: #fff;
				.card-title{
					padding: 26rpx 20rpx;
					border-bottom: 1px solid #F0F0F0;
					font-size: 26rpx;
					color:rgba(51,51,51,1);
					line-height: 26rpx;
				}
				.card-box{
					padding: 15rpx 20rpx;
					&.steps-box{
						padding: 30rpx 20rpx 15rpx;
					}
					.card-desc{
						padding: 15rpx 0;
						line-height: 26rpx;
						text{
							font-size: 26rpx;
							color:rgba(134,134,134,1);
						}
					}
					.desc{
						font-size: 26rpx;
						color:rgba(134,134,134,1);
						text.red{
							color: red;
						}
					}
					.avatar-box{
						.avatar{
							width: 188rpx;
							height: 188rpx;
							background-color: red;
						}
						.text{
							padding: 20rpx 0;
							font-size: 26rpx;
							color:rgba(134,134,134,1);
							text-align: center;
							line-height: 26rpx;
						}
					}
				}
				.btn-box{
					padding:0 20rpx 20rpx;
					button{
						font-size: 30rpx;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
		.fixed-btn{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 118rpx;
			padding: 15rpx 20rpx;
			background-color: #fff;
			box-sizing: border-box;
			.btn{
				border-radius: 8rpx;
				background-color: #00CB82;
				.pay{
					padding-right: 32rpx;
					font-size: 26rpx;
					color:rgba(255,255,255,1);
				}
				.go{
					font-size: 36rpx;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
</style>
