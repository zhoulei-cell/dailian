<template>
	<view class="content">
		<view class="wrapper">
			<view class="title">
				申诉金额
			</view>
			<view class="textarea" style="padding: 10rpx;">
				<input type="text" placeholder="请输入申述金额" v-model="amount"/>
			</view>
			<view class="title">
				申类型及详情
			</view>
			<view class="uni-list">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index === current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</view>
			<view class="title">
				问题希望及其描述：
			</view>
			<view class="textarea">
				<textarea value="" placeholder="请输入问题希望及其描述" v-model="desc"/>
			</view>
			<view class="title">
				<text>凭证截图：</text><button size="default" type="primary" @tap="cI">上传图片</button>
			</view>
			<view class="imglist">
				<view class="imgbox" v-for="(imglist,index) in imglist" :key="index">
					<image :src="imglist.full || imglist.url"></image>
				</view>
			</view>
		</view>
		<view class="next">
			<button type="default" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '0',
						name: '作弊'
					},
					{
						value: '1',
						name: '其他原因'
					},
				],
				current: 0,
				orderid:0,
				info:{},
				match_id:'',
				amount:'',
				imglist:[],
				desc:'',
				imgdata:[]
			}
		},
		methods: {
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
							_this.imglist = _this.imglist.concat(data.data)
							//_this.imgsubmit(data.data[0].url)
							_this.imgdata.push(data.data[0].url)
						})
					}
				})
			},
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			// 提交申诉
			submit(){
				let opts = {
					url: '/api/match/appeal',
					method: 'post'
				}
				let type = this.items[this.current].value
				let params = {
					match_id: this.match_id,
					reason: type,
					description: this.desc,
					amount: this.amount,
					images: String(this.imgdata)
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
					}
				}, error => {
					uni.showToast({
						icon: 'none',
						title: '提交申述失败'
					})
				})
			}
		},
		onLoad: function (option) {
			this.match_id = option.id
		}
	}
</script>

<style lang="scss">
	.content .wrapper{
		padding-bottom: 120rpx;
	}
	.btn{
		padding-top: 50rpx;
	}
	.title{
		background: #E0E0E0;
		color: #333;
		font-weight: bold;
		font-size: 24rpx;
		padding: 10rpx;
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}
	.title text{
		flex: 1;
	}
	.title button{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 20rpx;
	}
	.textarea{
		width: 100%;
		input{
			font-size: 24rpx;
		}
	}
	.textarea textarea{
		box-sizing: border-box;
		height: 300rpx;
		border: 1rpx solid #E0E0E0;
		width: 100%;
		padding: 10rpx;
		font-size: 24rpx;
	}
	.line{
		font-size: 24rpx;
		color: #666;
		line-height: 60rpx;
	}
	.imglist{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		box-sizing: border-box;
		width: 100%;
		min-height: 250rpx;
		padding: 20rpx;
		border: 1rpx solid #E0E0E0; 
	}
	.imgbox{
		width: 330rpx;
		height: 330rpx;
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
