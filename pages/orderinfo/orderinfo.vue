<template>
    <view class="content">
		<view class="lineinfo">
			<view class="title">星耀30星 - 星耀22星  铭文150</view>
			<view class="dec line">王者荣耀/安卓QQ区/默认服</view>
			<view class="ordercode line">订单编号：DDDLJO202005181028882</view>
			<view class="ordertime line">发布时间：2020-05-18 10:28:26</view>
			<view class="line">接单代练员：初级以上代练员可接</view>
		</view>
		<view class="lineinfo">
			<view class="lineone">
				<view class="line">代练费：<text>￥105.00</text></view>
				<view class="line">代练费：<text>￥105.00</text></view>
				<view class="line">效率保障金：<text>￥105.00</text></view>
			</view>
			<view class="lineone">
				<view class="linetitle"><text class="titlel">发  布  者：</text><text class="blue">呼保义发单</text></view>
				<view class="line">总发单数：1773808笔</view>
				<view class="line">总成交数：75872笔</view>
				<view class="line">总发单数：1773808笔</view>
				<view class="line">协  商  率：1%</view>
				<view class="line">平均验收时间：157分钟</view>
			</view>
			<view class="lineone pzero">
				<view class="linetitle"><text class="titlel">当前游戏信息：</text></view>
				<view class="linetextinfo">账号如果锁定自行联系号主解锁,手机号在密码后面 有问题提交异常,联系号主态度好点,眼熟打手验收更快</view>
			</view>
		</view>
		<view class="lineinfo">
			<view class="linetitle"><text class="titlel">时间要求：</text><text class="red">1天1小时</text></view>
		</view>
		<view class="lineinfo">
			<view class="linetitle"><text class="titlel">代练要求：</text></view>
			<view class="red">(请仔细阅读，如遇纠纷将以此要求和平台协议为准)</view>
			<view class="linetextinfo">
				【代练要求】
				★★如qq区无法正常登陆需要验证码,请打手卸载qq后直接游戏界面登陆
				★ 指定英雄订单上传战力初始图,别掉原来的战力分,被ban被选务必每场截图上传。
				★ ★接单后30分钟内上号开打,接单又退单将扣除效率金
				★ ★高级套餐:胜率低于70%或打手原因单方面中途撤单支付代练费0元
				WX区: 号主电话,在当前密码的后面,验证码或密码错自己问一下态度好点。
				QQ区: 先进游戏,然后后台登录账号,不可以登录玩家QQ,QQ区如有异地冻结密码后面是手机号联系号主改密码即可。
				需要验证码不联系号主直接撤单者必扣效率
				1.动用金币钻石铭文体验卡等必须先经过我同意之后才能使用
				2.接单10分钟内开打并传首图,完成传图(带有号主名字的排行榜截图)
				3.拖单不打,一页四红,三连跪,掉星,我方有权中途撤单要求赔付效率金
				4.订单完成后进裙验收处理订单742-067-549
			</view>
		</view>
		<view class="next">
			<button  type="default" @tap="nextStep">我来代练</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
        }
    },
	components: {
	},
    computed: {
		
    },
    methods: {
		
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
		padding: 0;
		background: #fff;
		padding-bottom: 100rpx;
	}
	.lineinfo{
		padding: 20rpx;
		position: relative;
		border-bottom: 1px solid #E0E0E0;
	}
	.line{
		font-size: 24rpx;
		color: #666;
		line-height: 42rpx;
	}
	.title{
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
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
</style>