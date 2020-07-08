<template>
	<view class="chat-with">
		<scroll-view class="scroll" @scroll="scroll" :style="{height: scrollHeight+'px'}" :scroll-y="true" :show-scrollbar="false" :scroll-top="scrolltop" :scroll-with-animation="true">
			<view class="container">
				<block v-for="(list,index) in chatdata" :key="index">
					<!-- 不是自己发的消息 -->
					<template v-if="user.user.id !== list.user.id"> 
						<view class="chat-list-group">
							<view class="time">{{list.date}}</view>
							<view class="chat-box d-flex">
								<view class="chat-photo">
									<image :src="list.user.avatar || '../../static/img/qq.png'" mode="center"></image>
								</view>
								<view class="chat-content">
									<view class="chat-name text-overflow">{{list.user.name}}</view>
									<view class="chat-info">{{list.content}}</view>
								</view>
							</view>
						</view>
					</template>
					<!-- 自己发的消息 -->
					<template v-else>
						<view class="chat-list-group">
							<view class="time">{{list.date}}</view>
							<view class="chat-box d-flex jc-end">
								<view class="chat-content chat-content-me">
									<view class="chat-name chat-name-me text-overflow">{{user.user.name}}</view>
									<view class="chat-info">{{list.content}}</view>
								</view>
								<view class="chat-photo">
									<image :src="user.user.avatar || '../../static/img/qq.png'" mode="center"></image>
								</view>
							</view>
						</view>
					</template>
				</block>

			</view>
		</scroll-view>

		<view class="btn-box d-flex ai-center">
			<view class="left-box d-flex flex-1 ai-center">
				<input class="input flex-1" type="text" placeholder="请输入文字内容"  placeholder-class="place" v-model="content">
			</view>
			<view class="send" @tap="sendmessage">
				<view class="iconfont icon-fasong"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "",
				userinfo:{},
				chatdata:[],
				user: {},
				once: true,
				scrolltop: 0,
				scrollHeight: 0,
				scrollContentHeight: 0,
				tag: true
			};
		},
		methods: {
			sendmessage(){
				if(this.content==""){
					return false
				}
				uni.sendSocketMessage({
				  data: '{"type":"text","content":"'+this.content+'"}'
				});
				this.content=""
				this.tag = true
				this.scrollToBottom()
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
						  let msg=JSON.parse(res.data)
						  if(msg.type !== 'init' && msg !== "close"){
							  that.chatdata.push(JSON.parse(res.data))
						  }
					  }
					  that.$nextTick(function(){
					  	that.scrollToBottom()
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
			scrollToBottom() {
				let height = 0
				const query = uni.createSelectorQuery();
				query.selectAll('.chat-list-group').boundingClientRect(data => {
				  data.forEach(item => {
					  height += item.height
				  })
					if ( height > this.scrollHeight ) {
						if (this.tag) {
							this.scrolltop = height
						}
						//console.log("元素的："+(this.scrolltop - this.scrollHeight))
					}
				}).exec();
				return height
			},
			getHeight() {
				uni.getSystemInfo({
				    success: (res) => {
				        this.scrollHeight = res.windowHeight - uni.upx2px(108)
				    }
				})
			},
			scroll(e) {
				//console.log(this.scrollToBottom() - this.scrollHeight)
				//console.log("滚动的：" + e.detail.scrollTop)
				//console.log("距离的：" + this.scrolltop)
				if (e.detail.scrollTop == (this.scrollToBottom() - this.scrollHeight)) {
					this.tag = true
				} else {
					this.tag = false
				}
			}
		},
		onLoad() {
			this.getuserinfo()
			this.getHeight()
		},
		onReady() {
			this.scrollToBottom()
		},
		onUnload() {
			uni.closeSocket()
		},
		onBackPress(options) {  
			if (options.from === 'navigateBack') {  
					return false;  
			}  
			uni.switchTab({
				url: '/pages/main/main'
			})
			return true
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
	.chat-with{
		width: 100%;
		height: 100%;
		font-family: Microsoft YaHei;
		background-color: #f4f8fb;
		.uni-navbar{
			background-image: linear-gradient(90deg,rgba(255,115,80,1),rgba(253,182,150,1));
		}
		.scroll{
			.container{
				padding:0 20upx;
				.chat-list-group{
					padding: 25upx 0;
					.time{
						padding-bottom: 20upx;
						color: #999;
						font-size: 24upx;
						text-align: center;
						line-height: 24upx;
					}
					.chat-box{
						.chat-photo{
							flex-shrink: 0;
							image{
								display: block;
								width: 70upx;
								height: 70upx;
								border-radius: 50%;
							}
						}
						.chat-content{
							max-width: 480upx;
							padding-left: 20upx;
							&.chat-content-me{
								padding-left: 0;
								padding-right: 20upx; 
							}
							.chat-name{
								color: #999;
								font-size: 24upx;
								line-height: 24upx;
								padding-bottom: 20upx;
								&.chat-name-me{
									text-align: right;
								}
							}
							.chat-info{
								padding: 20upx;
								border-radius: 15upx;
								background-color: #fff;
								color: #000;
								word-wrap: break-word;
								font-size: 32upx;
								line-height: 42upx;
							}
						}
					}
				}
			}
		}
		.btn-box{
			height: 108upx;
			padding: 0 20upx 10upx;
			box-sizing: border-box;
			background-color: #fff;
			.left-box{
				height: 98upx;
				padding: 15upx;
				box-sizing: border-box;
				.input{
					font-size: 28upx;
					text-indent: 24upx;
					height: 100%;
					border-radius: 10upx;
					background-color: #f4f8fb;
				}
				.place{
					color: #aaa;
				}
			}
			.send{
				width: 120upx;
				height: 70upx;
				border-radius: 10upx;
				background-color: rgb(0, 203, 130);
				.iconfont{
					font-size: 50upx;
					font-weight: 400;
					color: #fff;
					text-align: center;
					line-height: 70upx;
				}
			}
		}
	}
</style>
