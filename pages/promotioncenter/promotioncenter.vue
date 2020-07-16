<template>
	<view class="promotion-center">
		<view class="wrapper">
			<view class="top">
				<view class="photo-box d-flex fd-column jc-center ai-center">
					<image :src="info.current_user.avatar" mode="scaleToFill"></image>
					<view class="name">{{info.current_user.name}}</view>
				</view>
				<view class="money-wrap d-flex jc-between">
					<view class="money-box d-flex fd-column ai-center">
						<view class="text">总佣金</view>
						<view class="num">{{info.all_commission}}</view>
					</view>
					<view class="to-withdraw" @tap="goWithdraw">
						<view class="withdraw d-flex ai-center">
							<view class="text">去提现</view>
							<image src="../../static/img/right.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="total d-flex">
				<view class="total-item flex-1">
					<view class="num">{{info.all_commission}}</view>
					<view class="desc">累计收益（元）</view>
				</view>
				<view class="total-item flex-1">
					<view class="num">{{info.member_number}}</view>
					<view class="desc">会员数</view>
				</view>
				<view class="total-item flex-1">
					<view class="num">{{info.all_member_count}}</view>
					<view class="desc">邀请总人数</view>
				</view>
			</view>
			<view class="promote d-flex jc-between">
				<view class="promote-item d-flex fd-column ai-center">
					<view class="iconfont icon-tuiguangzhuanqian"></view>
					<view class="text">如何推广</view>
				</view>
				<view class="promote-item d-flex fd-column ai-center" @tap="goCount">
					<view class="iconfont icon-tongjibaobiao"></view>
					<view class="text">推广人统计</view>
				</view>
			</view>
			<scroll-view scroll-y="true" class="scroll">
				<view class="details">
					<view class="title">推广明细</view>
					<view class="list d-flex">
						<view class="item">姓名</view>
						<view class="item flex-1 ta-center">电话号码</view>
						<view class="item flex-1 ta-center">是否支付会员费</view>
					</view>
					<block v-for="(item, index) in info.all_member" :key="index">
						<view class="list d-flex">
							<view class="item">{{item.name}}</view>
							<view class="item flex-1 ta-center">{{item.phone}}</view>
							<view class="item flex-1 ta-center">{{!!item.is_member === true ? "已支付" : "未支付"}}</view>
						</view>
					</block>
					
					<!-- <view class="list d-flex">
						<view class="item">李四</view>
						<view class="item flex-1 ta-center">15326524657</view>
						<view class="item flex-1 ta-center">未支付</view>
					</view> -->
					
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					current_user: {},
					all_member: []
				}
			}
		},
		methods: {
			goCount() {
				uni.navigateTo({
					url: "/pages/promotioncount/promotioncount"
				})
			},
			goWithdraw() {
				uni.navigateTo({
					url: '/pages/withdrawal/withdrawal'
				})
			},
			getDistribution() {
				let opts = {
					url: '/api/distribution',
					method: 'get'
				}
				this.$http.httpTokenRequest(opts, {}).then(res => {
					this.info = res.data.data
				})
			}
		},
		onLoad() {
			this.getDistribution()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.promotion-center{
		width: 100%;
		.wrapper{
			padding: 0 32rpx;
			.top{
				padding: 0 56rpx;
				.photo-box{
					padding-top: 46rpx;
					image{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						background-color: orange;
					}
					.name{
						font-size: 24rpx;
						color: rgba(12,12,12,1);
					}
				}
				.money-wrap{
					.money-box{
						.text{
							font-size: 24rpx;
							color: rgba(0,0,0,1);
						}
						.num{
							font-size: 26rpx;
							color: rgba(255,1,1,1);
						}
					}
					.to-withdraw{
						.text{
							font-size: 24rpx;
							color: rgba(0,0,0,1);
						}
						image{
							width: 30rpx;
							height: 50rpx;
						}
					}
				}
			}
			.total{
				padding: 30rpx  0;
				.total-item{
					view{
						text-align: center;
					}
					.num{
						font-size: 30rpx;
						font-weight: normal;
						color: rgba(0,0,0,1);
					}
					.desc{
						font-size: 24rpx;
						font-weight: 400;
						color: rgba(128,128,128,1);
					}
				}
			}
			.promote{
				padding: 30rpx 0;
				.promote-item{
					width: 250rpx;
					padding: 20rpx 0;
					border: 1rpx dashed #ccc;
					.iconfont{
						color: #333;
						font-size: 32rpx;
						line-height: 32rpx;
					}
					.text{
						padding-top: 20rpx;
						color: #888;
						font-size: 24rpx;
						line-height: 24rpx;
					}
				}
			}
			.scroll{
				height: 450rpx;
				padding-top: 50rpx;
				.details{
					.title{
						padding-left: 20rpx;
						font-size: 24rpx;
						color: rgba(0,0,0,1);
					}
					.list{
						.item{
							height: 58rpx;
							font-size: 20rpx;
							color: rgba(153,153,153,1);
							line-height: 58rpx;
							&:nth-child(1){
								width: 200rpx;
								padding-left: 40rpx;
								box-sizing: border-box;
							}
						}
					}
				}
			}
		}
	}
</style>
