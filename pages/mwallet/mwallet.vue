<template>
    <view class="content">
		<!-- 用户信息 -->
		<view class="topuser">
			<view class="usertopcont">
				<view class="tag" @tap="toVip"></view>
				<view class="userinfo">
					<view class="userinfoimg">
						<view class="img">
							<image :src="userinfo.avatar || '../../static/img/qq.jpg'" mode="aspectFit"></image>
						</view>
					</view>
					<view class="userinfotext">
						<view class="name">{{userinfo.name || '游客'}}</view>
						<view class="phone">手机号：{{ userinfo.phone || '无'}}</view>
						<view class="level">打手等级：初级</view>
					</view>
				</view>
				<view class="withdrawal">
					<view class="item">
						<view class="itemnumber">{{userinfo.balance || 0}}</view>
						<view class="itemtext">账户余额（元）</view>
					</view>
					<view class="item">
						<view class="itemnumber blue">0</view>
						<view class="itemtext">钻石余额（个）</view>
					</view>
					<view class="item">
						<view class="itemnumber orange">0</view>
						<view class="itemtext">优惠券（张）</view>
					</view>
				</view>
			</view>
		</view>
		<uni-list>
			<navigator url="/pages/Recharge/Recharge">
				<uni-list-item title="充值"/>
			</navigator>
			<navigator url="/pages/withdrawal/withdrawal">
				<uni-list-item title="提现"/>
			</navigator>
			<navigator url="/pages/capitalflow/capitalflow">
				<uni-list-item title="资金流水"/>
			</navigator>
		</uni-list>
    </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
    export default {
		data(){
			return {
				userinfo: {}
			}
		},
		components: {
			uniList,
			uniListItem
		},
        computed: {
        },
        methods: {
			// 获取用户信息
			getuserinfo() {
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {
			
				}
				this.$http.httpTokenRequest(opts, param).then(res => {
					this.userinfo = res.data.data
					this.user = {
						phone: this.userinfo.phone,
						name: this.userinfo.name,
						avatar: this.userinfo.avatar,
						is_member: this.userinfo.is_member
					}
				})
			},
			//跳转会员中心
			toVip() {
				if (this.userinfo.is_member !== 1) {
					uni.redirectTo({
						url: '/pages/membershipcenter/membershipcenter'
					})
				} {
					uni.redirectTo({
						url: '../vipcenter/vipcenter?userinfo=' + JSON.stringify(this.user)
					})
				}
			}
        },
		onLoad() {
			this.getuserinfo()
		}
    }
</script>

<style>
	.content{
		padding: 0;
		background-color: #f4f8fb;
	}
	
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
		background-image: url(../../static/img/user/tag.png);
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
	.withdrawal{
		width: 529rpx;
		height: 119rpx;
		background-image: url(../../static/img/user/withdrawal.png);
		background-size:cover;
		position: absolute;
		left: 50%;
		margin-left: -264.5rpx;
		bottom: -59.5rpx;
		display: flex;
		box-sizing: border-box;
		padding:0 35rpx;
		justify-content: space-between;
	}
	.withdrawal .item{
		text-align: center;
	}
	.withdrawal .item .itemnumber{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,181,116,1);
		text-align: center;
	}
	.withdrawal .item .itemtext{
		font-size:20rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(128,128,128,1);
		text-align: center;
	}
	.item{
		margin: 10rpx;
	}
	.uni-list{
		margin: 5rpx 0;
	}
</style>
