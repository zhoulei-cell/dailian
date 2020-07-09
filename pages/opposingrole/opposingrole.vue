<template>
	<view class="content">
		<view class="item" v-for="(list,index) in listData" :key="index" @tap="chose(list)">
			<view class="itemleft">
				<view class="checkbox" :class="{check:check==list.id}"></view>
			</view>
			<view class="itemcenter">
				<view class="itemcentertop">角色名称：{{list.role_name}}</view>
				<view class="itemcenterbottom">QQ/微信：{{list.contact}}</view>
			</view>
			<view class="itemright">
				{{list.platforms.name}}
			</view>
		</view>
	</view>
</template>
<script>
export default {
  data() {
    return {
			listData:[
				{
					platforms:{
						name:''
					}
				}
			],
			check:'',
			type:''
		}
  },
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url:'../addrole/addrole'
		})
	},
	async onShow() {
		await this.getorderlist()
	},
	async onPullDownRefresh() {
		await this.getorderlist()
		uni.stopPullDownRefresh()
	},
  methods: {
		chose(list){
			this.check=list.id
			if(this.type){
				this.$store.commit('updaterole',list)
				uni.navigateBack({
					delta:1
				})
			}
		},
		// 获取角色列表
		getorderlist() {
			let opts = {
				url: '/api/match/role/index',
				method: 'get'
			}
			let params = {
			}
			return this.$http.httpTokenRequest(opts, params).then(res => {
				if (res.data.code == 200) {
					this.listData = res.data.data
					this.check = this.listData[0].id
				}
			}, error => {
				console.log(error);
			})
		}
  },
	onLoad:function(option) {
		this.type = option.type
	}
}
</script>
<style>
	/* .status_barcenter{
		padding-top: 100rpx;
	} */
	.content{
		background-color: #f4f8fb;
		position: relative;
		padding-bottom: 150rpx;
		padding: 20rpx !important;
	}
	.item{
		background: #fff;
		display: flex;
		margin-top: 20rpx;
		padding: 20rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
	}
	.itemleft {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 30rpx;
	}
	.itemleft .checkbox{
		width: 30rpx;
		height: 30rpx;
		border: 2rpx solid #01A861;
		border-radius: 50%;
	}
	.itemleft .checkbox.check{
		background: #01A861;
	}
	.itemcenter{
		flex: 1;
	}
	.itemright{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
