<template>
    <view class="content">
		<view class="inputline">
			联系电话：<input type="text" placeholder="请输入您的电话" focus v-model="account"/>
		</view>
		<view class="inputline">
			QQ：<input type="text" placeholder="请输入您的QQ" v-model="accountqq"/>
		</view>
        <view class="btn">
        	<button type="default" @tap="ordercomfirm">提交订单</button>
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
                accountqq: '',
				order_id:''
            }
        },
        methods: {
			//提交订单
            ordercomfirm() {
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
                if (this.accountqq.length <= 0) {
                    uni.showToast({
                        icon: 'none',
                        title: '请输入QQ号'
                    });
                    return;
                }
				let opts = {
					url: '/api/order/receive',
					method: 'post'
				};
				let param = {
					order_id:this.order_id,
					rec_qq: this.accountqq,
					rec_phone: this.account
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					if(res.data.code==200){
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.reLaunch({
							url: '../main/main'
						})
						
					}else{
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}, error => {
					console.log(error);
				})
            }
        },
		onLoad: function (option) {
			this.order_id=option.id
		}
    }
</script>

<style>
	.content{
		background-color: #f4f8fb;
		padding: 0 20rpx;
		position: relative;
		padding-bottom: 150rpx;
	}
	.inputline{
		display: flex;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		align-items: center;
		padding:26rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		margin-top: 40rpx;
	}
	.inputline input{
		font-size:28rpx;
	}
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

	.btn{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height:120rpx;
		background:rgba(255,255,255,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	.btn button{
		width:100%;
		height:80rpx;
		background:rgba(0,203,130,1);
		box-shadow:0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		line-height: 80rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	/* #ifdef APP-PLUS */
	.btn{
		bottom: 0;
	}
	/* #endif */
	
</style>
