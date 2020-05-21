<template>
    <view class="content">
		<view class="title">对战信息</view>
		<view class="line">
			游戏模式：王者荣耀墨家机关道1V1
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					参赛区服：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="title">对局信息</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					参赛金额：
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="最低6金币" />
				</view>
			</view>
		</view>
		<view class="line">
			服务费用：<text class="red">0.00</text>
		</view>
		<view class="title">角色信息</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					选择区服：
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						角色：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输入角色" />
					</view>
				</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						QQ/微信：
					</view>
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输QQ/微信" />
					</view>
				</view>
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
		/* background: #fff; */
	}
	.next{
		padding-top: 60px;
	}
	.next button{
		width: 100%;
		background: red;
		color: #fff;
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