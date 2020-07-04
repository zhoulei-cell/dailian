<template>
	<view class="content">
		<view class="line">
			申诉金额：{{orderinfo.amount}}
		</view>
		<view class="line">
			申诉原因：{{items[orderinfo.reason].name}}
		</view>
		<view class="line">
			申诉描述：{{orderinfo.description}}
		</view>
		<view class="line">
			申诉时间：{{orderinfo.created_at}}
		</view>
		<view class="title">
			<text>申诉图片：</text>
		</view>
		<view class="imglist">
			<view class="imgbox" v-for="(imglist,index) in orderinfo.images" :key="index">
				<image :src="imglist.full || imglist.url"></image>
			</view>
		</view>
		<view class="title">
			<text>申诉聊天：</text>
		</view>
		<view class="reviwelist">
			<view class="reviweitem" v-for="(re,index) in orderinfo.match.appeal_chat" :key="index">
				<view class="line2 red" v-if="re.user">{{re.user.name || '无用户名'}}</view>
				<view class="line2">{{re.content}}</view>
				<view class="imglist">
				<view class="imgbox" v-for="(imglist,index) in re.images" :key="index">
					<image :src="imglist"></image>
				</view>
				</view>
			</view>
		</view>
		<view class="title">
			<text>我要发言：</text>
		</view>
		<view class="textinput">
			<input type="text" value="" placeholder="请输入" v-model="reviwe"/>
		</view>
		<view class="title">
			<text>凭证截图：</text>
			<button type="primary" @tap="cI">上传图片</button>
		</view>
		<view class="imglist">
			<view class="imgbox" v-for="(imglist,index) in imglist" :key="index">
				<image :src="imglist.full || imglist.url"></image>
			</view>
		</view>
		<view class="btn">
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
						name: '账号密码不对'
					},
					{
						value: '1',
						name: '联系不到号主',
						checked: 'true'
					},
					{
						value: '2',
						name: '号主顶号'
					},
					{
						value: '3',
						name: '账号被禁号不能登录游戏'
					},
					{
						value: '4',
						name: '游戏账号/角色被封停'
					},
					{
						value: '5',
						name: '订单信息和描述不符'
					},
					{
						value: '6',
						name: '账号防沉迷无法代练'
					},
					{
						value: '7',
						name: '其他原因'
					},
				],
				current: 0,
				orderid:0,
				orderinfo:{
					images:[],
					appeal_chat:[]
				},
				imglist:[],
				reviwe:"",
				appeals:'',
				ssid:''
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
			            var imgFiles = res.tempFilePaths[0]
			            _this.$http.uploadimg(imgFiles).then((res)=>{
							var data=JSON.parse(res.data)
							_this.imglist = _this.imglist.concat(data.data)
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
			// 获取申诉详情
			getdetal(){
				let opts = {
					url: '/api/match/appeal/show',
					method: 'get'
				}
				let params={
					appeal_id:this.ssid,
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					this.orderinfo=res.data
				}, error => {
					console.log(error);
				})
			},
			// 提交申诉
			submit(){
				let opts = {
					url: '/api/match/appeal/chat/send',
					method: 'post'
				}
				let newarr=[]
				for(var i=0;i<this.imglist.length;i++){
					newarr.push(this.imglist[i].url)
				}
				let params={
					content:this.reviwe,
					match_id:this.appeals,
					images:newarr
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						this.getdetal()
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
			this.appeals=option.orderid
			this.ssid=option.id
		},
		onShow() {
			this.getdetal()
		}
	}
</script>

<style>
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
	width: 100rpx;
	height: 50rpx;
	line-height: 50rpx;
	font-size: 20rpx;
}
.textarea{
	width: 100%;
	
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
.line2{
	font-size: 24rpx;
	color: #666;
	line-height: 40rpx;
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
.textinput input{
	border: 1rpx solid #E0E0E0;
	height: 80rpx;
	line-height: 80rpx;
	text-indent: 10rpx;
}
.red{
	color: red;
}
</style>
