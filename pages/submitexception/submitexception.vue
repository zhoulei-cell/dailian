<template>
	<view class="content">
		<view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.name}}</view>
				</label>
			</radio-group>
		</view>
		<view class="textarea" v-if="current === 7">
			<textarea value="" placeholder="请输入问题及其描述" v-model="reason"/>
		</view>
		<view class="tips">
			<view>在商家处理完异常之后，请自行[取消异常]；</view>
			<view>若商家超过30分钟未处理异常，可发起协商或者申诉</view>
			<view>请上传游戏异常截图</view>
		</view>
		<view class="btn">
			<button type="default" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						value: '0',
						name: '账号密码不对'
					},
					{
						value: '1',
						name: '联系不到号主',
						checked: 'true'
					},
					{
						value: '2',
						name: '号主顶号'
					},
					{
						value: '3',
						name: '账号被禁号不能登录游戏'
					},
					{
						value: '4',
						name: '游戏账号/角色被封停'
					},
					{
						value: '5',
						name: '订单信息和描述不符'
					},
					{
						value: '6',
						name: '账号防沉迷无法代练'
					},
					{
						value: '7',
						name: '其他原因'
					},
				],
				current: 0,
				orderid:0,
				reason: ''
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			// 提交异常
			submit(){
				let opts = {
					url: '/api/order/abnormal',
					method: 'post'
				}
				let type=this.items[this.current].value
				let params={
					order_id:this.orderid,
					type:type,
					status:1,
					reason: this.reason
				}
				this.$http.httpTokenRequest(opts,params).then(res => {
					if(res.data.code==200){
						uni.showToast({
							title:res.data.msg
						})
						uni.navigateBack({
							delta:1
						})
					}else{
						uni.showToast({
							title:res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			}
		},
		onLoad: function (option) {
			console.log(option.id)
			this.orderid=option.id
		}
	}
</script>

<style lang="scss">
.btn{
	padding-top: 50rpx;
}
.textarea{
	margin-top: 10rpx;
}
.textarea textarea{
	box-sizing: border-box;
	min-height: 300rpx;
	border: 1rpx solid #E0E0E0;
	width: 100%;
	padding: 10rpx;
	font-size: 24rpx;
}
.tips {
	padding: 30rpx 0;
	view{
		height: 40rpx;
		color: red;
		font-size: 26rpx;
		line-height: 40rpx;
	}
}
</style>
