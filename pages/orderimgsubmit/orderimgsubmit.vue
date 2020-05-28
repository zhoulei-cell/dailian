<template>
    <view class="content">
		<view class="tab">
			<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
		</view>
		<view class="imglist">
			<view class="imgbox" v-for="(imglist,index) in imglist" :key="index">
				<image :src="imglist.full || imglist.url"></image>
			</view>
		</view>
        <button type="primary" @tap="cI">选择图片</button>
    </view>
</template>

<script>
    // 注册一个进度条
    var _self;
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
				imglist:[],
				selectindex:1,
				id:""
            }
        },
        methods: {
			choseItem(item) {
				this.selectindex = item.type
				this.getimglist()
			},
			//图片上传
            cI(){
				let _this=this;
                uni.chooseImage({
                    count: 1,
                    sizeType:['copressed'],
                    success(res) {
                        var imgFiles = res.tempFilePaths[0]
                        _this.$http.uploadimg(imgFiles).then((res)=>{
							var data=JSON.parse(res.data)
							_this.imglist = _this.imglist.concat(data.data)
							_this.imgsubmit(data.data[0].url)
							console.log(_this.imglist)
						})
                    }
                })
            },
			//获取图片
			getimglist(){
				let opts = {
					url: '/api/order/images',
					method: 'get'
				}
				let params={
					order_id:this.id,
					type:this.selectindex,
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						this.imglist=res.data.data
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
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
		onLoad: function (option) {
			console.log(option.id)
			this.id=option.id
			this.getimglist()
		}
    }
</script>

<style>
	.content{
		padding: 0;
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
</style>