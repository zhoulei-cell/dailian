<template>
    <view class="content">
		<view class="tab">
			<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
		</view>
		<view>
			<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
			<view v-for="(item, index) in listData" :key="item.id" @tap="navtoDetail(item)">
			  <view class="item">
				<view class="item_left">
					<view class="title">{{item.title}}</view>
					<view class="dec">发布者：{{item.person}}</view>
					<view class="dec">保证金：{{item.cmoney}} 总时间：{{item.time}}</view>
				</view>
				<view class="item_right">
					{{item.money}}
				</view>
			  </view>
			</view>
	  </view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
		data() {
			return {
				selectindex:0,
				ordertype:[
					{
						type:0,
						text:"全部"
					},
					{
						type:1,
						text:"代练中"
					},
					{
						type:2,
						text:"异常中"
					},
					{
						type:3,
						text:"待验收"
					},
					{
						type:4,
						text:"已结算"
					}
				],
				listData:[
					{
						title:"同城可接【排位】星耀五",
						person:"星耀五",
						money:"￥100.00",
						time:"1天1小时",
						cmoney:"100.00",
						dec:"同城可接【排位】星耀五同城可接【排位】星耀五星耀五星耀五星耀五星耀五",
						id:1
					}
				]
			}
		},
		components: {
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        onLoad() {
            
        },
		result(val) {
			console.log('filter_result:' + JSON.stringify(val));
		},
		methods:{
			navtoDetail(item){
				uni.navigateTo({
				    url: '/pages/orderinfo/orderinfo'
				});
			},
			choseItem(item){
				this.selectindex=item.type
			}
		}
    }
</script>

<style>
	.elis{
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.content{
		padding: 0;
		background: #fff;
	}
    .item{
	display: flex;	
	border-bottom: 1px solid #E0E0E0;
	padding: 20rpx;
	}
	.item .item_left{
		flex: 1;
	}
	.item .item_left .title{
		font-size: 30rpx;
		font-weight: bold;
	}
	.item .item_left .dec{
		font-size: 24rpx;
		color: #999999;
		line-height: 36rpx;
	}
	.item .item_right{
		color: red;
		font-size: 36rpx;
		font-weight: bold;
		padding-left: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tab{
		display: flex;
		width: 100%;
		border-bottom: 1px solid #E0E0E0;
	}
	.tab .tabitem{
		flex: 1;
		line-height: 60rpx;
		text-align: center;
	}
	.tab .tabitem.check{
		color: #0000FF;
	}
</style>
