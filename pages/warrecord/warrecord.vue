<template>
    <view class="content">
		<HMfilterDropdown :filterData="filterData" :defaultSelected ="filterDropdownValue" :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown>
		<view class="item" v-for="(list,index) in listData" :key="index" @tap="navtodetail(list)">
			<view class="titleline">
				<view class="titleleft">
					<!-- <view class="titletag">星耀</view> -->
					房号：{{list.id}}
				</view>
				<text>{{list.showStatus}}</text>
			</view>
			<view class="dec">
				<view class="line">应战区服：{{list.platforms.name}}</view>
				<view class="linet">胜者奖金<text class="red">￥{{list.totalAmount}}</text></view>
			</view>
		</view>
		<!-- 站位 -->
		<view style="height: 150rpx;"></view>
		<view class="next">
			<navigator url="/pages/releasepk/releasepk" class="publicbtn">
				<button>发布对战</button>
			</navigator>
			<!-- <view class="mybtn">我的角色</view> -->
		</view>
    </view>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import data2 from '@/common/data2.js';//筛选菜单数据
    export default {
        components: {
			'HMfilterDropdown':HMfilterDropdown
        },
        data() {
            return {
				filterData:[],
				filterDropdownValue:[],
				page:1,
				listData:[],
				area_id:'',
				order:''
            }
        },
		async onPullDownRefresh() {
			this.page=1
			await this.getlist()
			uni.stopPullDownRefresh()
		},
		onReachBottom(){
			this.page++
			this.getlist()
		},
        methods: {
			navtodetail(list){
				uni.navigateTo({
					// url:'../arenadetial/arenadetial?list='+JSON.stringify(list)
					url:'../battledetails/battledetails?list='+JSON.stringify(list)+'&type=1'
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
					self:1,
					type:'',
					page:this.page,
					order:this.order,
					area_id:this.area_id,
					type:0
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
			}
        },
        async onLoad() {
			await this.getGameplatforms()
        },
		onShow() {
			this.getlist()
		}
    }
</script>

<style>
	.content{
		background-color: #f4f8fb;
		position: relative;
		padding-bottom: 150rpx;
		padding: 0 !important;
	}
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
	.dec{
		padding-top: 20rpx;
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
</style>
