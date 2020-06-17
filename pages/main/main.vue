<template>
	<view class="content">
		<view class="status_bar">
			<view class="status_barleft">首页</view>
			<view class="status_barcenter">
				<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
			</view>
			<view class="status_barright">
				<view class="canlder">{{day}}</view>
			</view>
		</view>
		<!-- <view class="fixedline"></view> -->
		<!-- 轮播图 -->
		<view class="banner">
			<uni-swiper-dot :info="info" :current="current" field="content" :mode="mode">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item ,index) in info" :key="index">
						<view class="swiper-item">
							<image :src="item.content" mode=""></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		<!-- 导航 -->
		<view class="navicon">
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/wangzhe.png" mode=""></image>
				</view>
				<view class="itemtext">王者荣耀</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/heping.png" mode=""></image>
				</view>
				<view class="itemtext">和平精英</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/yinxiong.png" mode=""></image>
				</view>
				<view class="itemtext">英雄联盟</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/jundi.png" mode=""></image>
				</view>
				<view class="itemtext">绝地求生</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/shaishi.png" mode=""></image>
				</view>
				<view class="itemtext">竞技赛事</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/wangzhe.png" mode=""></image>
				</view>
				<view class="itemtext">地下城与勇士</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/dixia.png" mode=""></image>
				</view>
				<view class="itemtext">穿越火线</view>
			</view>
			<view class="item">
				<view class="itemimg">
					<image src="../../static/img/index/all.png" mode=""></image>
				</view>
				<view class="itemtext">全部分类</view>
			</view>
		</view>
		<!-- 竞技赛事 -->
		<view class="title">竞技赛事</view>
		<view class="ad">
			<view class="adimg">
				<image src="../../static/img/index/banner.png" mode=""></image>
			</view>
			<view class="adimg">
				<image src="../../static/img/index/banner2.png" mode=""></image>
			</view>
		</view>
		<view class="title">代练接单</view>
		<view class="orderlist">
			<view class="item" v-for="(item, index) in listData" :key="item.id" @tap="navtoDetail(item)">
				<view class="tag1" v-show="item.province">
					<image src="../../static/img/index/shenlei.png" mode=""></image>
				</view>
				<view class="itemimg">
					<image src="../../static/img/index/wanz.png" mode=""></image>
				</view>
				<view class="itemright">
					<view class="title">{{item.title}}</view>
					<view class="desc">{{item.rel_message}}</view>
					<view class="fabuzhe">发布者：{{item.user.name || ''}}</view>
					<view class="comfirm">保证金：{{item.promise_price}}元<view class="tag">|</view>时间：{{item.duration}}小时</view>
				</view>
				<view class="itemprice">
					￥{{item.price}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	export default {
		data() {
			return {
				listData: [],
				page: 1,
				searchval: "",
				info: [{
					content: '../../static/img/index/banner3.png'
				}, {
					content: '../../static/img/index/banner.png'
				}, {
					content: '../../static/img/index/banner2.png'
				}],
				current: 0,
				mode: 'round',
				day: '',
				fixed: false
			}
		},
		components: {
			slFilter,
			uniSearchBar,
			uniSwiperDot
		},
		async onShow() {
			this.getday()
			await this.getorderlist()
		},
		async onPullDownRefresh() {
			this.getday()
			this.page=1
			await this.getorderlist()
			uni.stopPullDownRefresh()
		},
		methods: {
			//图片轮播
			change(e) {
				this.current = e.detail.current;
			},
			//获取当前日期
			getday() {
				let now = new Date()
				let day = now.getDate()
				if (day < 10) day = "0" + day;
				this.day = day
			},
			
			// 获取订单列表
			getorderlist() {
				let opts = {
					url: '/api/order/orders',
					method: 'get'
				}
				let params = {
					page: this.page,
					order: "",
					price_min: "",
					price_max: "",
					search: this.searchval,
					game_id: "",
					platform_id: "",
					game_area_id: "",
					current_segment: "",
					tag_segment: ""
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
			search(res) {
				// uni.showModal({
				// 	content: '搜索：' + res.value,
				// 	showCancel: false
				// })
			},
			input(res) {
				this.searchval = res.value
				this.getorderlist()
			},
			cancel(res) {
				// uni.showModal({
				// 	content: '点击取消，输入值为：' + res.value,
				// 	showCancel: false
				// })
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: '/pages/orderinfo2/orderinfo2?id=' + item.id
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #f4f8fb;
	}

	.fixedline {
		height: 100rpx;
	}

	.status_bar {
		width: 100%;
	}

	.banner {
		width: 100%;
		height: 312rpx;
	}

	.swiper-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.swiper-item image {
		width: 100%;
	}

	.navicon {
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 25rpx;
	}

	.navicon .item {
		width: 25%;
		text-align: center;
		padding-top: 25rpx;
	}

	.navicon .item .itemimg {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navicon .item .itemimg image {
		width: 107rpx;
		height: 108rpx;
	}

	.navicon .item .itemtext {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.ad {
		display: flex;
	}

	.ad .adimg {
		flex: 1;
	}

	.ad .adimg image {
		width: 352rpx;
		height: 212rpx;
	}

	.orderlist .item {
		display: flex;
		padding: 30rpx 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius: 15px;
		margin-top: 20rpx;
		position: relative;
	}

	.orderlist .item .tag1 {
		position: absolute;
		right: 0;
		top: 0;
		width: 78rpx;
		height: 78rpx;
	}

	.orderlist .item .tag1 image {
		width: 100%;
		height: 100%;
	}

	.orderlist .item .itemimg {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 20rpx;
	}

	.orderlist .item .itemimg image {
		width: 131rpx;
		height: 131rpx;
	}

	.orderlist .itemright {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.orderlist .itemright .title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 203, 130, 1);
	}

	.orderlist .itemright .desc {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.orderlist .itemright .fabuzhe {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.orderlist .itemright .comfirm {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		display: flex;
		align-items: center;
	}

	.orderlist .itemright .tag {
		padding: 0 10rpx;
	}

	.example-body {
		display: flex;
	}

	.status_bar {
		display: flex;
		align-items: center;
	}

	.status_barleft {
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}

	.status_barcenter {
		flex: 1;
	}

	.status_barright .canlder {
		width: 37rpx;
		height: 38rpx;
		background: url(../../static/img/index/clender.png);
		background-size: cover;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.itemprice{
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		color: red;
		font-weight: bold;
	}
</style>
