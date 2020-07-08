<template>
	<view class="vip-center">
		<!-- 用户信息 -->
		<view class="topuser">
			<view class="usertopcont">
				<view class="tag" v-if="userinfo.is_member === 1"></view>
				<view class="userinfo">
					<view class="userinfoimg">
						<view class="img">
							<image :src="userinfo.avatar || '../../static/img/qq.png'" mode="widthFix"></image>
						</view>
					</view>
					<view class="userinfotext">
						<view class="name">{{userinfo.name || '游客'}}</view>
						<view class="phone">手机号：{{ userinfo.phone || '无'}}</view>
						<view class="level">打手等级：初级</view>
					</view>
				</view>
			</view>
			<view class="vip-user">{{vipText}}</view>
		</view>
		<view class="vip-prerogative-wrapper">
			<view class="vip-prerogative">
				<view class="vip-prerogative-title">会员权益</view>
				<view class="prerogative d-flex jc-between">
					<view class="list d-flex fd-column ai-center">
						<view>会员独享</view>
						<view>接单代打</view>
						<image class="one" src="../../static/img/vip/01.png" mode="widthFix"></image>
					</view>
					<view class="list d-flex fd-column ai-center">
						<view>赛事大厅</view>
						<view>赢取豪礼</view>
						<image class="two" src="../../static/img/vip/02.png" mode="widthFix"></image>
					</view>
					<view class="list d-flex fd-column ai-center">
						<view>余额提现</view>
						<view>快速到账</view>
						<image class="three" src="../../static/img/vip/03.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		computed: {
			vipText() {
				if (this.userinfo.is_member === 1) {
					return "恭喜您，已成功成为会员"
				} else {
					return "非法进入此页面"
				}
			}
		},
		onLoad(options) {
			this.userinfo = JSON.parse(options.userinfo)
			console.log(this.userinfo)
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
	.vip-center{
		width: 100%;
		font-family: SimHei;
		font-weight: 400;
		.topuser{
			height: 350rpx;
			width: 100%;
			background-image: url(../../static/img/user/top1.png);
			background-size: cover;
			position: relative;
			margin-bottom: 94rpx;
		}
		.usertopcont{
			width: 630rpx;
			height: 280rpx;
			background-image: url(../../static/img/user/top2.png);
			background-size: cover;
			position: absolute;
			left: 50%;
			margin-left: -315rpx;
			bottom: -10rpx;
		}
		.usertopcont .tag{
			background-image: url(../../static/img/vip/vip.png);
			background-size: cover;
			width: 193rpx;
			height: 193rpx;
			position: absolute;
			right: 0;
			top: 0;
		}
		.userinfo{
			display: flex;
			padding: 61rpx 47rpx;
			align-items: center;
		}
		.userinfo .userinfoimg .img{
			width: 105rpx;
			height: 105rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			overflow: hidden;
			border-radius: 50%;
			margin-right: 24rpx;
		}
		.userinfo .userinfoimg .img image{
			width: 100%;
		}
		.userinfotext .name{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(255,254,254,1);
		}
		.userinfotext .phone{
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,254,254,1);
		}
		.userinfotext .level{
			font-size:20rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(255,254,254,1);
		}
		.vip-user{
			position: absolute;
			bottom: -60upx;
			left: 50%;
			width: 530upx;
			height: 120upx;
			margin-left: -265upx;
			border-radius: 15upx;
			background-color: #fff;
			font-size: 32upx;
			font-weight: bold;
			text-align: center;
			line-height: 120upx;
		}
		.vip-prerogative-wrapper{
			padding: 0 20upx;
		}
		.vip-prerogative{
			padding: 0 20upx;
			background-color: #fff;
			padding-bottom: 20upx;
			border-radius: 20upx;
			.vip-prerogative-title{
				padding: 30upx 0;
				font-size: 36upx;
				color:rgba(0,0,0,1);
			}
			.prerogative{
				.list{
					width: 210upx;
					padding: 10upx 0;
					background-color: #FAFBFF;
					view:nth-child(1){
						color: #7B7B7B;
						font-size: 30upx;
					}
					view:nth-child(2){
						color: #000000;
						font-size: 36upx;
					}
					image.one{
						width: 157upx;
						height: 112upx;
					}
					image.two{
						width: 98upx;
						height: 107upx;
					}
					image.three{
						width: 116upx;
						height: 110upx;
					}
				}
			}
		}
	}
</style>
