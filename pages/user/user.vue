<template>
    <view class="content">
		<!-- 用户信息 -->
		<view class="topuser">
			<view class="usertopcont">
				<view class="tag" :class="userinfo.is_member ? 'vip' : 'no_vip'"></view>
				<view class="userinfo" @tap="toEditUserInfo">
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
					<view class="item" @tap="toWith">
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
		<!-- 用户信息 -->
		<!-- 中间部分 -->
		<view class="usercenter">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../mwallet/mwallet" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/qianbao.png" mode=""></image></view>
					<view class="itemtext">钱包</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<navigator url="../withdrawal/withdrawal">
					<view class="itemimg"><image src="../../static/img/user/qianbao.png" mode=""></image></view>
					<view class="itemtext">提现</view>
					</navigator>
				</view> -->
				<view class="item">
					<navigator url="../orderreceiving/orderreceiving" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/jd.png" mode=""></image></view>
						<view class="itemtext">接单列表</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../orderrelease/orderrelease" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/fd.png" mode=""></image></view>
					<view class="itemtext">发单列表</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../releaseorder/releaseorder" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/fadan.png" mode=""></image></view>
					<view class="itemtext">发布订单</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<view class="itemimg"><image src="../../static/img/user/youhuiquan.png" mode=""></image></view>
					<view class="itemtext">优惠券</view>
				</view> -->
				<!-- <view class="item">
					<view class="itemimg"><image src="../../static/img/user/pinglun.png" mode=""></image></view>
					<view class="itemtext">评论</view>
				</view> -->
			</view>
		</view>
		<!-- 中间部分 -->
		<!-- 中间部分 -->
		<view class="usercenter">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../opposingrole/opposingrole" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/js.png" mode=""></image></view>
					<view class="itemtext">对战角色</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../warrecord/warrecord" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/dz.png" mode=""></image></view>
						<view class="itemtext">我的发布</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../acceptthewar/acceptthewar" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/dindan.png" mode=""></image></view>
					<view class="itemtext">接受对战</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../bankcart/bankcart" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/yhk.png" mode=""></image></view>
						<view class="itemtext">银行卡管理</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 中间部分 -->
		<!-- 推广部分 -->
		<view class="usercenter">
			<view class="promote">
				<navigator url="/pages/promotioncenter/promotioncenter" hover-class="none">
					<view class="promote-title d-flex jc-between">
						<view class="left">我的推广</view>
						<view class="right d-flex ai-center">
							<text>推广中心</text>
							<image src="../../static/img/right.png" mode="widthFix"></image>
						</view>
					</view>
				</navigator>
				<view class="promote-content d-flex">
					<view class="promote-box flex-1">
						<view class="money">￥{{promote.all_commission}}</view>
						<view class="desc">总佣金</view>
					</view>
					<view class="promote-box flex-1">
						<view class="money">￥{{promote.preAmount}}</view>
						<view class="desc">预估金额</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 推广部分 -->
		<!-- 底部部分 -->
		<view class="usercenter bottom">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../updateuserinfo/updateuserinfo" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/gerenzhongx.png" mode=""></image></view>
					<view class="itemtext">修改资料</view>
					</navigator>
				</view>
				<view class="item">
					<navigator :url="toVipUrl" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/huiyuan.png" mode=""></image></view>
					<view class="itemtext">我的会员</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../invitation/invitation" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/yaoqin.png" mode=""></image></view>
					<view class="itemtext">邀请有奖</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../calendar/calendar" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/qiandao.png" mode=""></image></view>
						<view class="itemtext">签到有奖</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../authentication/authentication" hover-class="none">
					<view class="itemimg"><image src="../../static/img/user/shouchang.png" mode=""></image></view>
					<view class="itemtext">实名认证</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<view class="itemimg"><image src="../../static/img/user/yijian.png" mode=""></image></view>
					<view class="itemtext">意见反馈</view>
				</view> -->
				<view class="item">
					<navigator url="../helpcenter/helpcenter" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/bangzhu.png" mode=""></image></view>
						<view class="itemtext">帮助中心</view>
					</navigator>
				</view>
				<!-- <view class="item">
					<view class="itemimg"><image src="../../static/img/user/shezhi.png" mode=""></image></view>
					<view class="itemtext">系统设置</view>
				</view> -->
				<view class="item">
					<navigator url="../contactus/contactus" hover-class="none">
						<view class="itemimg"><image src="../../static/img/user/kefu.png" mode=""></image></view>
						<view class="itemtext">联系我们</view>
					</navigator>
				</view>
				<view class="item" @tap="openLogoutPopup">
					<view class="itemimg"><image src="../../static/img/common/loginout.png" mode=""></image></view>
					<view class="itemtext">退出登录</view>
				</view>
			</view>
		</view>
		<!-- 底部部分 -->
		<custom-popup ref="customPopupLogout" title="是否退出登录？" @cancel="cancelLogout" @confirm="confirmLogout"/>
  </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import customPopup from '@/components/custom-popup/custom-popup.vue'
    export default {
		data(){
			return {
				userinfo:{},
				user: {},
				promote: {}
			}
		},
		computed: {
			toVipUrl() {
				if (this.userinfo.is_member !== 1) {
					return '../membershipcenter/membershipcenter'
				} {
					return '../vipcenter/vipcenter?userinfo=' + JSON.stringify(this.user)
				}
			}
		},
		components: {
			uniList,
			uniListItem,
			customPopup
		},
		methods: {
			//跳转登录
			bindlogin(){
				uni.navigateTo({
					url: "../signIn/signIn",
				})
			},
			// 路径跳转
			navigateTo(url){
				uni.navigateTo({
					url: url,
				});
			},
			// 退出登录
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../signIn/signIn',
					})
				}
			},
			openLogoutPopup() {
				this.$refs['customPopupLogout'].open()
			},
			cancelLogout() {
				this.$refs['customPopupLogout'].close()
			},
			confirmLogout() {
				this.logout()
				this.$refs['customPopupLogout'].close()
			},
			// 退出登录
			logout(){
				let opts = {
					url: '/api/loginout',
					method: 'post'
				}
				let param = {
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					uni.removeStorage({
						key: 'userinfo'
					})
					uni.removeStorage({
						key: 'token'
					})
					uni.navigateTo({
						url:"/pages/signIn/signIn"
					})
				})
			},
			// 获取用户信息
			async getuserinfo(){
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {}
				try {
					const res = await this.$http.httpTokenRequest(opts,param)
					this.userinfo = res.data.data
					this.user = {
						phone: this.userinfo.phone,
						name: this.userinfo.name,
						avatar: this.userinfo.avatar,
						is_member: this.userinfo.is_member
					}
				} catch(e) {
					uni.showToast({
						icon: 'none',
						title: '获取用户数据失败'
					})
				}
			},
			//我的推广信息获取
			async getDistribution() {
				let opts = {
					url: '/api/user/distribution',
					method: 'get'
				}
				try{
					const res = await this.$http.httpTokenRequest(opts, {})
					this.promote = res.data.data
				} catch(e) {
					uni.showToast({
						icon: 'none',
						title: '获取推广信息数据失败'
					})
				}
			},
			//跳转信息修改
			toEditUserInfo() {
				uni.navigateTo({
					url: '/pages/updateuserinfo/updateuserinfo'
				})
			},
			//跳转到钱包
			toWith() {
				uni.navigateTo({
					url: '/pages/mwallet/mwallet'
				})
			}
		},
		onShow() {
			this.getuserinfo()
			this.getDistribution()
		},
		async onPullDownRefresh() {
			this.getuserinfo()
			await this.getDistribution()
			uni.stopPullDownRefresh()
		}
  }
</script>

<style lang="scss">
	
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
		&.vip{
			background-image: url(../../static/img/user/vip.png);
		}
		&.no_vip{
			background-image: url(../../static/img/user/no_vip.png);
		}
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
	.blue{
		color:rgba(79,137,182,1) !important;
	}
	.orange{
		color:rgba(235,135,49,1) !important;
	}
	.usercenter{
		width: 100%;
		padding: 22rpx;
		box-sizing: border-box;
	}
	.usercenter .usercentercont{
		background-image: url(../../static/img/user/center.png);
		background-size:cover;
		width: 100%;
		height: 182rpx;
		display: flex;
		justify-content:left;
		align-items: center;
		flex-wrap: wrap;
	}
	.usercentercont .item{
		text-align: center;
		width: 25%;
	}
	.usercentercont .item .itemimg image{
		width: 70rpx;
		height: 70rpx;
	}
	.usercentercont .item .itemtext{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.bottom .usercentercont{
		background-image: url(../../static/img/user/bottom.png) !important;
		height: 442rpx !important;
		padding: 20rpx 0;
	}
	.content .promote{
		border-radius: 15rpx;
		box-shadow: 0 4rpx 10rpx #ccc;
		background-color: #fff;
		.promote-title{
			height: 80rpx;
			padding: 0 20rpx;
			border-bottom: 1rpx solid #eee;
			.left{
				color: #222;
				font-size: 26rpx;
				font-weight: bold;
				line-height: 80rpx;
			}
			.right{
				text{
					color: #666;
					font-size: 26rpx;
					line-height: 80rpx;
				}
				image{
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.promote-content{
			padding: 30rpx 0 50rpx 0;
			.promote-box{
				&:nth-child(1){
					border-right: 1rpx solid #eee;
				}
				.money{
					padding-bottom: 15rpx;
					color: #222;
					font-size: 28rpx;
					font-weight: bold;
					text-align: center;
					line-height: 28rpx;
				}
				.desc{
					color: #666;
					font-size: 24rpx;
					text-align: center;
					line-height: 28rpx;
				}
			}
		}
	}
</style>
