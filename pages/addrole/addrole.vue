<template>
    <view class="content">
		<view class="title">角色信息</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					参赛区服：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray"
					 :range-key="'name'" style="flex: 1;">
						<view class="uni-input">{{multiArray[0][multiIndex[0]].name}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						角色：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输入角色" v-model="role_name"/>
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						QQ/微信：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输QQ/微信" v-model="contact"/>
					</view>
				</view>
			</view>
		</view>
		<view class="next">
			<button  type="default" @tap="submit">提交</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
			multiArray: [
				[
					{name:''}
				]
			],
			multiIndex: [0],
			contact:'',
			role_name:''
        }
    },
    computed: {
		
    },
    methods: {
		// 获取游戏平台
		getGameplatforms() {
			let opts = {
				url: '/api/game/platforms?game_id=1',
				method: 'get'
			}
			this.$http.httpRequest(opts).then(res => {
				if(res.data.code==200){
					this.multiArray[0]=res.data.data
					this.$forceUpdate()
				}
			}, error => {
				console.log(error);
			})
		},
		submit:function(){
			let opts = {
				url: '/api/match/role/post',
				method: 'post'
			}
			let params = {
				area_id: this.multiArray[0][this.multiIndex[0]].id,
				contact: this.contact,
				role_name: this.role_name
			}
			this.$http.httpTokenRequest(opts,params).then(res => {
				if(res.data.code==200){
					uni.showToast({
						icon:'none',
						title:res.data.msg
					})
				}
			}, error => {
				console.log(error);
			})
		},
		bindMultiPickerColumnChange: function(e) {
			this.multiIndex[e.detail.column] = e.detail.value
			this.$forceUpdate()
		},
        bindPickerChange: function(e) {
            this.index = e.target.value
        }
    },
	onShow() {
		this.getGameplatforms()
	}
}
</script>
<style>
	.red{
		color: red;
	}
	.cellfirst::before {
	    position: absolute;
	    z-index: 3;
	    right: 0;
	    top: 0;
	    left: 0;
	    height: 1px;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    -ms-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
	.content{
		background-color: #f4f8fb;
		padding: 0 20rpx;
		position: relative;
		padding-bottom: 150rpx;
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
	.uni-list::before{
		background: none;
	}
	.contentBottom{
		display: flex;
		flex-wrap: wrap;
		padding-top: 60rpx;
	}
	.contentBottom .item{
		width: 50%;
		text-align: center;
	}
	.contentBottom .item .itemtop{
		font-size: 30rpx;
	}
	.contentBottom .item .itembottom{
		font-weight: bold;
		font-size: 34px;
		color: #01a861;
	}
	.title{
		background: #fff;
		padding: 35rpx;
		padding-bottom: 0;
		padding-top: 10rpx;
		position: relative;
		font-weight: bold;
		color: red;
		border-bottom: 1px solid #E0E0E0;
		margin-top: 10rpx;
	}
	.line{
		padding: 8px 16px;
		background: #fff;
		border-bottom: 1px solid #E0E0E0;
		font-size: 15px;
	}
</style>