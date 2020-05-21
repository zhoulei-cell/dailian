<template>
    <view class="content">
		<sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter>
        <navigator url="/pages/arenadetial/arenadetial">
			<view class="item">
				<view class="titleline">
					<view class="titleleft">
						<view class="titletag">星耀</view>
						房号：7632
					</view>
					<text>待应战</text>
				</view>
				<view class="dec">
					<view class="line">应战区服：QQ</view>
					<view class="linet">胜者奖金<text class="red">￥19.00</text></view>
				</view>
			</view>
		</navigator>
		<view class="item">
			<view class="titleline">
				<view class="titleleft">
					<view class="titletag">星耀</view>
					房号：7632
				</view>
				<text>待应战</text>
			</view>
			<view class="dec">
				<view class="line">应战区服：QQ</view>
				<view class="linet">胜者奖金<text class="red">￥19.00</text></view>
			</view>
		</view>
		<view class="item">
			<view class="titleline">
				<view class="titleleft">
					<view class="titletag">星耀</view>
					房号：7632
				</view>
				<text>待应战</text>
			</view>
			<view class="dec">
				<view class="line">应战区服：QQ</view>
				<view class="linet">胜者奖金<text class="red">￥19.00</text></view>
			</view>
		</view>
		<view class="btn">
			<navigator url="/pages/releasepk/releasepk" class="publicbtn">
				<view>发布对战</view>
			</navigator>
			<!-- <view class="mybtn">我的角色</view> -->
		</view>
    </view>
</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
    export default {
        components: {
			slFilter
        },
        data() {
            return {
				themeColor: '#000000',
				titleColor: '#666666',
				filterResult: '',
				menuList: [{
						'title': '游戏服务区',
						'detailTitle': '请选择职位类型（可多选）',
						'isMutiple': true,
						'key': 'jobType',
						'defaultSelectedIndex': [1,2,5],
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': 'uni-app',
								'value': 'uni-app'
							},
							{
								'title': 'java开发',
								'value': 'java'
							},
							{
								'title': 'web开发',
								'value': 'web'
							},
							{
								'title': 'Android开发',
								'value': 'Android'
							},
							{
								'title': 'iOS开发',
								'value': 'iOS'
							},
							{
								'title': '测试工程师',
								'value': '测试'
							},
							{
								'title': 'UI设计',
								'value': 'UI'
							},
							{
								'title': 'Ruby开发',
								'value': 'Ruby'
							},
							{
								'title': 'C#开发',
								'value': 'C#'
							},
							{
								'title': 'PHP开发',
								'value': 'php'
							},
							{
								'title': 'Python开发',
								'value': 'Python'
							}
						]
						
					},
					{
						'title': '综合排行',
						'key': 'salary',
						'isMutiple': true,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '0~2000',
								'value': '0~2000'
							},
							{
								'title': '2000~3000',
								'value': '2000~3000'
							},
							{
								'title': '3000~4000',
								'value': '3000~4000'
							},
							{
								'title': '4000~5000',
								'value': '4000~5000'
							},
							{
								'title': '5000~6000',
								'value': '5000~6000'
							},
							{
								'title': '6000~7000',
								'value': '6000~7000'
							},
							{
								'title': '7000~8000',
								'value': '7000~8000'
							},
							{
								'title': '8000~9000',
								'value': '8000~9000'
							},
							{
								'title': '9000~10000',
								'value': '9000~10000'
							},
							{
								'title': '10000以上',
								'value': '10000~1000000'
							}
						]
						
					},{
						'title': '高级筛选',
						'key': 'salary',
						'isMutiple': true,
						'detailList': [{
								'title': '不限',
								'value': ''
							},
							{
								'title': '0~2000',
								'value': '0~2000'
							},
							{
								'title': '2000~3000',
								'value': '2000~3000'
							},
							{
								'title': '3000~4000',
								'value': '3000~4000'
							},
							{
								'title': '4000~5000',
								'value': '4000~5000'
							},
							{
								'title': '5000~6000',
								'value': '5000~6000'
							},
							{
								'title': '6000~7000',
								'value': '6000~7000'
							},
							{
								'title': '7000~8000',
								'value': '7000~8000'
							},
							{
								'title': '8000~9000',
								'value': '8000~9000'
							},
							{
								'title': '9000~10000',
								'value': '9000~10000'
							},
							{
								'title': '10000以上',
								'value': '10000~1000000'
							}
						]
						
					}
				],
				
            }
        },
        methods: {
            result(val) {
            	console.log('filter_result:' + JSON.stringify(val));
            },
        },
        onReady() {
        }
    }
</script>

<style>
    .item{
		padding: 20rpx;
		border-radius: 10rpx;
		background: #fff;
		margin-top: 20rpx;
	}
	.titleline{
		display: flex;
		border-bottom: 1px solid #E0E0E0;
		padding-bottom: 20rpx;
	}
	.titleline text{
		color: red;
	}
	.titleleft{
		flex: 1;
		display: flex;
		color: #666666;
	}
	.titletag{
		background: #929292;
		color: #fff;
		width: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 0 10rpx 10rpx 0 ;
		margin-right: 10rpx;
	}
	.dec .line{
		color: #666;
		font-size: 24rpx;
	}
	.dec .linet{
		color: #333;
		font-size: 28rpx;
	}
	.red{
		color: red;
	}
	.btn {
		display: flex;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	.btn .publicbtn{
		background-color: red;
		color: #fff;
		font-size: 36rpx;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.btn .mybtn{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 36rpx;
		background-color: yellow;
	}
</style>
