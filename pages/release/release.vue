<template>
    <view class="content">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					游戏服务区
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray" :range-key="'name'">
						<view class="uni-input">{{multiArray[0][multiIndex[0]].name}},{{multiArray[1][multiIndex[1]].name}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					铭文等级
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入铭文等级" />
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前段位
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入当前段位" />
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					目标段位
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入目标段位" />
				</view>
			</view>
		</view>
		<!-- <view class="contentBottom">
			<view class="item">
				<view class="itemtop">建议价格（元）</view>
				<view class="itembottom">10</view>
			</view>
			<view class="item">
				<view class="itemtop">限计时限（小时）</view>
				<view class="itembottom">10</view>
			</view>
			<view class="item">
				<view class="itemtop">健康安全保证金（元）</view>
				<view class="itembottom">10</view>
			</view>
			<view class="item">
				<view class="itemtop">健康效率保证金（元）</view>
				<view class="itembottom">10</view>
			</view>
		</view> -->
		<view class="next">
			<button  type="default" @tap="nextStep">下一步</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
			multiArray: [],
			multiIndex: [0, 0],
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
					this.getGameAreas(res.data.data[0].id)
				}
			}, error => {
				uni.showToast({
					icon: '获取数据失败，请稍后重试'
				})
			})
			
		},
		//根据平台获取区
		getGameAreas(id) {
			let opts = {
				url: '/api/game/areas?platform_id='+id,
				method: 'get'
			}
			this.$http.httpRequest(opts).then(res => {
				if(res.data.code==200){
					this.multiArray[1]=res.data.data
					this.$forceUpdate()
				}
			}, error => {
				uni.showToast({
					icon: '获取数据失败，请稍后重试'
				})
			})
			
		},
		nextStep:function(){
			uni.navigateTo({
			    url: '/pages/releaseinfo/releaseinfo'
			});
		},
		bindMultiPickerColumnChange: function(e) {
			//console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
			this.multiIndex[e.detail.column] = e.detail.value
			switch (e.detail.column) {
				case 0: //拖动第1列
					let id = this.multiArray[e.detail.column][e.detail.value].id
					this.getGameAreas(id)
					break
					this.multiIndex.splice(2, 1)
					break
			}
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
		background: #fff;
	}
	.next{
		padding-top: 60px;
	}
	.next button{
		width: 100%;
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
</style>