<template>
    <view class="content">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					游戏服务区
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
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
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					目前段位
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="contentBottom">
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
		</view>
		<view class="next">
			<button  type="default" @tap="nextStep">下一步</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            array: ['中国', '美国', '巴西', '日本'],
			multiArray: [
				['亚洲', '欧洲'],
				['中国', '日本'],
				['北京', '上海', '广州']
			],
			multiIndex: [0, 0, 0],
        }
    },
    computed: {
		
    },
    methods: {
		nextStep:function(){
			uni.navigateTo({
			    url: '/pages/releaseinfo/releaseinfo'
			});
		},
		bindMultiPickerColumnChange: function(e) {
			console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
			this.multiIndex[e.detail.column] = e.detail.value
			switch (e.detail.column) {
				case 0: //拖动第1列
					switch (this.multiIndex[0]) {
						case 0:
							this.multiArray[1] = ['中国', '日本']
							this.multiArray[2] = ['北京', '上海', '广州']
							break
						case 1:
							this.multiArray[1] = ['英国', '法国']
							this.multiArray[2] = ['伦敦', '曼彻斯特']
							break
					}
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
					break
				case 1: //拖动第2列
					switch (this.multiIndex[0]) { //判断第一列是什么
						case 0:
							switch (this.multiIndex[1]) {
								case 0:
									this.multiArray[2] = ['北京', '上海', '广州']
									break
								case 1:
									this.multiArray[2] = ['东京','北海道']
									break
							}
							break
						case 1:
							switch (this.multiIndex[1]) {
								case 0:
									this.multiArray[2] = ['伦敦', '曼彻斯特']
									break
								case 1:
									this.multiArray[2] = ['巴黎', '马赛']
									break
							}
							break
					}
					this.multiIndex.splice(2, 1, 0)
					break
			}
			this.$forceUpdate()
		},
        bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.target.value)
            this.index = e.target.value
        }
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