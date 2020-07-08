<template>
	<view class="content">
		<view class="tab">
			<view class="tabitem" v-for="item in ordertype" :key="item.type" :class="{check:item.type==selectindex}" @tap="choseItem(item)">{{item.text}}</view>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltolower="lower" :lower-threshold="threshold"
		 style="position: absolute;top: 68rpx;left: 0;right: 0;bottom: 0;background: #F4F5F6;" refresher-enabled="true"
		 :refresher-triggered="triggered" :refresher-threshold="50" @refresherpulling="onPulling" @refresherrefresh="onRefresh"
		 @refresherrestore="onRestore" @refresherabort="onAbort">

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
						<button @tap.stop="lockorder(item,index)" v-if="item.locked==0">锁号</button>
						<button @tap.stop="jslockorder(item,index)" v-if="item.locked==1">解锁</button>
						<button @tap.stop="agreejs(item,index)" v-if="item.order_status==4">同意结算</button>
						<button @tap.stop="uploadimg(item,index)" v-if="item.order_status==2||item.order_status==3||item.order_status==4">上传截图</button>

						<button @tap.stop="consult(item,index)" v-if="(item.order_status==2 && item.consult==0) || (item.order_status==3 && item.consult==0) ">协商结算</button>
						<button @tap.stop="agreeconsult(item,index)" v-if="(item.order_status==2 && item.consult!=0) || (item.order_status==3 && item.consult!=0) ">查看协商信息</button>

						<button @tap.stop="agreeappeal(item,index)" v-if="item.order_status!=1 && item.appeals==0 && item.order_status!=5">申诉</button>
						<button @tap.stop="lookappeal(item,index)" v-if="item.order_status!=1 && item.appeals!=0 && item.order_status!=5">查看申诉</button>
						<button @tap.stop="cancelorder(item,index)" v-if="item.order_status==1">取消订单</button>
						<button @tap.stop="updateorder(item,index)" v-if="item.order_status==1">修改订单</button>
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
				selectindex: "",
				ordertype: [{
						type: "",
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
						text: "异常中"
					},
					{
						type: 4,
						text: "待验收"
					},
					{
						type: 5,
						text: "已结算"
					}
				],
				listData: [],
				page: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				threshold: "50px",
				loadmore: true,
				ordertext: ['关闭', '待接单', '代练中', '异常中', '待验收', '已结算', '取消'],
				orderstaus: '',
				triggered:false
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
			onPulling(e) {
				console.log("onpulling", e);
			},
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
			onAbort() {
				
			},
			//同意结算
			agreejs(item) {
				let opts = {
					url: '/api/order/confirm',
					method: 'post'
				}
				let params = {
					order_id: item.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg
						})
						this.page = 1
						this.getorderlist()
					} else {
						uni.showToast({
							title: res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			//上传图片
			uploadimg(item) {
				uni.navigateTo({
					url: '/pages/orderimgsubmit/orderimgsubmit?id=' + item.id
				});
			},
			//申诉
			agreeappeal(item) {
				uni.navigateTo({
					url: '/pages/appeal/appeal?item=' + JSON.stringify(item)
				});
			},
			//查看申诉
			lookappeal(item){
				uni.navigateTo({
					url: '/pages/appealdetial/appealdetial?item='+JSON.stringify(item)
				});
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: '/pages/orderinfo/orderinfo?id=' + item.id
				});
			},
			choseItem(item) {
				this.selectindex = item.type
				this.page = 1
				this.getorderlist()
			},
			//同意协商
			agreeconsult(item, index) {
				uni.navigateTo({
					url: '/pages/consult/consult?id=' + item.id
				});
			},
			//协商结算
			consult(item) {
				uni.navigateTo({
					url: '/pages/consult/consult?id=' + item.id + 'type=1' + '&orderinfo=' + JSON.stringify(item)
				});
			},
			// 获取订单列表
			getorderlist() {
				let opts = {
					url: '/api/order/get_user_orders',
					method: 'get'
				}
				let params = {
					page: this.page,
					status: this.selectindex
				}
				return this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						if (this.page == 1) {
							this.listData = res.data.data.data
						} else {
							this.listData.concat(this.listData, res.data.data.data)
						}
					}
				}, error => {
					console.log(error);
				})
			},
			// 下拉加载
			lower: function(e) {
				if (this.loadmore) {
					this.page++
					this.getorderlist()
				}
			},
			//取消订单
			cancelorder(item, index) {
				let opts = {
					url: '/api/order/cancel',
					method: 'post'
				}
				let params = {
					order_id: item.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.listData[index].order_status = 6
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			updateorder(item) {
				uni.navigateTo({
					url: '/pages/updatereleaseinfo/updatereleaseinfo?id=' + item.id
				});
			},
			//锁号
			lockorder(item, index) {
				let opts = {
					url: '/api/order/account/lock',
					method: 'PUT'
				}
				let params = {
					order_id: item.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.listData[index].locked = 1
						this.getorderlist()
					}
				}, error => {
					console.log(error);
				})
			},
			//解锁
			jslockorder(item, index) {
				let opts = {
					url: '/api/order/account/unlock',
					method: 'PUT'
				}
				let params = {
					order_id: item.id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.listData[index].locked = 0
						this.getorderlist()
					}
				}, error => {
					console.log(error);
				})
			}
		},
		async onShow() {
			this.triggered = true
			this.loadmore = true
			this.page = 1
			await this.getorderlist()
			this.triggered = false
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

	.orderbtn {
		display: flex;
		background: #fff;
		margin-bottom: 20rpx;
		padding: 20rpx;
	}

	.orderbtn_left {
		flex: 1;
	}

	.orderbtn_right {
		display: flex;
	}

	.orderbtn_right button {
		height: 50rpx;
		line-height: 50rpx;
		font-size: 12px;
		margin-left: 10rpx;
	}
</style>
