<template>
	<view class="chat-with">
		<scroll-view class="scroll" :scroll-y="true">
			<view class="container">
				<view class="chat-list-group">
					<view class="chat-time">2019-04-15 15:32</view>
					<view class="chat-content d-flex ai-center">
						<view class="chat-photo"></view>
						<view class="chat-info">你有多少货，货好的话我全要了。</view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time" v-if="false">2019-04-15 15:32</view>
					<view class="chat-content d-flex ai-center jc-end">
						<view class="chat-info my-info">要多少有多少，都是好货</view>
						<view class="chat-photo my-chat"></view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time">2016-04-15 15:56</view>
					<view class="chat-content d-flex ai-center">
						<view class="chat-photo"></view>
						<view class="chat-info">23号在九龙港码头交易，你一个人来。</view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time" v-if="false">2019-04-15 15:32</view>
					<view class="chat-content d-flex ai-center jc-end">
						<view class="chat-info my-info">可以带家伙吗...</view>
						<view class="chat-photo my-chat"></view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time" v-if="false">2016-04-15 15:56</view>
					<view class="chat-content d-flex ai-center">
						<view class="chat-photo"></view>
						<view class="chat-info">随便你，我反正带了。</view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time">2016-04-15 16:32</view>
					<view class="chat-content d-flex ai-center jc-end">
						<view class="chat-info my-info">好...23号见，带好现金，我只收人民币</view>
						<view class="chat-photo my-chat"></view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time" v-if="false">2016-04-15 15:56</view>
					<view class="chat-content d-flex ai-center">
						<view class="chat-photo"></view>
						<view class="chat-info">随便你，我反正带了。</view>
					</view>
				</view>

				<view class="chat-list-group">
					<view class="chat-time">2016-04-15 16:32</view>
					<view class="chat-content d-flex ai-center jc-end">
						<view class="chat-info my-info">好...23号见，带好现金，我只收人民币</view>
						<view class="chat-photo my-chat"></view>
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
					<input type="text" placeholder="请输入文字内容" placeholder-style="color: #aaa">
				</view>
			</view>
			<view class="send">发送</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "包小花"
			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #eee;
	}
	.chat-with{
		font-family: Microsoft YaHei;
		.uni-navbar{
			background-image: linear-gradient(90deg,rgba(255,115,80,1),rgba(253,182,150,1));
		}
		.scroll{
			position: fixed;
			top: 90rpx;
			bottom: 91rpx;
			left: 0;
			width: 100%;
			padding: 0 30rpx 10rpx;
			box-sizing: border-box;
			.container{
				padding-bottom: 20rpx;
				.chat-list-group{
					padding-top: 60rpx;
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
			bottom: 0;
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
						line-height: 79rpx;
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
