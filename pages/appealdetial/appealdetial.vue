<template>
	<view class="content">
		<view class="wrapper">
			<view class="title" style="margin-top: 0;">
				代练申诉订单信息
			</view>
			<view class="line">订单编号：{{orderinfo.order.order_no}}</view>
			<view class="line">订单标题：{{orderinfo.order.title}}</view>
			<view class="title">
				申述类型及详情
			</view>
			<view class="uni-list">
				<view class="line">发起人：{{orderinfo.user.name ||　orderinfo.user.phone}}</view>
				<view class="line">发起时间：{{orderinfo.created_at}}</view>
				<view class="line">申诉类型：{{items[orderinfo.type].name}}</view>
			</view>
			<view class="title">
				问题希望及其描述：
			</view>
			<view class="textarea">
				<textarea value="" placeholder="请输入问题希望及其描述" v-model="orderinfo.desc" />
				</view>
			<view class="title">
				<text>凭证截图：</text>
				<!-- <button type="primary" @tap="cI">上传图片</button> -->
			</view>
			<view class="imglist">
				<view class="imgbox" v-for="(imglist,index) in orderinfo.order.images" :key="index">
					<image :src="imglist.full || imglist.url"></image>
				</view>
			</view>
			<view class="title">
				客户处理列表
			</view>
			<view class="reviwelist">
				<view class="reviweitem" v-for="(re,index) in orderinfo.order_appeal_chat" :key="index">
					<view class="time">
						{{re.created_at}}
					</view>
					<view class="line2 red">{{re.username || '无用户名'}}</view>
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
				<input type="text" placeholder="请输入" v-model="reviwe"/>
			</view>
			<view class="title">
				<text>凭证截图：</text>
				<button type="primary" @tap="cI">上传图片</button>
			</view>
			<view class="imglist img-list">
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
					order:{},
					user:{},
					type:0,
					order_appeal_chat:[
						{
							user:{}
						}
					]
				},
				imglist:[],
				reviwe:"",
				appeals:''
			}
		},
		onNavigationBarButtonTap() {
			this.getdetal()
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
							var data=JSON.parse(res.data)
							_this.imglist = _this.imglist.concat(data.data)
						})
					}
				})
			},
			//图片上传提交
			imgsubmit(url){
				let opts = {
					url: '/api/order/image',
					method: 'post'
				}
				let params={
					order_id:this.orderinfo.id,
					type:5,
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
					url: '/api/order/appeal/view',
					method: 'get'
				}
				let params={
					id: this.appeals,
				}
				console.log(this.appeals)
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						this.orderinfo=res.data.data
						console.log(this.orderinfo)
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			// 提交申诉
			submit(){
				let opts = {
					url: '/api/order/appeal/sendchat',
					method: 'post'
				}
				let newarr=[]
				for(var i=0;i<this.imglist.length;i++){
					newarr.push(this.imglist[i].url)
				}
				let params={
					content:this.reviwe,
					appeal_id:this.orderinfo.id,
					images:newarr
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							icon:'none',
							title:res.data.msg
						})
						this.imglist=[]
						this.reviwe = ""
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
			this.appeals=JSON.parse(option.item).appeals
			console.log(this.appeals)
			if(option.type){
				this.items=[
					{
						value: '0',
						name: '我要退订单'
					},
					{
						value: '1',
						name: '超时完成'
					},
					{
						value: '2',
						name: '毁星掉段'
					},
					{
						value: '3',
						name: '战绩差'
					},
					{
						value: '4',
						name: '私自动用账号物品'
					},
					{
						value: '5',
						name: '虚假提交'
					},
					{
						value: '6',
						name: '游戏账号被封'
					},
					{
						value: '7',
						name: '进度慢'
					},
					{
						value: '8',
						name: '其他问题'
					}
				]
			}
			this.getdetal()
		}
	}
</script>

<style>
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
	.img-list{
		min-height: 250rpx;
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
	.textinput input{
		border: 1rpx solid #E0E0E0;
		height: 80rpx;
		font-size: 24rpx;
		line-height: 80rpx;
		text-indent: 20rpx;
	}
	.red{
		color: red;
	}
	.time{
		font-size: 20rpx;
		color: #BEBEBE;
		text-align: center;
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
