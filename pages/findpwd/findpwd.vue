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
			<view class="form-box">
				<view class="form-item">
					<image src="../../static/images/phone.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入手机号" v-model="phone"/>
				</view>
				<view class="form-item">
					<image src="../../static/images/pwd.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入新的密码" v-model="password"/>
				</view>
				<view class="form-item">
					<image src="../../static/images/verify.png" mode="widthFix"></image>
					<input type="text" placeholder="请输入验证码" v-model="verify"/>
					<view class="verify" @tap="getVerifyCode">{{codeText}}</view>
				</view>
				<view class="form-button" @tap="findPwd">重置密码</view>
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
				codeText: '获取验证码',
				isGet: true,
				phone: '',
				password: '',
				verify: ''
			}
		},
		methods: {
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
				if (checkThing(this.password)) {
					uni.showToast({
						icon: 'none',
						title: '请输入账号密码'
					})
					return false
				}
				if (checkThing(this.verify)) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return false
				}
				return true
			},
			//发送找回密码请求
			sendFindPwd() {
				const opts = {
					url: '/api/reset_password',
					method: 'post'
				}
				const params = {
					code: this.verify,
					password: this.password,
					phone: this.phone
				}
				this.$http.httpRequest(opts,params).then(res => {
					uni.hideLoading()
					if (res.data.code === 200) {
						uni.showToast({
							icon: 'none',
							title: '重置成功'
						})
						this.logout()
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}, error => {
					uni.hideLoading()
					uni.showToast({
						icon: 'none',
						title: '重置失败'
					})
				})
			},
			//找回密码
			findPwd() {
				if (!this.check()) {
					return null
				}
				uni.showLoading({
					title: '密码重置中...'
				})
				this.sendFindPwd()
			},
			// 退出登录
			logout(){
				const opts = {
					url: '/api/loginout',
					method: 'post'
				};
				const token = "";
				uni.getStorage({
					key: 'token',
					success: function(ress) {
						token = ress.data
					}
				});
				const params = {
					token: token
				}
				this.$http.httpRequest(opts, params).then(res => {
					uni.removeStorage({
					    key: 'userinfo'
					})
					uni.removeStorage({
					    key: 'token'
					})
					uni.navigateTo({
						url:"/pages/signIn/signIn"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.sign-in{
		height: 100%;
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
