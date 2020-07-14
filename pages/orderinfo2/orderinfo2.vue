<template>
    <view class="content">
		<view class="lineinfo">
			<view class="title">游戏信息</view>
			<view class="cont">
				<view class="ordercode line">订单标题：{{orderInfo.title}}</view>
				<view class="dec line">游戏区服：{{orderInfo.game.name}}/{{orderInfo.platform.name}}/{{orderInfo.game_area.name}}</view>
				<view class="ordercode line">订单编号：{{orderInfo.order_no}}</view>
				<view class="ordertime line">发布时间：{{orderInfo.created_at}}</view>
				<view class="ordertime line">当前段位：{{orderInfo.current_segment}}</view>
				<view class="ordertime line">目标段位：{{orderInfo.tag_segment}}</view>
			</view>
		</view>
		<view class="lineinfo">
			<view class="title">费用信息</view>
			<view class="cont2">
				<view class="contitem">
					<view class="contitemtop">{{orderInfo.duration}}小时</view>
					<view class="contitembottom">时间要求</view>
				</view>
				<view class="contitem">
					<view class="contitemtop">￥{{orderInfo.promise_price}}</view>
					<view class="contitembottom">安全保证金</view>
				</view>
				<view class="contitem">
					<view class="contitemtop">￥{{orderInfo.eff_price}}</view>
					<view class="contitembottom">效率保证金</view>
				</view>
				<view class="contitem" style="border-right: 0;">
					<view class="contitemtop">￥{{orderInfo.price}}</view>
					<view class="contitembottom">代练费</view>
				</view>
			</view>
		</view>
		<view class="lineinfo">
			<view class="title">发布者信息</view>
			<view class="cont">
				<view class="linetitle">发  布  者：{{orderInfo.user.name ||　orderInfo.user.phone}}</view>
				<view class="line">总发单数：{{orderInfo.user.rel_number}}笔</view>
				<view class="line">总成交数：{{orderInfo.user.rec_number+orderInfo.user.rel_number}}笔</view>
				<view class="line">协  商  率：{{orderInfo.user.negotiation}}</view>
				<view class="line" v-if="orderInfo.rel_phone">电话：{{orderInfo.rel_phone}}</view>
				<view class="line" v-if="orderInfo.rel_qq">QQ：{{orderInfo.rel_qq}}</view>
			</view>
		</view>
		<!-- <view class="lineinfo">
			<view class="title">账号信息</view>
			<view class="cont">
				<view class="line">账号：{{orderInfo.game_account}}</view>
				<view class="line">密码：{{orderInfo.game_password}}</view>
			</view>
		</view> -->
		<view class="lineinfo" v-if="orderInfo.rel_message !== 'null'">
			<view class="title">当前游戏信息</view>
			<view class="cont">
				<!-- <view class="line">游戏角色：{{orderInfo.game_role_name}}</view> -->
				<view class="line">{{orderInfo.rel_message}}</view>
			</view>
		</view>
		<view class="lineinfo">
    		<view class="title">代练要求</view>
    		<view class="cont">
					<view class="text-rule">
    				<view class="linetextinfo">1.如qq区无法正常登陆需要验证码,请打手卸载qq后直接游戏界面登陆</view>
    				<view class="linetextinfo">2.指定英雄订单上传战力初始图,别掉原来的战力分,被ban被选务必每场截图上传。</view>
    				<view class="linetextinfo">3.接单后30分钟内上号开打,接单又退单将扣除效率金</view>
    				<view class="linetextinfo">4.高级套餐:胜率低于70%或打手原因单方面中途撤单支付代练费0元</view>
    				<view class="linetextinfo">5.WX区: 号主电话,在当前密码的后面,验证码或密码错自己问一下态度好点。</view>
    				<view class="linetextinfo">6.QQ区: 先进游戏后台登录账号,不可以登录玩家QQ,,然后QQ区如有异地冻结密码后面是手机号联系号主改密码即可。</view>
    				<view class="linetextinfo">7.需要验证码不联系号主直接撤单者必扣效率</view>
    				<view class="linetextinfo">8.动用金币钻石铭文体验卡等必须先经过我同意之后才能使用</view>
    				<view class="linetextinfo">9.接单10分钟内开打并传首图,完成传图(带有号主名字的排行榜截图)</view>
    				<view class="linetextinfo">10.拖单不打,一页四红,三连跪,掉星,我方有权中途撤单要求赔付效率金</view>
					</view>
    		</view>
    	</view>
		<view class="line2">
			<checkbox-group>
				<label>
					<checkbox value="cb" checked="true" disabled/>我已阅读并接受<text>发单协议</text>
				</label>
			</checkbox-group>
		</view>
		<view class="next" v-if="!type">
			<button  type="default" @tap="naviteto">我来代练</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
					orderInfo:{
						game: {},
						game_area: {},
						platform: {},
						user: {}
					},
					id:"",
					type:""
        }
    },
    methods: {
			//获取订单详情
			getorderdetail(id){
				let opts = {
					url: '/api/order/info?order_id='+id,
					method: 'get'
				}
				let params = {
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						this.orderInfo=res.data.data
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.message|| res.data.msg 
						})
					}
				}, error => {
					console.log(error);
				})
			},
			//提交订单
			naviteto(){
				uni.navigateTo({
					url:"../ordercomfirm/ordercomfirm?data="+JSON.stringify(this.orderInfo)
				})
			}
    },
		onLoad: function (option) { 
			console.log(option.id)
			this.id=option.id
			this.getorderdetail(option.id)
			this.type=option.type
		}
}
</script>
<style>
	.blue{
		color: #0000FF;
		font-size: 24rpx;
	}
	.pzero{
		padding-bottom: 0 !important;
	}
	.red{
		color: red;
		font-size: 24rpx;
	}
	.content{
		background: #f4f8fb;
		padding-bottom: 100rpx;
	}
	.lineinfo{
		position: relative;
		border-bottom: 1px solid #E0E0E0;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		margin-bottom: 40rpx;
	}
	.line{
		font-size: 24rpx;
		color: #666;
		line-height: 42rpx;
	}
	.title{
		font-weight: bold;
		color: #333;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		border-bottom: 1rpx solid rgba(220,220,220,1);
		padding: 23rpx;
	}
	.lineone{
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 20rpx;
	}
	.lineone .line{
		width: 50%;
	}
	.lineone .line text{
		color: red;
	}
	.linetitle{
		width: 100%;
		font-size: 24rpx;
		color: #666;
		line-height: 42rpx;
	}
	.linetitle .titlel{
		font-weight: bold;
	}
	.linetextinfo{
		box-sizing: border-box;
		color: #666;
		line-height: 26px;
	}
	.next{
		width: 100%;
		position: fixed;
		bottom: 0;
	}
	.next button{
		width: 100%;
	}
	.cont{
		padding: 10rpx 23rpx;
	}
	.cont2{
		display: flex;
		padding: 20rpx 0;
	}
	.cont2 .contitem{
		text-align: center;
		flex: 1;
		border-right: 1px solid rgba(220,220,220,1);
	}
	.cont2 .contitem .contitemtop{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,203,130,1);
	}
	.cont2 .contitem .contitembottom{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.next{
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
	.next button{
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
	.next{
		bottom: 0;
	}
	/* #endif */
	.line2{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(0,203,130,1);
		padding-bottom: 50rpx;
	}
</style>