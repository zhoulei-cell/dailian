<template>
	<view class="help-center">
		<view class="list-group" @tap="show(0)">
			<view class="list-group-title d-flex jc-between ai-center">
				<view class="text flex-1">1、为什么要充值会员？</view>
				<image :class="{left: !status[0].isShow, bottom: status[0].isShow}" :src="status[0].isShow ? bottomImg : rightImg"></image>
			</view>
			<view class="list-group-answer" v-show="status[0].isShow">我们战狼电竞APP是实行会员接单代打的，为了提供优质的服务质量普通用户只能进行发单的，充值会员以后就可以进行接单代打争取生活费和零花钱等我们战狼电竞是您不错的选择。</view>
		</view>
		<view class="list-group" @tap="show(1)">
			<view class="list-group-title d-flex jc-between ai-center">
				<view class="text flex-1">2、遇到锁号等问题怎么办？</view>
				<image :class="{left: !status[1].isShow, bottom: status[1].isShow}" :src="status[1].isShow ? bottomImg : rightImg"></image>
			</view>
			<view class="list-group-answer" v-show="status[1].isShow">我们战狼电竞APP是优质的接单代打服务平台，当您遇到号主锁号等情况是，我们这边是有一个协商结算的通道，方便代打者和发布者在第一时间进行协商，当协商结果上传以后我们后台将在第一时间进行处理</view>
		</view>
		<view class="list-group" @tap="show(2)">
			<view class="list-group-title d-flex jc-between ai-center">
				<view class="text flex-1">3、提现手续费多少？</view>
				<image :class="{left: !status[2].isShow, bottom: status[2].isShow}" :src="status[2].isShow ? bottomImg : rightImg"></image>
			</view>
			<view class="list-group-answer" v-show="status[2].isShow">当会员想提现余额时我们这边的提现余额通道将收取5%的手续费。</view>
		</view>
		<view class="list-group" @tap="show(3)">
			<view class="list-group-title d-flex jc-between ai-center">
				<view class="text flex-1">4、申请提现后，多久能到账？</view>
				<image :class="{left: !status[3].isShow, bottom: status[3].isShow}" :src="status[3].isShow ? bottomImg : rightImg"></image>
			</view>
			<view class="list-group-answer" v-show="status[3].isShow">会员发起申请提现余额以后我们后台将进行仔细的审核审核时间将不会超过24小时。审核通过就会将余额提现到会员的银行卡上</view>
		</view>
		<view class="list-group">
			<view class="list-group-title">5、其他详情问题请咨询客服</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rightImg: '../../static/img/help/right.png',
				bottomImg: '../../static/img/help/bottom.png',
				status: [
					{
						isShow: false
					},
					{
						isShow: false
					},
					{
						isShow: false
					},
					{
						isShow: false
					}
				]
			}
		},
		methods: {
			show(index) {
				this.status[index].isShow = !this.status[index].isShow
			}
		}
	}
</script>

<style lang="scss">
	.help-center{
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		.list-group{
			padding: 20upx 0;
			font-family: SimHei;
			font-weight: 400;
			border-bottom: 1upx solid #DFDFDF;
			.list-group-title{
				font-size: 30upx;
				color:rgba(85,85,85,1);
				image{
					display: block;
				}
				image.left{
					width: 17upx;
					height: 30upx;
				}
				image.bottom{
					width: 30upx;
					height: 17upx;
				}
			}
			.list-group-answer{
				font-size: 24upx;
				color:rgba(153,153,153,1);
			}
		}
	}
</style>
