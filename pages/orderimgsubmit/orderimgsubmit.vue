<template>
    <view class="order-img">
			<view class="tab">
				<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
			</view>
				<!-- 图片上传 -->
				<view class="image-upload">
					<view class="uni-list list-pd">
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<!-- <view class="uni-uploader-head">
									<view class="uni-uploader-info">{{imageList.length}}/5</view>
								</view> -->
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,index) in imageList" :key="index">
											<view class="uni-uploader__file">
												<view class="delete_img" @tap="deleteImage(index)" v-if="index >= num"></view>
												<image class="uni-uploader__img" :src="image.url || image" :data-src="image.url || image"></image>
											</view>
										</block>
										<view class="uni-uploader__input-box">
											<view class="uni-uploader__input" @tap="chooseImage"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view> 
				<!-- 图片上传 -->
				<custom-popup ref="popup" title="您确定要删除这张图片吗？" @cancel="close" @confirm="confirm"/>
				<view class="next">
					<button @tap="uploadImg">保存</button>
				</view>
    </view>
</template>

<script>
	// 注册一个进度条
	var _self;
	import customPopup from '../../components/custom-popup/custom-popup'
	import uploadImage from '../../components/upload-image'
	export default {
			data() {
				return {
					ordertype: [{
							type: 1,
							text: "开始图"
						},
						{
							type: 2,
							text: "进度图"
						},
						{
							type: 3,
							text: "完成图"
						},
						{
							type: 5,
							text: "申诉图"
						},
						{
							type: 6,
							text: "异常图"
						}
					],
					percent:0,
					selectindex:1,
					id:"",
					imageList: [],
					uploadImageList: []
				}
			},
			components: {
				uploadImage,
				customPopup
			},
			computed: {
				num() {
					console.log(this.uploadImageList.length)
					return this.uploadImageList.length
				}
			},
			methods: {
				// updataList(list) {
				// 	this.imageList = list
				// },
				choseItem(item) {
					this.selectindex = item.type
					this.getimglist()
				},
				//获取图片
				getimglist(){
					let opts = {
						url: '/api/order/images',
						method: 'get'
					}
					let params={
						order_id: this.id,
						type: this.selectindex,
					}
					this.$http.httpTokenRequest(opts,params).then(res => {
						if(res.data.code==200){
							this.uploadImageList = res.data.data
							this.imageList = res.data.data
						}else{
							uni.showToast({
								title:res.data.msg
							})
						}
					}, error => {
						uni.showToast({
							title:"上传错误！"
						})
					})
				},
				//图片上传提交
				imgsubmit(url){
					let opts = {
						url: '/api/order/image',
						method: 'post'
					}
					let params={
						order_id:this.id,
						type:this.selectindex,
						url:url
					}
					this.$http.httpTokenRequest(opts,params).then(res => {
						if(res.data.code==200){
							this.getimglist()
							uni.showToast({
								title:res.data.msg
							})
						}else{
							uni.showToast({
								title:res.data.msg
							})
						}
					}, error => {
						uni.showToast({
							title: "上传错误！"
						})
					})
				},

				// 图片上传
				chooseImage() {
					uni.chooseImage({
						count: 1,
						sizeType:['copressed'],
						success: (res) => {
							this.imageList = this.imageList.concat(res.tempFilePaths)
						},
						fail: (res) => {
							uni.showToast({
								icon: 'none',
								title: '错误！'
							})
						}
					})
				},
				//确认上传图片
				uploadImg() {
					let imgFiles = this.imageList.slice(this.uploadImageList.length)
					if (imgFiles.length === 0) {
						uni.showToast({
							icon: 'none',
							title: '您还没有选择图片！'
						})
						return null
					}
					if (this.imageList < 5) {
						uni.showToast({
							icon: 'none',
							title: '最多只能上传五张图片'
						})
						return null
					}
					const imgFile = [];
					imgFiles.forEach((item, index) => {
						imgFile.push({uri: item, name: `image[${index}]`})
					})
					this.$http.uploadimg(imgFile).then((res)=>{
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
				//删除图片
				deleteImage(index) {
					this.index = index
					this.open()
				},
				//关闭提示窗
				close() {
					this.$refs['popup'].close()
				},
				//打开提示窗
				open() {
					this.$refs['popup'].open()
				},
				//用户确认删除
				confirm() {
					this.close()
					this.imageList.splice(index, 1)
				}
		},
		onLoad: function (option) {
			this.id = option.id
			this.getimglist()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
	.order-img{
		width: 100%;
	}
	.image-upload{
		padding-bottom: 120rpx;
		.uni-list{
			padding: 20rpx;
			box-sizing: border-box;
			background-color: #fff;
			&:before{
				height: 0;
			}
		}
	}
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #E0E0E0;
		background-color: #fff;
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
	.next{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 120rpx;
		background:rgba(255,255,255,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	.next button{
		width: 100%;
		height: 80rpx;
		background:rgba(0,203,130,1);
		box-shadow:0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		line-height: 80rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.uni-uploader__file{
    position: relative;
    .delete_img{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
      width: 40rpx;
      height: 40rpx;
      background-image: url(../../static/img/other/shanchu.png);
      background-size: 100% 100%;
    }
  }
</style>