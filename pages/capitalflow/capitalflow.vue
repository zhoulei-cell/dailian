<template>
	<view class="content">
		<!-- <view class="tab">
			<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
		</view> -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"  @scrolltolower="lower" :lower-threshold="threshold" style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;background: #F4F5F6;" refresher-enabled="true"
		 :refresher-triggered="triggered" :refresher-threshold="50" @refresherrefresh="onRefresh"
		 @refresherrestore="onRestore">
			
				<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
				<view v-for="(item, index) in listData" :key="item.id">
					<view class="item">
						<view class="line">金额：{{item.amount}}</view>
						<view class="line">类型：{{item.financial_type}}</view>
						<view class="line">资金类型：{{item.type}}</view>
						<view class="line">时间：{{item.created_time}}</view>
					</view>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				listData: [],
				page: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				threshold: "50px",
				loadmore: true,
				triggered: false
			}
		},
		
		methods: {
			async onRefresh() {
				this.triggered = true
				this.loadmore = true
				this.page = 1
				await this.getorderlist()
				this.triggered = false
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
			},
			// 获取资金流水
			getorderlist() {
				let opts = {
					url: '/api/finance/capital/record',
					method: 'get'
				}
				let params = {
					page: this.page
				}
				return this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						const data = res.data.data
						if (data.per_page > data.data.length) {
							this.loadmore = false
						}
						if(this.page==1){
							this.listData = data.data
						}else{
							this.listData.push(...data.data)
						}
					}
				}, error => {
					uni.showToast({
						icon: 'none',
						title: '获取数据失败，请稍后重试'
					})
				})
			},
			// 下拉加载
			lower: function(e) {
				if(this.loadmore){
					this.page++
					this.getorderlist()
				}
			}
		},
		onLoad() {
			this.getorderlist()
		}
	}
</script>

<style>
	.elis {
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		word-wrap: break-word;
		white-space: normal !important;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}

	.content {
		padding: 0;
		background: #fff;
	}

	.item {
		border-bottom: 1px solid #E0E0E0;
		padding: 20rpx;
		background: #fff;
	}

	.item .item_left {
		flex: 1;
	}

	.item .item_left .title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.item .item_left .dec {
		font-size: 24rpx;
		color: #999999;
		line-height: 36rpx;
	}

	.item .item_right {
		color: red;
		font-size: 36rpx;
		font-weight: bold;
		padding-left: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px solid #E0E0E0;
	}

	.tab .tabitem {
		flex: 1;
		line-height: 60rpx;
		text-align: center;
	}

	.tab .tabitem.check {
		color: #0000FF;
	}

	.ordertop {
		display: flex;
		border-bottom: 2rpx solid #E0E0E0;
		padding: 10rpx 20rpx;
		background: #fff;
	}

	.ordertop_left {
		color: #666;
		font-size: 24rpx;
		flex: 1;
	}

	.ordertop_right {
		font-size: 24rpx;
	}

	.red {
		color: red;
		font-size: 24rpx;
	}
	.orderbtn{
		display: flex;
		background: #fff;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}
	.orderbtn_left{
		flex: 1;
	}
	.orderbtn_right{
		display: flex;
	}
	.orderbtn_right button{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 12px;
		margin-left: 10rpx;
	}
	.line{
		font-size: 24rpx;
	}
</style>
