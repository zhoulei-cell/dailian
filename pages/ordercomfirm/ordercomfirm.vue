<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入手机号"></m-input>
            </view>
            <view class="input-row">
                <m-input class="m-input" type="accountqq" v-model="accountqq" placeholder="请QQ号"></m-input>
            </view>
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
		padding: 36rpx 0;
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
		font-size:32rpx;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(115,118,128,1);
		padding-top: 82rpx;
	}
	.btn button{
		height:96rpx;
		background:linear-gradient(90deg,rgba(23,102,255,1) 0%,rgba(87,144,255,1) 100%);
		border-radius:48rpx;
		font-size:32rpx;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.btn uni-button{
		height: auto;
	}
	
	
</style>
