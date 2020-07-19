<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入手机号"></m-input>
            </view>
            <view class="input-row">
                <m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
        </view>
        <view class="btn">
        	<view class="btnleft"></view>
        	<view class="btnright">
        		<navigator url="../dxlogin/dxlogin">短信登录</navigator>
        		<button @tap="bindLogin">登录</button>
        	</view>
        </view>
        <view class="bottom">
        	<navigator url="../reg/reg" class="margin0">注册账户</navigator>
        	<navigator url="../pwd/pwd">找回密码</navigator>
        </view>
    </view>
</template>

<script>
    import mInput from '../../components/m-input.vue'
    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '',
                password: ''
            }
        },
        methods: {
			// 登录
            bindLogin() {
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (this.account.length != 11) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入正确的账号'
                    });
                    return;
                }
                if (this.password.length < 6) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
				uni.showLoading({
					title: "登录中..."
				})
				let opts = {
					url: '/api/login',
					method: 'post'
				};
				let param = {
					password: this.password,
					phone: this.account
				}
				this.$http.httpRequest(opts,param).then(res => {
					uni.hideLoading()
					if(res.data.code==200){
						uni.setStorage({
						    key: 'token',
						    data: res.data.data.token,
						    success: () =>{
						        uni.showToast({
						        	icon: 'none',
						        	title: '登陆成功'
						        })
								uni.setStorage({
								    key: 'userinfo',
								    data: res.data.data.user,
								})
								uni.reLaunch({
									url: '../main/main'
								})
						    }
						})
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败，账号或密码错误'
						})
					}
				}, error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '登录失败，请稍后重试'
					})
				})
            }
        }
    }
</script>

<style>
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 20upx;
    }
	.m-input{
		padding: 36rpx 0 !important;
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(161,165,179,1);
	}
    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
	.btn{
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(115,118,128,1);
		display: flex;
		padding-top: 82rpx;
	}
	.btn button{
		width:208rpx;
		height:96rpx;
		background:linear-gradient(90deg,rgba(23,102,255,1) 0%,rgba(87,144,255,1) 100%);
		border-radius:48rpx;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		margin-left: 80rpx;
	}
	.btn uni-button{
		height: auto;
	}
	.btn navigator{
		margin-left: 70rpx;
	}
	.btnleft{
		flex: 1;
	}
	.btnright{
		display: flex;
		align-items: center;
	}
	.blue{
		color: #1766FF;
	}
	.grey{
		color: #A1A5B3;
	}
	.bottom{
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0;
		left: 0;
		line-height: 100rpx;
	}
	.bottom navigator{
		display: inline-block;
		font-size:28rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(23,102,255,1);
		margin-left: 40rpx;
	}
	.margin0{
		margin-left: 0 !important;
	}
	.input-row.border::after{
		left: 0;
	}
</style>
