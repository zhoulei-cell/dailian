<template>
	<view class="content">
		<view class="status_barcenter">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
		</view>
		<!-- <view class="">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true">
				<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</scroll-view>
		</view> -->
		<HMfilterDropdown class="pos" v-if="isShow" :filterData="filterData" :defaultSelected="filterDropdownValue" :updateMenuName="true" @confirm="confirm"
		 dataFormat="Object"></HMfilterDropdown>
		<HMfilterDropdown :filterData="filterData" :defaultSelected="filterDropdownValue" :updateMenuName="true" @confirm="confirm"
		 dataFormat="Object"></HMfilterDropdown>
		<view class="conleft">
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
		<load-more v-if="listData.length !== 0" :text="loadText"></load-more>
	</view>
</template>
<script>
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import data from '@/common/data.js'; //筛选菜单数据
	import loadMore from "@/components/load-more.vue"
	export default {
		data() {
			return {
				listData: [],
				page: 1,
				searchval: "",
				filterData: [],
				filterDropdownValue: [],
				tabIndex: 0,
				tabBars: [{
					name: '推荐',
					id: 'guanzhu'
				}, {
					name: '王者荣耀',
					id: 'tuijian'
				}, {
					name: '和平精英',
					id: 'tiyu'
				}, {
					name: '英雄联盟',
					id: 'redian'
				}, {
					name: '绝地求生',
					id: 'caijing'
				}],
				ordertype: '',
				platform_id: '',
				current_segment: '',
				max: '',
				min: '',
				loadText: "上拉加载更多...",
				isLoadMore: true,
				isShow: false
			}
		},
		components: {
			uniSearchBar,
			'HMfilterDropdown': HMfilterDropdown,
			loadMore
		},
		computed: {

		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../releaseinfo/releaseinfo'
			});
		},
		async onLoad() {
			await this.getGameplatforms()
			this.getDataList()
		},
		async onPullDownRefresh() {
			this.page = 1
			this.getDataList()
			uni.stopPullDownRefresh()
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			if (this.isLoadMore) {
				this.page++
				this.loadText = "加载中..."
				this.getorderlist()
			}
		},
		methods: {
			// 获取筛选数据
			async getGameplatforms() {
				let opts = {
					url: '/api/game/platforms?game_id=1',
					method: 'get'
				}
				let data1 = await this.$http.httpRequest(opts)
				let newarr = [{
					name: '全部',
					value: ''
				}]
				for (var i = 0; i < data1.data.data.length; i++) {
					var newobj = data1.data.data[i]
					newobj.value = newobj.id
					newarr.push(newobj)
				}
				this.filterData = data
				console.log(data)
				this.filterData[0]['submenu'] = newarr
				this.filterDropdownValue = [
					[0],
					[0],
					[
						[0],
						[0],
						[0]
					]
				];
			},
			ontabtap(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.tabIndex = index
			},
			//接收菜单结果
			confirm(e) {
				console.log(e)
				this.page = 1
				this.ordertype = e.value[1][0]
				this.platform_id = e.value[0][0]
				this.current_segment = e.value[2][1][0]
				let val = e.value[2][0][0]
				this.min = val.split(',')[0]
				this.max = val.split(',')[1]
				this.listData = []
				this.getorderlist()
			},
			search(res) {
				// uni.showModal({
				// 	content: '搜索：' + res.value,
				// 	showCancel: false
				// })
			},
			input(res) {
				if (res.value === "") {
					this.getDataList()
				} else {
					this.searchval = res.value
					this.listData = []
					this.getorderlist()
				}
			},
			cancel(res) {
				// uni.showModal({
				// 	content: '点击取消，输入值为：' + res.value,
				// 	showCancel: false
				// })
			},
			//获取所有订单列表
			async getDataList() {
				this.listData = []
				await this.getsameorderlist()
				await this.getorderlist()
			},
			//获取同城订单列表
			getsameorderlist() {
				let opts = {
					url: '/api/order/province/order',
					method: 'get'
				}
				return this.$http.httpTokenRequest(opts, {}).then(res => {
					if (res.data.code == 200) {
						const data = res.data.data
						this.listData.push(...data)
					}
				}, error => {
					console.log(error);
				})
			},
			// 获取订单列表
			getorderlist() {
				let opts = {
					url: '/api/order/orders',
					method: 'get'
				}
				let params = {
					page: this.page,
					order: this.ordertype,
					price_min: this.min,
					price_max: this.max,
					search: this.searchval,
					game_id: "",
					platform_id: this.platform_id,
					game_area_id: "",
					current_segment: this.current_segment,
					tag_segment: ""
				}
				return this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						const data = res.data.data
						if (data.data.length < data.per_page) {
							this.isLoadMore = false
							this.loadText = "没有更多数据了..."
						}
						this.listData.push(...data.data)
					}
				}, error => {
					console.log(error);
				})
			},
			navtoDetail(item) {
				uni.navigateTo({
					url: '/pages/orderinfo2/orderinfo2?id=' + item.id
				})
			},
		},
		onPageScroll(options) {
			console.log(uni.upx2px(88))
			if (options.scrollTop >= uni.upx2px(88)) {
				this.isShow = true
			} else {
				this.isShow = false
			}
		},
	}
</script>
<style>
	/* .status_barcenter{
		padding-top: 100rpx;
	} */
	.content {
		background-color: #f4f8fb;
		position: relative;
		padding-bottom: 150rpx;
		padding: 0 !important;
	}

	.pos{
		position: fixed;
		top: 0;
		/* #ifdef H5*/
		top: 44px;
		/* #endif */
		left: 0;
		z-index: 999;
	}

	.uni-list {
		background: none !important;
	}

	.uni-list:after {
		background: none !important;
	}

	.uni-list-cell-db {
		border-bottom: 1px solid rgba(220, 220, 220, 1) !important;
		display: flex;
		align-items: center;
	}

	.uni-list::before {
		background: none;
		height: 0 !important;
	}

	.uni-list-cell-left {
		width: 140rpx !important;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(128, 128, 128, 1);
		padding: 0 !important;
	}

	.uni-input {
		background: none !important;
		text-align: right !important;
	}

	.uni-list-cell-db .right {
		display: flex;
		align-items: center;
	}

	.uni-list-cell-db .right image {
		width: 13px;
		height: 22px;
	}

	.uni-list-cell-db input {
		text-align: right !important;
	}

	.uni-list-cell-db .tag {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.att {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		padding: 40rpx 0;
	}

	.line2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 203, 130, 1);
		line-height: 25rpx;
		display: flex;
		align-items: center;
	}

	.next {
		position: fixed;
		bottom: 100rpx;
		width: 100%;
		left: 0;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}

	.next button {
		width: 100%;
		height: 80rpx;
		background: rgba(0, 203, 130, 1);
		box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	/* #ifdef APP-PLUS */
	.next {
		bottom: 0;
	}

	/* #endif */
	.orderlist {
		padding: 0 20rpx;
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

	.scroll-h {
		width: 750rpx;
		white-space: nowrap;
	}

	.uni-tab-item {
		display: inline-block;
		padding: 10rpx 0;
		padding-left: 34rpx;
		padding-right: 34rpx;
	}

	.uni-tab-item-title {
		color: rgba(128, 128, 128, 1);
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		flex-wrap: nowrap;
		position: relative;
		white-space: nowrap;
	}

	.uni-tab-item-title-active {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.uni-tab-item-title-active::after {
		position: absolute;
		content: '';
		display: block;
		background: #000000;
		left: 0;
		bottom: -5px;
		width: 68rpx;
		height: 10rpx;
		background: linear-gradient(45deg, rgba(0, 203, 130, 1) 0%, rgba(113, 222, 183, 1) 100%);
		border-radius: 5rpx;
		left: 50%;
		margin-left: -34rpx;
	}

	.itemprice {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 36rpx;
		color: red;
		font-weight: bold;
	}
</style>
