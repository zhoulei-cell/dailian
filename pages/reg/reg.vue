<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入手机号"></m-input>
			</view>
			<view class="input-row border">
				<m-input class="m-input" type="text" clearable focus v-model="captcha" placeholder="输入图片验证码"></m-input>
				<image :src="imgcode" mode="" @tap="getImgCode"></image>
			</view>
			<view class="input-row border">
				<m-input class="m-input" type="text" clearable focus v-model="code" placeholder="输入验证码"></m-input>
				<text @tap="pushmessage" :class="colorText">{{codeText}}</text>
			</view>
			<view class="input-row">
				<m-input class="m-input" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row">
				<m-input class="m-input" type="text" v-model="promote_phone" placeholder="请输入推荐人手机号"></m-input>
			</view>
		</view>
		<view class="btn">
			<view class="btnleft"></view>
			<view class="btnright">
				<button @tap="bindLogin">注册</button>
			</view>
		</view>
		<view class="bottom">
			<navigator url="../login/login" class="margin0">账号登录</navigator>
			<navigator url="../dxlogin/dxlogin">短信登录</navigator>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: '',
				password: '',
				captcha: '',
				imgcode: '',
				code: '',
				key: '',
				codeText: "获取验证码",
				colorText: "blue",
				promote_phone: ''
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			// 获取验图片证码
			getImgCode() {
				let opts = {
					url: '/api/get_captcha',
					method: 'get'
				};
				this.$http.httpRequest(opts).then(res => {
					this.key = res.data.key
					const imgcode = res.data.img
					base64ToPath(imgcode)
						.then(path => {
							this.imgcode = path
						})
						.catch(error => {
							console.error(error)
						})
					//打印请求返回的数据
				}, error => {
					console.log(error);
				})
			},
			// 发送短信验证码
			sendmessagecode() {
				return new Promise((reslove,reject)=>{
					if (this.account.length != 11) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的手机号'
						});
						return;
					}
					if (this.captcha.length != 4) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确图片验证码'
						});
						return;
					}
					let opts = {
						url: '/api/send_sms',
						method: 'post'
					};
					let param = {
						captcha: this.captcha,
						key: this.key,
						phone: this.account
					}
					this.$http.httpRequest(opts,param).then(res => {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						reslove(res)
					})
				})
			},
			// 注册
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length != 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
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
					title: '注册中...'
				})
				let opts = {
					url: '/api/register',
					method: 'post'
				};
				let param = {
					captcha: this.code,
					password: this.password,
					phone: this.account,
					p: this.promote_phone
				}
				this.$http.httpRequest(opts,param).then(res => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					});
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}, error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '注册失败！请稍后重试'
					})
				})
			},
			// 发送验证码
			pushmessage() {
				this.sendmessagecode().then(res => {
					if (res.data.code === 200) {
						this.countDown()
					}
				})
			},
			countDown() {
				let num = 60;
				this.colorText = "grey"
				const fn = () => {
					num--;
					if (num === 0) {
						this.codeText = "重新获取验证码"
						this.colorText = "blue"
						clearInterval(this.timer)
					} else {
						this.codeText = `${num}秒后重试`
					}
				}
				fn()
				this.timer = setInterval(fn, 1000)
			}
		},
		onReady() {
			this.getImgCode()
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
		display: flex;
		padding-top: 82rpx;
	}

	.btn button {
		width: 208rpx;
		height: 96rpx;
		background: linear-gradient(90deg, rgba(23, 102, 255, 1) 0%, rgba(87, 144, 255, 1) 100%);
		border-radius: 48rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-left: 80rpx;
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
