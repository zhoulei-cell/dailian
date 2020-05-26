<template>
	<view class="content">
		<view class="tab">
			<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"  @scrolltolower="lower" :lower-threshold="threshold" style="position: absolute;top: 68rpx;left: 0;right: 0;bottom: 0;background: #F4F5F6;">
			
				<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
				<view v-for="(item, index) in listData" :key="item.id" @tap="navtoDetail(item)">
					<view class="ordertop">
						<view class="ordertop_left">订单编号：{{item.order_no}}</view>
						<view class="ordertop_right red">{{ordertext[item.order_status]}}</view>
					</view>
					<view class="item">
						<view class="item_left">
							<view class="title">{{item.title}}</view>
							<view class="dec">游戏账号：{{item.game_account}}</view>
							<view class="red">保证金：{{item.promise_price}} 发布时间：{{item.created_at}}</view>
						</view>
						<view class="item_right">
							{{item.price}}
						</view>
					</view>
					<view class="orderbtn">
						<view class="orderbtn_left"></view>
						<view class="orderbtn_right">
							<button @tap.stop="cancelorder(item,index)" v-if="item.order_status!=6">取消订单</button>
							<button @tap.stop="updateorder(item,index)" v-if="item.order_status!=6">修改订单</button>
						</view>
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
				selectindex: 0,
				ordertype: [{
						type: 0,
						text: "全部"
					},
					{
						type: 1,
						text: "发布中"
					},
					{
						type: 2,
						text: "代练中"
					},
					{
						type: 3,
						text: "待验收"
					},
					{
						type: 4,
						text: "已结算"
					}
				],
				listData: [],
				page: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				threshold:"50px",
				loadmore:true,
				ordertext:['关闭','待接单','代练中','异常中','待验收','已结算','取消']
			}
		},
		components: {},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {

		},
		result(val) {
			console.log('filter_result:' + JSON.stringify(val));
		},
		methods: {
			navtoDetail(item) {
				uni.navigateTo({
					url: '/pages/orderinfo/orderinfo?id='+item.id
				});
			},
			choseItem(item) {
				this.selectindex = item.type
			},
			// 获取订单列表
			getorderlist() {
				let opts = {
					url: '/api/order/get_user_orders',
					method: 'get'
				}
				let params = {
					page: this.page
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						if(res.data.data.data.length>0){
							if(this.page==1){
								this.listData = res.data.data.data
							}else{
								this.listData.concat(this.listData,res.data.data.data)
							}
						}else{
							this.loadmore=false
						}
					}
				}, error => {
					console.log(error);
				})
			},
			// 下拉加载
			lower: function(e) {
				if(this.loadmore){
					this.page++
					this.getorderlist()
				}
			},
			//取消订单
			cancelorder(item,index){
				let opts = {
					url: '/api/order/cancel',
					method: 'post'
				}
				let params = {
					order_id:item.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.listData[index].order_status=6
					}
				}, error => {
					console.log(error);
				})
			},
			updateorder(item){
				uni.navigateTo({
					url: '/pages/updatereleaseinfo/updatereleaseinfo?id='+item.id
				});
			}
		},
		async onPullDownRefresh() {
			this.loadmore=true
			this.page = 1
			await this.getorderlist()
			uni.stopPullDownRefresh();
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
		display: flex;
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
</style>
