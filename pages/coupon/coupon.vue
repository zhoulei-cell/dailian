<template>
    <view class="content">
		<view>
			<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
			<view v-for="(item, index) in listData" :key="item.id" @tap="navtoDetail(item)">
			  <view class="item">
				 <view class="money">￥<text>6</text></view>
				<view class="item_left">
					<view class="title">{{item.title}}</view>
					<view class="dec">{{item.person}}</view>
					<view class="dec">有效期：{{item.time}}</view>
				</view>
				<view class="item_right">
					<button type="primary">立即使用</button>
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
				listData:[
					{
						title:"同城可接【排位】星耀五",
						person:"星耀五",
						money:"￥100.00",
						time:"1天1小时",
						cmoney:"100.00",
						dec:"同城可接【排位】星耀五同城可接【排位】星耀五星耀五星耀五星耀五星耀五",
						id:1
					},
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
		background: #fff;
	}
    .item{
	display: flex;	
	box-shadow: 1px 1px 1px 1px #E0E0E0;
	border-radius: 10rpx;
	box-sizing: border-box;
	overflow: hidden;
	margin-bottom: 20rpx;
	}
	.item .money{
		width: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: red; /* 浏览器不支持的时候显示 */
		background-image: linear-gradient(90deg, #0faeff, #b1e3fc); 
		color: #fff;
		border-right: 1px dashed #fff;
	}
	.item .money text{
		font-size: 80rpx;
	}
	.item .item_left{
		flex: 1;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.item .item_left .title{
		font-size: 28rpx;
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
		padding-right: 10rpx;
	}
	.item .item_right button{
		line-height: 60rpx;
		border-radius: 100rpx;
	}
</style>
