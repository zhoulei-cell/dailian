<template>
    <view class="content">
		<view class="user-info">
			<view class="user-info-box">
				<view class="user-info-left">
						<image :src="userinfo.avatar || '../../static/img/qq.png'" mode=""></image>
				</view>
				<view class="user-info-right">
					<view class="user-info-desc">
						<view class="user-info-name">
							{{userinfo.real_name || '游客'}}
						</view>
						<view class="user-info-phone">
							{{ userinfo.phone || '无'}}
						</view>
					</view>
					<view class="user-info-money">
						<text class="user-money-title">余额</text>
						<text class="user-money-bold">{{userinfo.balance || 0}}</text>
					</view>
				</view>
			</view>
			<view class="user-img-box">
				<view class="user-img-bg">
					<view class="user-img-boxleft">
						{{userinfo.is_member==1?'已开通svip':'未开通'}}
					</view>
					<view class="user-img-boxright" v-if="userinfo.is_member==1">
						会员到期时间：{{userinfo.member_time || '永久有效'}}
					</view>
					<view class="user-img-boxright" v-else>
						加入SVIP，立享多项专属特权
						<navigator url="../membershipcenter/membershipcenter">
						<button>查看</button>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		
		<view class="feature-box">
			<view class="feature-list">
				<view class="feature-list-item" v-for="(list,index) in itemData" :key="index" @tap="navigateTo(list.url)">
					<image class="left-icon" :src="list.img" mode="aspectFit"></image>
					<view class="item-content">
						{{list.name}}
					</view>
					<image class="right-icon" src="../../static/img/right.png" mode="aspectFit"></image>
					<view class="feature-list-line"></view>
				</view>
				
			</view>
		</view>
		
		<view class="btn">
			<button type="default" @tap="bindLogout()" v-if="loginflag()">退出登录</button>
			<button type="default" @tap="bindlogin()" v-else>立即登录</button>
		</view>
    </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
    export default {
		data(){
			return {
				itemData:[
					{
						url:"../Recharge/Recharge",
						img:"../../static/img/qianbao.png",
						name:"充值"
					},
					{
						url:"../withdrawal/withdrawal",
						img:"../../static/img/qianbao.png",
						name:"提现"
					},
					{
						url:"../calendar/calendar",
						img:"../../static/img/qiandao.png",
						name:"签到有奖"
					},
					{
					    url:"../invitation/invitation",
						img:"../../static/img/yaoqing.png",
						name:"邀请有奖"
					},
					{
						img:"../../static/img/kefu.png",
						name:"在线客服"
					},
					{
						url:"../updateuserinfo/updateuserinfo",
						img:"../../static/img/shezhi.png",
						name:"修改资料"
					},
				],
				userinfo:{}
			}
		},
		components: {
			uniList,
			uniListItem
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
			// 判断是否登录
			loginflag(){
				if(JSON.stringify(this.userinfo)!='{}'){
					return true
				}else{
					return false
				}
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
		onLoad() {
			this.loginflag()
			this.getuserinfo()
		}
    }
</script>

<style>
	.content{
		padding: 0;
		background-color: #fff;
	}
	
	.user-info{
		
	}
	
	.user-info .user-img-box{
		padding:0 46rpx 0 48rpx;
		margin-bottom: 80rpx;
	}
	.user-img-bg{
		height: 94rpx;
		background:linear-gradient(135deg,rgba(62,62,61,1) 0%,rgba(58,59,60,1) 51%,rgba(54,54,55,1) 100%);
		border-radius:32rpx;
		display: flex;
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(248,184,115,1);
		align-items: center;
		box-sizing: border-box;
		padding: 0 10px;
	}
	.user-img-boxleft{
		flex: 1;
	}
	.user-img-boxright{
		display: flex;
		align-items: center;
	}
	.user-img-bg .user-img-boxright button{
		width:100rpx;
		height:40rpx;
		line-height: 40rpx;
		background:linear-gradient(90deg,rgba(248,181,109,1) 0%,rgba(252,217,176,1) 100%);
		border-radius:20rpx;
		font-size:22rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(47,48,52,1);
		margin-left: 8rpx;
		
	}
	.user-info .user-info-box{
		display: flex;
		height: 120rpx;
		padding: 30rpx;
	}
	
	.user-info .user-info-box .user-info-left{
		width: 120rpx;
		height: 120rpx;
		border-radius: 24rpx;
		border:4rpx solid rgba(194,215,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	
	.user-info .user-info-box .user-info-left image{
		width: 100%;
	}
	
	.user-info .user-info-box .user-info-right{
		flex: 1;
		display: flex;
		padding-left: 20rpx;
	}
	
	.user-info .user-info-box .user-info-right .user-info-desc{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.user-info .user-info-box .user-info-right .user-info-desc .user-info-name{
		height: 48rpx;
		padding-bottom: 8rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(47,48,52,1);
		line-height: 48rpx;
	}
	.user-info .user-info-box .user-info-right .user-info-desc .user-info-phone{
		width: 154rpx;
		height: 36rpx;
		font-size: 24rpx;
		color: rgba(115,118,128,1);
		line-height: 36rpx;
	}
	.user-info .user-info-box .user-info-right .user-info-money{
		display: flex;
		align-items: center;
	}
	.user-info .user-info-box .user-info-right .user-info-money .user-money-title{
		color: rgba(115,118,128,1);
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.user-info .user-info-box .user-info-right .user-info-money .user-money-bold{
		padding: 0 8rpx;
		color:rgba(47,48,52,1);
		font-size: 36rpx;
		font-weight: 500;
		line-height: 56rpx;
	}
	
	.feature-list{
		padding:0 32rpx;
	}
	.feature-list .feature-list-item{
		display: flex;
		padding: 32rpx 0;
		border-bottom: 2rpx solid rgba(0,0,0,0.1);
	}
	.feature-list .feature-list-item .item-content{
		flex: 1;
		height: 48rpx;
		padding-left: 16rpx;
		color: rgba(47,48,52,1);
		font-size: 28rpx;
		line-height: 48rpx;
		
	}
	.feature-list .feature-list-item .left-icon, .feature-list .feature-list-item .right-icon{
		width: 48rpx;
		height: 48rpx;
	}
	.btn{
		padding: 40rpx;
	}
</style>
