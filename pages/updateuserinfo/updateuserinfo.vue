<template>
	<view class="content">
		<view class="userimg">
			<view class="imgbox">
				<image :src=" userinfo.avatar || '../../static/img/qq.jpg'" mode="widthFix" @tap="cI"></image>
			</view>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<m-input class="m-input" type="text" v-model="userinfo.name" placeholder="请输入昵称"></m-input>
			</view>
			<view class="input-row">
				<m-input class="m-input" type="text"  v-model="userinfo.qq" placeholder="请输入QQ"></m-input>
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
				userinfo:{},
				path:null
			}
		},
		methods: {
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
			},
			//图片上传
			cI(){
				let _this=this;
			    uni.chooseImage({
			        count: 1,
			        sizeType:['copressed'],
			        success(res) {
			            var imgFiles = [{uri: res.tempFilePaths[0], name: `image[0]`}]
			            _this.$http.uploadimg(imgFiles).then((res)=>{
							var data = JSON.parse(res.data)
							_this.userinfo.avatar = data.data[0].full
							_this.path=data.data[0].url
						})
			        }
			    })
			},
			//提交
			submit(url){
				let opts = {
					url: '/api/edit_user',
					method: 'put'
				}
				let params
				if(this.path){
					params={
						name:this.userinfo.name,
						avatar:this.path,
						qq:this.userinfo.qq
					}
				}else{
					params={
						name:this.userinfo.name,
						qq:this.userinfo.qq
					}
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							title:res.data.msg
						})
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			}
		},
		onLoad() {
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
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	
	.btn button {
		background: rgba(0, 203, 130, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
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
	.userimg {
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.imgbox{
		width: 200rpx;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #E0E0E0;
		border-radius: 50%;
		overflow: hidden;
	}
	.userimg image{
		width: 200rpx;
	}
</style>
