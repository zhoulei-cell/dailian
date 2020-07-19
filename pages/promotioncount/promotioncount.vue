<template>
	<view class="promotion-count">
		<view class="promotion-user d-flex ai-center">
			<view class="user-photo">
				<image :src="userInfo.avatar || '../../static/img/qq.png'" mode="scaleToFill"></image>
			</view>
			<view class="user-info">
				<view class="name-box d-flex ai-center">
					<view class="name">{{userInfo.name}}</view>
					<image src="../../static/img/other/flag.png" mode="scaleToFill"></image>
				</view>
				<view class="phone">电话号码: {{userInfo.phone}}</view>
			</view>
		</view>
		<view class="promotion-tab d-flex">
			<view class="tab-item" :class="{change: current === 'sirdar'}" @tap="change('sirdar')">队长</view>
			<view class="tab-item" :class="{change: current === 'player'}" @tap="change('player')">队员</view>
		</view>
		<scroll-view class="scroll" scroll-y="true" :style="{height: height + 'rpx'}">
			<view class="list-wrapper">
				<block v-for="(item, index) in memberList" :key="index">
					<view class="list d-flex ai-center">
						<view class="user-photo">
							<image :src="item.avatar || '../../static/img/qq.png'" mode="scaleToFill"></image>
						</view>
						<view class="user-info">
							<view class="name-box">
								<view class="name">姓名：{{item.name}}</view>
							</view>
							<view class="phone">电话号码: {{item.phone}}</view>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 'sirdar',
				height: 550,
				userInfo: {},
				memberList: {},
				sirdarList: [],
				playerList: []
			}
		},
		methods: {
			//切换tab 队长/队员
			change(type) {
				this.current = type
				if (type === 'sirdar') {
					this.memberList = this.sirdarList
				} else {
					this.memberList = this.playerList
				}
			},
			//获取用户数据
			getUserInfo() {
				let opts = {
					url: '/api/getUserInfo'
				}
				this.$http.httpTokenRequest(opts, {}).then(res => {
					this.userInfo = res.data.data
					this.getMemberList()
				})
			},
			//获取队员/队长
			getMemberList() {
				let opts = {
					url: '/api/user/distribution/list',
					method: 'get'
				}
				let params = {
					user_id: this.userInfo.id,
					// captain: 1 //1查询队长，2查询队员，不传查询全部
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					const memberList = res.data.data
					console.log(memberList)
					memberList.forEach(item => {
						if (item.captain == 1) {
							this.sirdarList.push(item)
						} else {
							this.playerList.push(item)
						}
					})
				})
			}
		},
		onLoad() {
			this.getUserInfo()
		}
	}
</script>

<style lang="scss">
	.promotion-count{
		width: 100%;
		font-family: FZZhunYuan-M02;
		font-weight: 400;
		padding: 25rpx 37rpx;
		box-sizing: border-box;
		.promotion-user{
			.user-photo{
				width: 100rpx;
				height: 100rpx;
				image{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}
			.user-info{
				padding-left: 20rpx;
				.name-box{
					padding-bottom: 24rpx;
					.name{
						padding-right: 20rpx;
						font-size: 24rpx;
						color: rgba(12,12,12,1);
						line-height: 25rpx;
					}
					image{
						width: 50rpx;
						height: 25rpx;
					}
				}
				.phone{
					font-size: 24rpx;
					color: rgba(12,12,12,1);
					line-height: 24rpx;
				}
			}
		}
		.promotion-tab{
			height: 60rpx;
			padding-top: 60rpx;
			border-bottom: 2rpx solid #999;
			.tab-item{
				height: 60rpx;
				padding: 0 30rpx;
				margin-right: 70rpx;
				color: #999;
				font-size: 26rpx;
				line-height: 60rpx;
				&.change{
					color: rgba(0,0,0,1);
					border-bottom: 2rpx solid #FE0101;
				}
			}
		}
		.scroll{
			.list-wrapper{
				padding-top: 20rpx;
				.list{
					padding: 22rpx 0;
					.user-photo{
						width: 94rpx;
						height: 94rpx;
						image{
							width: 94rpx;
							height: 94rpx;
							border-radius: 50%;
						}
					}
					.user-info{
						padding-left: 20rpx;
						.name-box{
							padding-bottom: 24rpx;
							.name{
								font-size: 24rpx;
								color: rgba(51,51,51,1);
								line-height: 24rpx;
							}
							image{
								width: 50rpx;
								height: 25rpx;
							}
						}
						.phone{
							font-size: 24rpx;
							color: rgba(51,51,51,1);
						}
					}
				}
			}
		}
	}
</style>
