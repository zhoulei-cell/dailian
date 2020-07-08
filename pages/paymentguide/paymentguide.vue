<template>
	<view class="payment-guide">
		<view class="container">
		  <view class="steps-group">
			  <view class="steps-title">第一步</view>
			  <view class="steps-info d-flex">
				  <view class="steps-image">
					  <image src="../../static/img/pay/steps_1.png" alt="图片"></image>
				  </view>
				  <view class="steps-desc flex-1">首先打开微信页面 点击右上角的加号选择收付款</view>
			  </view>
		  </view>
		  <view class="steps-group">
			  <view class="steps-title">第二步</view>
			  <view class="steps-info d-flex">
				  <view class="steps-image">
					  <image src="../../static/img/pay/steps_2.png" alt="图片"></image>
				  </view>
				  <view class="steps-desc flex-1">打开收付款页面点击最后一行的转账到银行卡</view>
			  </view>
		  </view>
		  <view class="steps-group">
			  <view class="steps-title">第三步</view>
			  <view class="steps-info d-flex">
				  <view class="steps-image">
					  <image src="../../static/img/pay/steps_3.png" alt="图片"></image>
				  </view>
				  <view class="steps-desc flex-1">选择向银行卡转账</view>
			  </view>
		  </view>
		  <view class="steps-group">
			  <view class="steps-title">第四步</view>
			  <view class="steps-info d-flex">
				  <view class="steps-image">
					  <image src="../../static/img/pay/steps_4.png" alt="图片"></image>
				  </view>
				  <view class="steps-desc flex-1">
					<view class="desc">输入收款人姓名 卡号 银行 </view>
					<view class="desc">李刚</view>
					<view class="desc">6210981000012981819</view>
					<view class="desc">邮政储蓄</view>
					<view class="tips">注意 一定要保留支付凭证，然后联系客服 </view>
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
				
			};
		}
	}
</script>

<style lang="scss">
	.payment-guide{
		font-family: SimHei;
    font-weight: 400;
    .container{
      padding: 20upx 115upx;
      .steps-group{
        padding-bottom: 30upx;
        .steps-title{
          padding: 18upx 0;
          color:rgba(0,0,0,1);
          font-size: 32upx;
          line-height: 32upx;
        }
        .steps-info{
          .steps-image{
            image{
              display: block;
              width: 250upx;
              height: 430upx;
            }
          }
          .steps-desc{
            padding-left: 20upx;
            font-size: 18upx;
            line-height: 28upx;
            .tips{
              padding-top: 80upx;
              font-size: 18upx;
              color:rgba(254,1,1,1);
              line-height: 28upx;
            }
          }
        }
      }
    }
	}
</style>
