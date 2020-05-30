<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<m-input class="m-input" type="text" focus v-model="userinfo.real_name" placeholder="姓名"></m-input>
			</view>
			<view class="input-row">
				<m-input class="m-input" type="number" v-model="userinfo.id_card" placeholder="身份证号"></m-input>
			</view>
		</view>
		<view class="btn">
				<button @tap="submit">提交</button>
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
				userinfo:{}
			}
		},
		methods: {
			// 发送验证码
			submit() {
				let opts = {
					url: '/api/certification',
					method: 'post'
				};
				let param = {
					real_name: this.name,
					id_card: this.card
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				}, error => {
					console.log(error);
				})
			},
			// 获取用户信息
			getuserinfo(){
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {
					
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					this.userinfo = res.data.data
				})
			}
		},
		onShow() {
			this.getuserinfo()
		}
	}
</script>

<style>
	.linetitle {
		font-size: 48rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(47, 48, 52, 1);
		padding-top: 120rpx;
		padding-bottom: 40rpx;
	}

	.m-input {
		padding: 36rpx 0 !important;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(161, 165, 179, 1);
	}

	.input-row {
		display: flex;
		align-items: center;
	}

	.input-row text {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.input-row image {
		width: 100rpx;
		height: 50rpx;
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
		width: 100upx;
		margin: 20upx;
	}

	.btn {
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(115, 118, 128, 1);
		padding-top: 82rpx;
	}

	.btn button {
		height: 96rpx;
		background: linear-gradient(90deg, rgba(23, 102, 255, 1) 0%, rgba(87, 144, 255, 1) 100%);
		border-radius: 48rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.btn uni-button {
		height: auto;
	}

	.btn navigator {
		margin-left: 70rpx;
	}

	.btnleft {
		flex: 1;
	}

	.btnright {
		display: flex;
		align-items: center;
	}

	.blue {
		color: #1766FF;
	}

	.grey {
		color: #A1A5B3;
	}

	.bottom {
		position: absolute;
		width: 100%;
		text-align: center;
		bottom: 0;
		left: 0;
		line-height: 100rpx;
	}

	.bottom navigator {
		display: inline-block;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(23, 102, 255, 1);
		margin-left: 40rpx;
	}

	.margin0 {
		margin-left: 0 !important;
	}

	.input-row.border::after {
		left: 0;
	}
</style>
