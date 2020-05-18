<template>
    <view class="content">
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					区服
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					订单标题
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入订单标题" />
				</view>
			</view>
		</view>
		<view class="uni-title">价格时限</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					订单价格
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入订单价格" />
				</view>
				<view class="tag">元</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					时限要求
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入时限要求" />
				</view>
				<view class="tag">小时</view>
			</view>
		</view>
		<view class="uni-title">账户信息</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					游戏账号
				</view>
				<view class="uni-list-cell-db">
					<view class="uni-list-cell-db">
						<input class="uni-input" placeholder="请输入游戏账号" />
					</view>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					游戏密码
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入游戏密码" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					游戏角色明
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入游戏角色明" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					登录手机号
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="可不填" />
				</view>
			</view>
		</view>
		<view class="uni-title">服务保障</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					安全保障金
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入订单价格" />
				</view>
				<view class="tag">元</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					效率保证金 
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入时限要求" />
				</view>
				<view class="tag">小时</view>
			</view>
		</view>
		<view class="uni-title">当前游戏信息</view>
		<view class="uni-textarea">
			<textarea placeholder="请输入当前游戏信息"/>
		</view>
		<view class="uni-title">代练要求</view>
		<view class="text">
			1.接单者半小时内上传好友排行段位首图，2小时内必须开始代练，每隔12小时上传好友排行段位进度图。
			2. 提交完成前上传好友排行段位图完单图（好友排行只针对排位单 ，特殊类型订单请上传代练所需截图）。
			3. 未经发布者同意不能动用账号内金币、点券、体验卡等物品。
			4. 除登陆验证外，不能联系号主及号主好友加钱或补款，否则发布者有权终止订单并申请赔偿。
			5. 接单后中途退单，需要赔偿相应的保证金。
		</view>
		<view class="uni-title">增值服务</view>
		<view class="uni-list">
			<view class="line">
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" />省内代理员可接<text>（可选项额外收费订单金额5%）</text>
					</label>
				</checkbox-group>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					区服
				</view>
				<view class="uni-list-cell-db">
					<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray">
						<view class="uni-input">{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<view class="uni-title">联系方式</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					联系手机
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入联系手机" />
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					联系QQ
				</view>
				<view class="uni-list-cell-db">
					<input class="uni-input" placeholder="请输入联系QQ" />
				</view>
			</view>
		</view>
		<view class="att">
       	 温馨提示：订单默认选中为“公共频道”，即大厅内的“普通”订单，便于用户查看和出售。
		</view>
		<view class="line2">
			<checkbox-group>
				<label>
					<checkbox value="cb" checked="true" />我已阅读并接受<text>发单协议</text>
				</label>
			</checkbox-group>
		</view>
		<view class="next">
			<button  type="default" @tap="submit">确认发布</button>
		</view>
    </view>
</template>
<script>
export default {
    data() {
        return {
			extraIcon1: {
				color: '#007aff',
				size: '22',
				type: 'gear-filled'
			},
            array: ['中国', '美国', '巴西', '日本'],
			multiArray: [
				['亚洲', '欧洲'],
				['中国', '日本'],
				['北京', '上海', '广州']
			],
			multiIndex: [0, 0, 0],
        }
    },
	components: {
	},
    computed: {
		
    },
    methods: {
		nextStep:function(){
			
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
	.line2{
		padding: 20rpx;
	}
	.att{
		color: #fb9c80;
		padding: 20rpx;
	}
	.line{
	background: #fff;	
	padding: 20rpx;
	position: relative;
	}
	.line::after{
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		-ms-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.line text{
		color: #D3D3D3;
	}
	.text{
		background: #fff;
		padding: 20rpx;
	}
	.tag{
		padding-right: 10rpx;
	}
	.uni-list-cell::after{
	left: 0;	
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
		padding: 0;
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
	.uni-title{
		font-weight: bold;
		padding-left: 20rpx;
	}
</style>