<template>
    <view class="content">
		<!-- 用户信息 -->
		<view class="topuser">
			<view class="usertopcont">
				<view class="tag" v-if="userinfo.is_member"></view>
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
		<!-- 中间部分 -->
		<view class="usercenter">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../mwallet/mwallet">
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
					<navigator url="../orderreceiving/orderreceiving">
						<view class="itemimg"><image src="../../static/img/user/jd.png" mode=""></image></view>
						<view class="itemtext">接单订单</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../orderrelease/orderrelease">
					<view class="itemimg"><image src="../../static/img/user/fd.png" mode=""></image></view>
					<view class="itemtext">发单订单</view>
					</navigator>
				</view>
				<view class="item">
					<view class="itemimg"><image src="../../static/img/user/youhuiquan.png" mode=""></image></view>
					<view class="itemtext">优惠券</view>
				</view>
				<!-- <view class="item">
					<view class="itemimg"><image src="../../static/img/user/pinglun.png" mode=""></image></view>
					<view class="itemtext">评论</view>
				</view> -->
			</view>
		</view>
		<!-- 中间部分 -->
		<view class="usercenter">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../opposingrole/opposingrole">
					<view class="itemimg"><image src="../../static/img/user/js.png" mode=""></image></view>
					<view class="itemtext">对战角色</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../warrecord/warrecord">
						<view class="itemimg"><image src="../../static/img/user/dindan.png" mode=""></image></view>
						<view class="itemtext">我的发布</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../acceptthewar/acceptthewar">
					<view class="itemimg"><image src="../../static/img/user/dindan.png" mode=""></image></view>
					<view class="itemtext">接受对战</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../bankcart/bankcart">
						<view class="itemimg"><image src="../../static/img/user/youhuiquan.png" mode=""></image></view>
						<view class="itemtext">银行卡管理</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 底部部分 -->
		<view class="usercenter bottom">
			<view class="usercentercont">
				<view class="item">
					<navigator url="../updateuserinfo/updateuserinfo">
					<view class="itemimg"><image src="../../static/img/user/gerenzhongx.png" mode=""></image></view>
					<view class="itemtext">修改资料</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../membershipcenter/membershipcenter">
					<view class="itemimg"><image src="../../static/img/user/huiyuan.png" mode=""></image></view>
					<view class="itemtext">我的会员</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../invitation/invitation">
					<view class="itemimg"><image src="../../static/img/user/yaoqin.png" mode=""></image></view>
					<view class="itemtext">邀请有奖</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../calendar/calendar">
						<view class="itemimg"><image src="../../static/img/user/qiandao.png" mode=""></image></view>
						<view class="itemtext">签到有奖</view>
					</navigator>
				</view>
				<view class="item">
					<navigator url="../authentication/authentication">
					<view class="itemimg"><image src="../../static/img/user/shouchang.png" mode=""></image></view>
					<view class="itemtext">实名认证</view>
					</navigator>
				</view>
				<view class="item">
					<view class="itemimg"><image src="../../static/img/user/yijian.png" mode=""></image></view>
					<view class="itemtext">意见反馈</view>
				</view>
				<view class="item">
					<view class="itemimg"><image src="../../static/img/user/bangzhu.png" mode=""></image></view>
					<view class="itemtext">帮助中心</view>
				</view>
				<view class="item">
					<view class="itemimg"><image src="../../static/img/user/shezhi.png" mode=""></image></view>
					<view class="itemtext">系统设置</view>
				</view>
				<view class="item">
					<view class="itemimg"><image src="../../static/img/user/kefu.png" mode=""></image></view>
					<view class="itemtext">联系我们</view>
				</view>
				<view class="item" @tap="openLogoutPopup">
					<view class="itemimg"><image src="../../static/img/common/loginout.png" mode=""></image></view>
					<view class="itemtext">退出登录</view>
				</view>
			</view>
		</view>
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
				userinfo:{}
			}
		},
		components: {
			uniList,
			uniListItem,
			customPopup
		},
        computed: {
        },
        methods: {
			//跳转登录
			bindlogin(){
				uni.navigateTo({
				    url: "../login/login",
				});
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
                        url: '../login/login',
                    });
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
						url:"/pages/login/login"
					})
				})
			},
			// 获取用户信息
			getuserinfo(){
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {
					
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					this.userinfo = res.data.data
				})
			}
        },
		onShow() {
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
</style>
