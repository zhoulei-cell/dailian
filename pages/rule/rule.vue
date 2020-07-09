<template>
	<view class="rule">
		<view class="card-wrap">
			<view class="card">
				<view class="title">一、对战发布规则</view>
				<view class="desc-box">
					<view class="desc">1、目前仅可发布一种对战模式:王者荣耀墨家机关道1V1</view>
					<view class="desc">2、王者荣耀墨家机关道1V1胜利条件:摧毁敌方水晶</view>
					<view class="desc">3、发布对战后如无人应战可自行取消对战，对局金额返还到战狼电竞对应账户;</view>
					<view class="desc">4、若有人应战并缴纳对局费(包含5%服务费)进入准备状态，我们将会通过短信通知您。</view>
					<view class="desc">5、若您与应战者任一方点击“开始游戏”按钮，我们    将以短信的形式通知对方，若对方在30分钟内并未点击“开始对局”进入下一状态，则扣除失约者一半对局费用归守信者;</view>
					<view class="desc">6、若双方都处于准备状态，无人点击“开始游戏”则30分钟后此局对战自动取消，应战方对战金额全额退还房间保留;</view>
					<view class="desc">7、双方均点击“开始游戏”后表示双方已进入游戏开始对局，2小时后无人上传赛果，此次对战流局，对局费归还双方战狼电竞服务费的合计)</view>
				</view>
			</view>
		</view>
		
		<view class="card-wrap">
			<view class="card">
				<view class="title">二、对战应战规则</view>
				<view class="desc-box">
					<view class="desc">1、您可根据对战大厅中等待对战的房间信息选择房间进行应战;</view>
					<view class="desc">2、应战前请仔细确认房间信息，- -旦进入房间缴纳对局费用(包含5%服务费)后则视为应战成功，不能以任何理由退出对局，只能如约完成对战;</view>
					<view class="desc">3、应战并缴纳对局费用后您和房主将自动进入准备状态，我们将会通过短信通知房主前来应战;</view>
					<view class="desc">4、若双方都处于准备状态，无人点击“开始对局”则1小时后此局对战自动流局，对局费用扣除服务费后归还双方战狼电竞账户;</view>
					<view class="desc">5、若您与应战者任一-方 点击“开始对局”按钮，我们将已短信的形式通知对方，若对方在10分钟内并未点击"开始对局"进入下一状态，则扣除失约者-半对局费用归守信者;</view>
					<view class="desc">6、双方均点击'开始对局”后表示双方已进入游戏开始对局，3小时后无人上传赛果，几次对战流局，对局费扣除服务费后归还双方战狼电竞账户;</view>
					<view class="desc">7、对局结束后，一方已.上传赛果，若另-方3小时内无赛果反馈，则赛果按照上传方结果判定;</view>
					<view class="desc">8、若对对局胜负有任何异议，可以通过客服进行仲裁，但客服仲裁需要扣除仲裁败方- -定 的仲裁费用;</view>
					<view class="desc">9、对局结束后，胜利方将获得对方的对局费用作为奖励.(扣除服务费后的金额;房间展示的奖金为扣除服务费后双方服务费的合计)</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f8fb;
	}
	.rule{
		.card-wrap{
			padding: 20rpx;
			.card{
				padding: 20rpx;
				border-radius: 15rpx;
				background-color: #fff;
				.title{
					padding: 20rpx 0;
					border-bottom: 1rpx solid #eee;
					color: #333;
					font-size: 28rpx;
					line-height: 28rpx;
				}
				.desc-box{
					padding-top: 20rpx;
					.desc{
						color: #999;
						font-size: 24rpx;
					}
				}
			}
		}
	}
</style>
