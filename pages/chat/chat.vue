<template>
	<view class="chat-with">
		<scroll-view class="scroll" :style="{height: scrollHeight+'px'}" :scroll-y="true" :show-scrollbar="false" :scroll-top="scrolltop" :scroll-with-animation="true">
			<view class="container" id="scroll">
				<view v-for="(list,index) in chatdata" :key="index">
					<view class="chat-list-group" v-if="user.user.id==list.user.id">
						<view class="chat-time" >{{list.date}}</view>
						<view class="chat-content d-flex ai-center jc-end">
							<view class="chat-info my-info">{{list.content||'来啦'}}</view>
							<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
								<view class="chat-photo my-chat"> <image :src="user.user.avatar" mode="widthFix"></image> </view>
								<view style="color: #333;font-size: 20rpx;text-align: center;">{{user.user.name}}</view>
							</view>
						</view>
					</view>
					<view class="chat-list-group" v-else>
						<view class="chat-time">{{list.date}}</view>
						<view class="chat-content d-flex ai-center">
							<view class="chat-photo">  <image :src="user.user.avatar" mode="widthFix"></image>  </view>
							<view class="chat-info">{{list.content||'来啦'}}</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="btn-box d-flex ai-center">
			<view class="left-box d-flex flex-1 ai-center">
				<view class="voice">
					<image src="../../static/img/chat/voice.png"></image>
				</view>
				<view class="enter flex-1">
					<input type="text" placeholder="请输入文字内容" placeholder-style="color: #aaa" v-model="content">
				</view>
			</view>
			<view class="send" @tap="sendmessage">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "包小花",
				content:"",
				userinfo:{},
				chatdata:[],
				user:{},
				once:true,
				scrolltop:0,
				scrollHeight: 0
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			sendmessage(){
				if(this.content==""){
					return false
				}
				uni.sendSocketMessage({
				  data: '{"type":"text","content":"'+this.content+'"}'
				});
				this.content=""
			},
			// 获取用户信息
			getuserinfo(){
				let opts = {
					url: '/api/getUserInfo',
					method: 'get'
				}
				let param = {
					
				}
				this.$http.httpTokenRequest(opts,param).then(res => {
					const that=this
					this.userinfo = res.data.data
					uni.connectSocket({
					    url: 'ws://'+this.$http.baseUrl+':9511?id='+this.userinfo.id+'',
					    header: {
					        'Upgrade': 'websocket',
							'Connection': 'Upgrade'
					    },
						success:function(e){
							console.log(e)
						},
						fail:function(e){
							console.log(e)
						}
					})
					uni.onSocketMessage(function (res) {
					  if(that.once){
						  that.user=JSON.parse(res.data)
						  // that.chatdata.push(JSON.parse(res.data))
						  that.once=false
					  }else{
						  that.chatdata.push(JSON.parse(res.data))
						  
					  }
					  that.$nextTick(function(){
					  	that.getContainerHeight()
					  })
					});
					uni.onSocketOpen(function (res) {
					  console.log('WebSocket连接已打开！');
					});
					uni.onSocketError(function (res) {
					  console.log('WebSocket连接打开失败，请检查！');
					});
				})
			},
			getContainerHeight() {
				let height = 0
				const query = uni.createSelectorQuery();
				query.selectAll('.chat-list-group').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  data.forEach(item => {
					  height += item.height
				  })
				  this.scrolltop = height
				  console.log("高度" + this.scrolltop)
				}).exec();
			},
			getHeight() {
				uni.getSystemInfo({
				    success: (res) => {
				        this.scrollHeight = res.windowHeight - uni.upx2px(98)
				    }
				})
			}
		},
		onLoad() {
			this.getuserinfo()
			this.getHeight()
		},
		onReady() {
			this.getContainerHeight()
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #eee;
	}
	.chat-with{
		width: 100%;
		font-family: Microsoft YaHei;
		.uni-navbar{
			background-image: linear-gradient(90deg,rgba(255,115,80,1),rgba(253,182,150,1));
		}
		.scroll{
			.container{
				.chat-list-group:nth-child(1){
					padding-top: 60rpx;
				}
				.chat-list-group{
					padding-bottom: 60rpx;
					.chat-time{
						font-size: 26rpx;
						font-weight: 400;
						color:rgba(170,170,170,1);
						line-height: 35rpx;
						text-align: center;
						opacity: 0.5;
					}
					.chat-content{
						.chat-photo{
							width: 91rpx;
							height: 91rpx;
							margin-right: 16rpx;
							border-radius: 50%;
							background-color: #fd7651;
							display: flex;
							justify-content: center;
							align-items: center;
							image{
								width: 100%;
							}
							&.my-chat{
								margin-right: 0;
								margin-left: 16rpx;
								background-color: #fdc750;
							}
						}
						.chat-info{
							flex-shrink: 0;
							max-width: 490rpx;
							padding: 19rpx 35rpx;
							border-radius: 20rpx;
							box-sizing: border-box;
							background-image: linear-gradient(202deg,rgba(253,115,78,1),rgba(253,154,122,1));
							font-size: 28rpx;
							font-weight: 400;
							color:rgba(255,255,255,1);
							line-height: 35rpx;
							&.my-info{
								background-image: none;
								background-color: #F1F1F1;
								color:rgba(102,102,102,1);
							}
						}
					}
				}
			}
		}
		.btn-box{
			position: fixed;
			left: 0;
			/* #ifdef APP-PLUS */
			bottom: 0rpx;
			/* #endif */
			/* #ifndef APP-PLUS */
			bottom: 98rpx;
			/* #endif */
			width: 100%;
			height: 98rpx;
			.left-box{
				height: 100%;
				background-color: #fff;
				.voice{
					padding: 0 40rpx;
					image{
						display: block;
						width: 27rpx;
						height: 45rpx;
					}
				}
				.enter{
					input{
						font-size: 28rpx;
						font-weight: 400;
						color: #000;
					}
				}
			}
			.send{
				width: 162rpx;
				height: 98rpx;
				background-image: linear-gradient(202deg,rgba(253,115,78,1),rgba(253,154,122,1));
				font-size: 30rpx;
				font-weight: 400;
				color:rgba(255,254,254,1);
				text-align: center;
				line-height: 98rpx;
			}
		}
	}
</style>
