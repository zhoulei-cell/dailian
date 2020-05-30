<template>
    <view class="content">
		<view class="example-body">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
		</view>
        
		<!-- <sl-filter :independence="true" :color="titleColor" :themeColor="themeColor" :menuList.sync="menuList" @result="result"></sl-filter> -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y"  @scrolltolower="lower" style="position: absolute;top: 100rpx;left: 0;right: 0;bottom: 0;background: #F4F5F6;">
		<view>
			<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
			<view v-for="(item, index) in listData" :key="item.id" @tap="navtoDetail(item)">
			  <view class="item">
				<view class="item_left">
					<view class="title">{{item.title}}</view>
					<view class="dec elis">{{item.rel_message}}</view>
					<view class="dec">发布者：{{item.user.name || ''}}</view>
					<view class="dec">保证金：{{item.promise_price}} 总时间：{{item.duration}}小时</view>
				</view>
				<view class="item_right">
					￥{{item.price}}
				</view>
			  </view>
			</view>
	  </view>
	  </scroll-view>
    </view>
</template>

<script>
	import slFilter from '@/components/sl-filter/sl-filter.vue';
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
    import {
        mapState
    } from 'vuex'

    export default {
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
				listData:[],
				page:1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				searchval:""
			}
		},
		components: {
			slFilter,
			uniSearchBar
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        onLoad() {
			this.getorderlist()
        },
		async onPullDownRefresh() {
			this.page = 1
			await this.getorderlist()
			uni.stopPullDownRefresh();
		},
		methods:{
			// 获取订单列表
			getorderlist() {
				let opts = {
					url: '/api/order/orders',
					method: 'get'
				}
				let params = {
					page: this.page,
					order:"",
					price_min:"",
					price_max:"",
					search:this.searchval,
					game_id:"",
					platform_id:"",
					game_area_id:"",
					current_segment:"",
					tag_segment:""
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						if(this.page==1){
							this.listData = res.data.data.data
						}else{
							this.listData.concat(this.listData,res.data.data.data)
						}
					}
				}, error => {
					console.log(error);
				})
			},
			// 下拉加载
			lower: function(e) {
				this.page++
				this.getorderlist()
			},
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
			},
			search(res) {
				// uni.showModal({
				// 	content: '搜索：' + res.value,
				// 	showCancel: false
				// })
			},
			input(res) {
				this.searchval=res.value
				this.getorderlist()
			},
			cancel(res) {
				uni.showModal({
					content: '点击取消，输入值为：' + res.value,
					showCancel: false
				})
			},
			navtoDetail(item){
				uni.navigateTo({
				    url: '/pages/orderinfo2/orderinfo2?id='+item.id
				});
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
	.example-body{
		background: #efeff4;
	}
	.inputcont{
		padding: 10rpx;
	}
	.content{
		padding: 0;
		background: #fff;
	}
	.cont{
		width: 100%;
	}
	.uni-input{
		background: #fff;
		padding: 15rpx;
		border-radius: ;
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
</style>
