<template>
  <view class="content">
		<view class="status-wrap">
			<view class="title">选择提交类型</view>
			<view class="status-box d-flex">
				<view class="item" :class="{win:check==1}" @tap="check=1">胜利</view>
				<view class="item" :class="{win:check==2}" @tap="check=2">失败</view>
			</view>
		</view>
		<view class="upload-wrapper">
			<upload-image @upload="updataImg"></upload-image>
		</view>
		<view class="next">
			<button @tap="uploadImg">确认上传</button>
		</view>
  </view>
</template>

<script>
// 注册一个进度条
//var _self;
import uploadImage from '../../components/upload-image'
export default {
	data() {
		return {
			percent:0,
			imageList:[],
			selectindex:1,
			id:"",
			check:1
		}
	},
	components: {
		uploadImage
	},
    methods: {
		updataImg(list) {
			this.imageList = list
		},
		//确认上传图片
		uploadImg() {
			const imgFiles = []
			if (this.imageList.length === 0) {
				uni.showToast({
					icon: 'none',
					title: '您还没有选择图片'
				})
				return null
			}
			if (this.imageList.length > 5) {
				uni.showToast({
					icon: 'none',
					title: '最多只能上传五张图片'
				})
				return null
			}
			this.imageList.forEach((item,index) => {
				imgFiles.push({uri: item, name: `image[${index}]`})
			})
			this.$http.uploadimg(imgFiles).then((res)=>{
				let url = ''
				const data = JSON.parse(res.data)
				data.data.forEach((item, index) => {
					if (index == 0) {
						url += item.url
					} else {
						url += "," + item.url;
					}
				})
				this.imgsubmit(url)
			})
		},
		//图片上传提交
		imgsubmit(url){
			let opts = {
				url: '/api/match/prefinish',
				method: 'post'
			}
			let params={
				match_id: this.id,
				images: url,
				win: this.check
			}
			this.$http.httpTokenRequest(opts,params).then(res => {
				if(res.data.code==200){
					uni.showToast({
						icon:'none',
						title:res.data.msg
					})
					uni.navigateTo({
						url: '/pages/warrecord/warrecord'
					})
				}else{
					uni.showToast({
						icon:'none',
						title:res.data.msg
					})
				}
			}, error => {
				console.log(error);
			})
		}
	},
	onLoad: function (option) {
		this.id = option.id
	}
}
</script>

<style lang="scss">
	.content{
		padding: 0;
	}
	.upload-wrapper{
		margin-top: 20rpx;
		padding: 0 28rpx;
	}
	.status-wrap{
		padding: 28rpx 32rpx;
		font-family: SimHei;
		font-weight: bold;
		border-bottom: 1rpx solid #ccc;
		.title{
			padding-bottom: 20rpx;
			font-size: 30rpx;
			color:rgba(38,38,38,1);
			line-height: 30rpx;
		}
		.status-box{
			padding-top: 20rpx;
			.item{
				width: 200rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background-color: #F5F5F5;
				color: #999;
				font-size: 26rpx;
				text-align: center;
				line-height: 60rpx;
				&:nth-child(1){
					margin-right: 20rpx;
				}
			}
			.win{
				background-color: #39ac6a;
				color: #fff;
			}
		}
	}
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #E0E0E0;
	}
	
	.tab .tabitem {
		flex: 1;
		line-height: 60rpx;
		text-align: center;
		font-size: 24rpx;
	}
	
	.tab .tabitem.check {
		color: #0000FF;
	}
	.imglist{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		padding: 20rpx;
	}
	.imgbox{
		width: 350rpx;
		height: 350rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	.imgbox image{
		width: 100%;
		
	}
.status{
	.item{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		background: #fff;
		.checkbox{
			width: 30rpx;
			height: 30rpx;
			border: 1px solid #09BB07;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.check{
			background: #09BB07;
		}
		.text{
			display: flex;
			align-items: center;
			font-size: 24rpx;
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
	
</style>