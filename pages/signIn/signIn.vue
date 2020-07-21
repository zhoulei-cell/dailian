<template>
	<view class="sign-in">
		<!-- 头像和背景 -->
		<view class="sign-top">
			<view class="sign-bg">
				<view class="filter"></view>
			</view>
			<view class="photo"></view>
		</view>
		<!-- 头像和背景 -->
		<!-- 登陆表单输入部分 -->
		<view class="sign-form">
			<view class="tab-bar d-flex">
				<view class="tab-bar-item flex-1" :class="{change: loginType === 'pwd'}" @tap="changeLoginType('pwd')">账号登陆</view>
				<view class="tab-bar-item flex-1" :class="{change: loginType === 'sms'}" @tap="changeLoginType('sms')">短信登陆</view>
			</view>
			<view class="form-box">
				<view class="form-item">
					<image src="../../static/images/phone.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入手机号" v-model="phone"/>
				</view>
				<view class="form-item" v-if="loginType === 'pwd'">
					<image src="../../static/images/pwd.png" mode="widthFix"></image>
					<input type="password" placeholder="请输入密码" v-model="password"/>
				</view>
				<view class="form-item" v-if="loginType === 'sms'">
					<image src="../../static/images/verify.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入验证码" v-model="verify"/>
					<view class="verify" @tap="getVerifyCode">{{codeText}}</view>
				</view>
				
				<view class="form-button" @tap="submit">登陆</view>
				<view class="link">
					<view class="sign-up" @tap="signUp">注册</view>
					<view class="forget-pwd" @tap="findPwd">忘记密码?</view>
				</view>
			</view>
		</view>
		<!-- 登陆表单输入部分 -->
	</view>
</template>

<script>
	import { checkPhone, checkThing } from '../../common/check.js'
	export default {
		data() {
			return {
				loginType: 'pwd',
				codeText: '获取验证码',
				isGet: true,
				phone: '',
				password: '',
				verify: ''
			}
		},
		methods: {
			//切换登陆方式
			changeLoginType(type) {
				this.loginType = type
			},
			// 发送短信验证码
			sendmessagecode() {
				const opts = {
					url: '/api/send_sms',
					method: 'post'
				}
				const params = {
					phone: this.phone
				}
				this.$http.httpRequest(opts,params).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				})
			},
			//获取验证码
			getVerifyCode() {
				if (!checkPhone(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
					return false
				}
				if (this.isGet) {
					this.isGet = false
					this.countDown()
					//发送验证码
					this.sendmessagecode()
				}
			},
			//倒计时
			countDown() {
				let num = 60;
				const fn = () => {
					num--;
					if (num === 0) {
						this.isGet = true
						this.codeText = "重新获取验证码"
						clearInterval(this.timer)
					} else {
						this.codeText = `${num}秒后重试`
					}
				}
				fn()
				this.timer = setInterval(fn, 1000)
			},
			//表单验证
			check() {
				if (!checkPhone(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
					return false
				}
				if (this.loginType === 'pwd') {
					if (checkThing(this.password)) {
						uni.showToast({
							icon: 'none',
							title: '请输入账号密码'
						})
						return false
					}
				} else {
					if (checkThing(this.verify)) {
						uni.showToast({
							icon: 'none',
							title: '请输入验证码'
						})
						return false
					}
				}
				return true
			},
			//请求
			http(opts, params) {
				this.$http.httpRequest(opts, params).then(res => {
					uni.hideLoading()
					if(res.data.code==200){
						this.setStorage(res)
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败，账号或密码错误'
						})
					}
				}, err => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '登录失败'
					})
				})
			},
			//设置缓存
			setStorage(res) {
				uni.setStorage({
				    key: 'token',
				    data: res.data.data.token,
				    success: () => {
				        uni.showToast({
				        	icon: 'none',
				        	title: '登陆成功!'
				        })
						uni.setStorage({
						    key: 'userinfo',
						    data: res.data.data.user,
						})
						uni.reLaunch({
							url: '../main/main'
						})
				    }
				})
			},
			//密码登陆
			pwdLogin() {
				const opts = {
					url: '/api/login',
					method: 'post'
				}
				const params = {
					phone: this.phone,
					password: this.password
				}
				this.http(opts, params)
			},
			//短信登陆
			smsLogin() {
				const opts = {
					url: '/api/code_login',
					method: 'post'
				};
				const params = {
					code: this.verify,
					phone: this.phone
				}
				this.http(opts, params)
			},
			//登陆
			submit() {
				if (!this.check()) {
					return null
				}
				uni.showLoading({
					title: '登陆中...'
				})
				this.loginType === 'pwd' ? this.pwdLogin() : this.smsLogin()
 			},
			//去注册页面
			signUp() {
				uni.navigateTo({
					url: '/pages/signUp/signUp'
				})
			},
			//去找回密码页面
			findPwd() {
				uni.navigateTo({
					url: '/pages/findpwd/findpwd'
				})
			}
		}
	}
</script>

<style lang="scss">
	.sign-in{
		overflow: hidden;
		width: 100%;
		background-color: #fff;
		.sign-top{
			position: relative;
			height: 450rpx;
			.sign-bg{
				position: absolute;
				left: -300rpx;
				top: 0;
				width: 1350rpx;
				height: 450rpx;
				border-radius: 0 0 50% 50%;
				background-image: url(../../static/images/01.jpg);
				background-size: 800rpx 450rpx;
				background-position: 255rpx 0rpx;
				// .filter{
				// 	width: 100%;
				// 	height: 100%;
				// 	background-color: #00cb82;
				// 	filter: blur(160rpx);
				// }
			}
			.photo{
				position: absolute;
				left: 50%;
				bottom: -84rpx;
				width: 168rpx;
				height: 168rpx;
				margin-left: -84rpx;
				border-radius: 50%;
				background-image: url(../../static/images/timg.jpg);
				background-size: 100% 100%;
				z-index: 1;
			}
		}
		.sign-form{
			padding: 130rpx 127rpx 0;
			.tab-bar{
				display: flex;
				height: 60rpx;
				border-bottom: 2rpx solid #999;
				.tab-bar-item{
					flex: 1;
					height: 60rpx;
					color: rgba(153,153,153,1);
					font-size: 28rpx;
					text-align: center;
					line-height: 60rpx;
					&.change{
						color: #00cb82;
						border-bottom: 2rpx solid #00cb82;
					}
				}
			}
			.form-box{
				margin-top: 10rpx;
				.form-item{
					display: flex;
					align-items: center;
					border-bottom: 1rpx solid #eee;
					image{
						width: 32rpx;
						height: 37rpx;
					}
					input{
						flex: 1;
						height: 94rpx;
						font-size: 25rpx;
						padding: 0 20rpx;
					}
					.verify{
						font-size: 18rpx;
						color: rgba(202,202,202,1);
						padding: 0 10rpx; 
					}
				}
				.form-button{
					height: 79rpx;
					margin-top: 50rpx;
					border-radius: 15rpx;
					background-color: #00cb82;
					color: #fff;
					font-size: 30rpx;
					line-height: 79rpx;
					text-align: center;
				}
				.link{
					display: flex;
					justify-content: space-between;
					padding: 30rpx 0;
					view{
						font-size: 24rpx;
						text-decoration: underline;
						color: rgba(153,153,153,1);
						line-height: 24rpx;
					}
				}
			}
		}
	}
</style>
