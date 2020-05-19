<template>
    <view class="content">
		<view class="userinfo">
			<view class="userimg"><image src="http://dl.m.3yx.com/images/new-wap/pic-Photo.png" mode=""></image></view>
			<view class="userinfot">
				<view class="line bold">用户名：18117961915</view>
				<view class="line">代练员等级：初级</view>
				<view class="line red">余额：0.00元</view>
				<view class="linebtn">
					<navigator url="/pages/withdrawal/withdrawal">
						<button type="primary">提现</button>
					</navigator>
					<navigator url="/pages/Recharge/Recharge">
						<button type="primary">充值</button>
					</navigator>
				</view>
			</view>
		</view>
		<uni-list>
			<navigator url="/pages/orderreceiving/orderreceiving">
				<uni-list-item title="接单订单"/>
			</navigator>
			<navigator url="/pages/orderrelease/orderrelease">
				<uni-list-item title="发单订单"/>
			</navigator>
		</uni-list>
		<uni-list>
			<!-- <navigator url="/pages/coupon/coupon">
				<uni-list-item title="我的优惠券"  />
			</navigator> -->
			<navigator url="/pages/membershipcenter/membershipcenter">
			<uni-list-item title="会员中心"  />
			</navigator>
			<uni-list-item title="邀请有奖" />
			<!-- <uni-list-item title="我的钱包" /> -->
		</uni-list>
		<uni-list>
			<!-- <uni-list-item title="我的关注"  />
			<uni-list-item title="我的粉丝"  /> -->
			<navigator url="/pages/calendar/calendar">
			<uni-list-item title="在线签到"/>
			</navigator>
			<uni-list-item title="在线客服"/>
		</uni-list>
        <view class="btn-row">
            <button v-if="hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
            <button v-if="!hasLogin" type="default" @tap="bindLogout">退出登录</button>
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
	}
	.item{
		margin: 10rpx;
	}
	.uni-list{
		margin: 5rpx 0;
	}
	.userinfo {
		display: flex;
		background: #fff;
		padding: 20rpx;
	}
	.userinfo .userimg{
		width: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.userinfo .userimg image{
		width: 150rpx;
		height: 150rpx;
	}
	.userinfo .userinfot{
		flex: 1;
	}
	.userinfo .userinfot .line{
		font-size: 24rpx;
		text-align: left;
	}
	.linebtn{
		display: flex;
		justify-content:space-between;
	}
	.linebtn button{
		width: 200rpx;
		height: 50rpx;
		font-size: 24rpx !important;
		line-height: 50rpx !important;
		margin-left:0 !important;
	}
	.uni-button{
		font-size: 24rpx !important;
		line-height: 50rpx !important;
	}
	.red{
		color: red;
	}
	.bold{
		font-weight: bold;
	}
</style>
