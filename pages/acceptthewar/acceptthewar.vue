<template>
  <view class="content">
		<HMfilterDropdown bgColor="#fff" :filterData="filterData" :defaultSelected ="filterDropdownValue" :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown>
		<block v-for="(list,index) in listData" :key="index">
			<!-- 列表 -->
			<view class="list-group-wrap" @tap="navtodetail(list)">
				<view class="list-group">
					<view class="list-group-title">
						<view class="title-logo d-flex jc-center">
							<view class="logo">
								{{list.release_ban == "未ban职业" ? list.release_ban : ('已禁职业' + list.release_ban)}}
							</view>
						</view>
						<view class="title d-flex jc-between">
							<view class="left flex-1 text-overflow">
								<text>房间号: {{list.match_no}}</text>
							</view>
							<view class="right">{{list.showStatus}}</view>
						</view>
					</view>
					<view class="list-group-content">
						<view class="list-group-item">应战区服：{{list.platforms.name}}</view>
						<view class="list-group-item">
							<text>胜者奖金：</text>
							<text>￥{{list.totalAmount}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 列表 -->
		</block>
		<load-more v-if="listData.length !== 0" :text="loadMoreText"></load-more>
  </view>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import loadMore from '@/components/load-more'
	import data2 from '@/common/data2.js';//筛选菜单数据
	export default {
		components: {
			'HMfilterDropdown': HMfilterDropdown,
			loadMore
		},
		data() {
			return {
				filterData:[],
				filterDropdownValue:[],
				page:1,
				listData:[],
				area_id:'',
				order:'',
				loadMoreText: '上拉加载更多...'
			}
		},
		async onPullDownRefresh() {
			this.page = 1
			await this.getlist()
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			if (!this.isEnd) {
				this.loadMoreText = "加载中..."
				this.page++
				this.getlist()
			} 
		},
		methods: {
			navtodetail(list){
				uni.navigateTo({
					url:'../battledetails/battledetails?list='+JSON.stringify(list)+'&type=2'
			})
		},
		// 获取筛选数据
		async getGameplatforms() {
				let opts = {
					url: '/api/game/platforms?game_id=1',
					method: 'get'
				}
				let data1 = await this.$http.httpRequest(opts)
				let newarr=[
					{
						name:'全部',
						value:''
					}
				]
				for(var i=0;i<data1.data.data.length;i++){
					var newobj=data1.data.data[i]
					newobj.value=newobj.id
					newarr.push(newobj)
				}
				this.filterData=data2
				this.filterData[0]['submenu']=newarr
				this.filterDropdownValue = [
					[0],
					[0]
				];
		},
		//接收菜单结果
		confirm(e){
			this.page=1
			this.area_id=e.value[0][0]
			this.order=e.value[1][0]
			this.getlist()
		},
		// 获取列表
		getlist() {
			let opts = {
				url: '/api/match/index',
				method: 'get'
			}
			let params = {
				self:2,
				type:'',
				page:this.page,
				order:this.order,
				area_id:this.area_id,
				type:0
			}
			return this.$http.httpTokenRequest(opts, params).then(res => {
				if (res.data.code == 200) {
					if (this.page == 1) {
						this.listData = []
					}
					const data = res.data.data
					if (data.per_page > data.data.length) { //说明已经加载到最后一页了
						this.isEnd = true;
						this.loadMoreText = "没有更多数据了..."
					}
					this.listData.push(...data.data)
				}
			}, error => {
				console.log(error)
			})
			}
		},
		async onLoad() {
			this.getlist()
			await this.getGameplatforms()
		}
	}
</script>

<style lang="scss">
	.content{
		background-color: #f4f8fb;
		position: relative;
		padding-bottom: 150rpx;
		padding: 0 !important;
	}
	.next{
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height:120rpx;
		background:rgba(255,255,255,1);
		box-shadow:2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}
	.next button{
		width:100%;
		height:80rpx;
		background:rgba(0,203,130,1);
		box-shadow:0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius:15rpx;
		line-height: 80rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.list-group-wrap{
		font-family: PingFang-SC-Bold;
		padding: 0 20rpx;
		margin-top: 20rpx;
		.list-group{
			padding: 20rpx 15rpx;
			border-radius: 15rpx;
			background-color: #fff;
			.list-group-title{
				border-bottom: 1rpx solid #F0F0F0;
				.title-logo{
					.logo{
						width: 278rpx;
						height: 46rpx;
						background-image: url(../../static/img/arena/01.png);
						background-size: 100% 100%;
						color: #806F39;
						font-size: 28rpx;
						text-align: center;
						line-height: 46rpx;
						font-weight: bold;
					}
				}
				.title{
					padding: 15rpx 0;
					line-height: 28rpx;
					font-weight: bold;
					.left{
						text{
							color: #333;
							font-size: 28rpx;
							line-height: 28rpx;
						}
					}
					.right{
						color: #999;
						font-size: 28rpx;
					}
				}
			}
			.list-group-content{
				font-weight: bold;
				padding-top: 15rpx;
				.list-group-item{
					padding: 10rpx 0;
					color: #666;
					font-size: 28rpx;
					line-height: 28rpx;
					text{
						font-size: 30rpx;
						line-height: 30rpx;
					}
					text:nth-child(1){
						color: #333;
						padding-right: 50rpx;
					}
					text:nth-child(2){
						color: red;
					}
				}
			}
		}	
	}
</style>
