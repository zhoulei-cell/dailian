<template>
    <view class="content">
		<view class="user-info">
			<view class="user-info-box">
				<view class="user-info-left">
					<image src="../../static/img/qq.png" mode=""></image>
				</view>
				<view class="user-info-right">
					<view class="user-info-desc">
						<view class="user-info-name">
							曾阿牛
						</view>
						<view class="user-info-phone">
							18182514380
						</view>
					</view>
					<view class="user-info-money">
						<text class="user-money-title">余额</text>
						<text class="user-money-bold">99</text>
					</view>
				</view>
			</view>
			<view class="user-img-box">
				<view class="user-img-bg">
					
				</view>
			</view>
		</view>
		
		<view class="feature-box">
			<view class="feature-list">
				<view class="feature-list-item">
					<image class="left-icon" src="../../static/img/IC／qianbao／24@2x.png" mode="aspectFit"></image>
					<view class="item-content">
						钱包
					</view>
					<image class="right-icon" src="../../static/img/IC／arrow／right_24@2x.png" mode="aspectFit"></image>
				</view>
				<view class="feature-list-line"></view>
			</view>
		</view>
		
		
    </view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
		data(){
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'gear-filled'
				},
				extraIcon2: {
					color: '#4cd964',
					size: '22',
					type: 'image'
				}
			}
		},
		components: {
			uniList,
			uniListItem
		},
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
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
            }
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
	}
	.user-img-bg{
		height: 94rpx;
		background:linear-gradient(135deg,rgba(62,62,61,1) 0%,rgba(58,59,60,1) 51%,rgba(54,54,55,1) 100%);
		border-radius:16px;
	}
	
	.user-info .user-info-box{
		display: flex;
		height: 120rpx;
		padding: 60rpx 36rpx 60rpx 32rpx;
	}
	
	.user-info .user-info-box .user-info-left{
		width: 120rpx;
		height: 120rpx;
		border-radius: 24rpx;
		border:4rpx solid rgba(194,215,255,1);
	}
	
	.user-info .user-info-box .user-info-left image{
		width: 100%;
		height: 100%;
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
	.feature-list .feature-list-line{
		height: 2rpx;
		background:rgba(0,0,0,0.1);
	}
	
</style>
