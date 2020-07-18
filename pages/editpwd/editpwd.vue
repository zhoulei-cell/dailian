<template>
	<view class="edit-pwd">
		<view class="wrapper">
			<!-- 修改密码 -->
			<view class="list-group">
				<view class="list-title">密码修改</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">新密码</view>
						<input type="text" v-model="pwd" placeholder="请填写新的账号密码" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 修改密码 -->
			<!-- 订单信息 -->
			<view class="order-list">
				<view class="lineinfo">
					<view class="title">游戏信息</view>
					<view class="cont">
						<view class="ordercode line">订单标题：{{info.title}}</view>
						<view class="dec line">游戏区服：{{info.game.name}}/{{info.platform.name}}/{{info.game_area.name}}</view>
						<view class="ordercode line">订单编号：{{info.order_no}}</view>
						<view class="ordertime line">发布时间：{{info.created_at}}</view>
						<view class="ordertime line">当前段位：{{info.current_segment}}</view>
						<view class="ordertime line">目标段位：{{info.tag_segment}}</view>
					</view>
				</view>
				<view class="lineinfo">
					<view class="title">账号信息</view>
					<view class="cont">
						<view class="line">账号：{{info.game_account}}</view>
						<view class="line">密码：{{info.game_password}}</view>
						<view class="line">游戏角色：{{info.game_role_name}}</view>
					</view>
				</view>
			</view>
			<!-- 订单信息 -->
		</view>
		<view class="next">
			<button  type="default" @tap="confirmOrder">确认修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwd: '',
				info: {
					area: '',
					title: '',
					game_id: '1',
					platform_id: '',
					game_area_id: '',
					current_segment: '',
					tag_segment: '',
					price: '',
					rel_phone: '',
					rel_qq: '',
					game_account: '',
					game_password: '',
					game_role_name: '',
					promise_price: '',
					eff_price: '',
					rel_message: '',
					inscription_level: '',
					duration: '',
					hero_num: '',
					province: 0,
					lat: '',
					lon: '',
					game: {},
					platform: {},
					game_area: {}
				}
			}
		},
		onLoad(option) {
			this.getorderdetail((option.id))
		},
		methods: {
			//获取订单详情
			getorderdetail(id){
				let opts = {
					url: '/api/order/get_order_info/'+id,
					method: 'get'
				}
				let params = {
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						this.info=res.data.data
					}
				}, error => {
					uni.showToast({
						icon: 'none',
						title: '获取信息失败'
					})
					uni.navigateBack({
						delta: 1
					})
				})
			},
			// 修改订单
			editOrder() {
				uni.showLoading({
					title: "修改中..."
				})
				let opts = {
					url: '/api/order/edit',
					method: 'post'
				}
				this.$http.httpTokenRequest(opts, this.info).then(res => {
					uni.hideLoading()
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: '修改成功!'
						})
						setTimeout(() => {
							uni.navigateTo({
								url:'../orderrelease/orderrelease'
							})
						}, 500)
					} else {
						uni.showToast({
							icon: 'none',
							title: "修改失败!"
						})
					}
				}, error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: "修改失败!"
					})
				})
			},
			confirmOrder() {
				if (!this.pwd) {
					uni.showToast({
						icon: 'none',
						title: '新密码不能为空'
					})
					return null
				}
				this.info.game_password = this.pwd
				this.editOrder()
			}
		}
	}
</script>

<style lang="scss">
	.edit-pwd{
		width: 100%;
		.wrapper{
			// padding-bottom: 120rpx;
			padding: 0 20rpx 120rpx;
			margin-top: 50rpx;
			.list-group{
				background-color: rgba(255,255,255,1);
				box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
				border-radius: 15rpx;
				margin-bottom: 50rpx;
				font-family: SimHei;
				font-weight: 400;				
				.list-title{
					height: 90rpx;
					padding-left: 20rpx;
					background-color: rgba(244,244,244,1);
					font-size: 28rpx;
					color:rgba(51,51,51,1);
					line-height: 90rpx;
				}
				.list-item{
					padding: 18rpx 20rpx;
					background-color: #fff;
					.placeholder{
						font-size: 24rpx;
						color:rgba(153,153,153,1);
						line-height: 70rpx;
					}
					.item-box{
						border-bottom: 1rpx solid #ccc;
						.left{
							font-size: 28rpx;
							color:rgba(51,51,51,1);
							line-height: 70rpx;
						}
						&>input{
							font-size: 24rpx;
							color:#000;
							line-height: 70rpx;
						}
					}
				}
			}
			.order-list{
				.lineinfo{
					position: relative;
					border-bottom: 1px solid #E0E0E0;
					background-color: rgba(255,255,255,1);
					box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
					border-radius: 15rpx;
					margin-bottom: 40rpx;
					.cont{
						padding: 10rpx 23rpx;
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
				}
			}
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
	}
</style>
