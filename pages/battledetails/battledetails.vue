<template>
	<view class="battle-details">
		<view class="container">

			<view class="info-card" v-if="detailinfo.status === 5">
				<view class="card-title">结算信息</view>
				<view class="card-box">
					<view class="desc">
						<text>胜方：</text>
						<text class="red">{{detailinfo.winners.name}}</text>
					</view>
					<view class="desc">
						<text>获得奖励：</text>
						<text v-if="detailinfo.partake.id === detailinfo.winners.id" class="red">{{detailinfo.partake.match_reward}}</text>
						<text v-if="detailinfo.user.id === detailinfo.winners.id" class="red">{{detailinfo.user.match_reward}}</text>
					</view>
				</view>
			</view>

			<view class="info-card">
				<view class="card-title">对战信息</view>
				<view class="card-box">
					<view class="card-desc">
						<text>房间号：</text>
						<text>{{detailinfo.match_no}}</text>
					</view>
					<view class="card-desc">
						<text>发起人：</text>
						<text>{{detailinfo.user.name}}</text>
					</view>
					<view class="card-desc">
						<text>联系方式：</text>
						<text>{{detailinfo.user_role.contact}}</text>
					</view>
					<view class="card-desc">
						<text>游戏：</text>
						<text>王者荣耀</text>
					</view>
					<view class="card-desc">
						<text>区服：</text>
						<text>{{detailinfo.platforms.name}}</text>
					</view>
					<view class="card-desc">
						<text>模式：</text>
						<text>墨家机关道1V1</text>
					</view>
					<view class="card-desc">
						<text>胜利条件：</text>
						<text>率先摧毁敌方水晶获胜</text>
					</view>
					<view class="card-desc">
						<text>发布方禁用职业：</text>
						<text>{{detailinfo.release_ban}}</text>
					</view>
					<view class="card-desc">
						<text>接受方禁用职业：</text>
						<text>{{detailinfo.partake_ban}}</text>
					</view>
					<view class="card-desc">
						<text>参赛金额：</text>
						<text>双方各出{{detailinfo.amount}}帮币（含手续费）</text>
					</view>
				</view>
			</view>
			<view class="info-card">
				<view class="card-title">奖程规则</view>
				<view class="card-box">
					<view class="desc">
						<text>胜利者可赢得奖金 </text>
						<text class="red">{{detailinfo.totalAmount}}帮币</text>
					</view>
					<view class="desc">
						发起挑战后，如对手超过
						<text class="red">30.00分钟</text>
						未启动，补偿您
						<text class="red">{{detailinfo.totalAmount*0.75}}帮币</text>                                       
					</view>
				</view>
			</view>

			<view class="info-card">
				<view class="card-title">对战双方</view>
				<view class="card-box d-flex jc-between">
					<view class="avatar-box">
						<view class="avatar">
							<image v-if="detailinfo.user_role.id === detailinfo.winner" class="win" src="../../static/img/other/win.png" mode="aspectFit"></image>
							<image :src="detailinfo.user.avatar" mode="aspectFit"></image>
						</view>
						<view class="text text-overflow">{{detailinfo.user_role.role_name}}</view>
						<view class="text">{{detailinfo.release_ready?'已准备':'未准备'}}</view>
						<!-- <view class="text">{{detailinfo.release_ready?'已准备':detailinfo.showStatus}}</view> -->
					</view>
					<view class="vs d-flex">
						<!-- <view v-if="detailinfo.status === 5" class="text">{{detailinfo.user_role.id === detailinfo.winner ? '胜方' : '败方'}}</view> -->
						<image src="../../static/img/other/vs.png"></image>
						<!-- <view v-if="detailinfo.status === 5" class="text">{{detailinfo.partake.id === detailinfo.winner ? '胜方' : '败方'}}</view> -->
					</view>
					<view class="avatar-box" v-if="detailinfo.partake_role">
						<view class="avatar">
							<image v-if="detailinfo.partake.id === detailinfo.winner" class="win" src="../../static/img/other/win.png" mode="aspectFit"></image>
							<image :src="detailinfo.partake.avatar" mode="aspectFit"></image>
						</view>
						<view class="text text-overflow">{{detailinfo.partake_role.role_name || '请选择'}}</view>
						<view class="text">{{detailinfo.partake_ready?'已准备':'未准备'}}</view>
						<!-- <view class="text">{{detailinfo.partake_ready?'已准备':detailinfo.showStatus}}</view> -->
					</view>
					<view class="avatar-box" v-else @tap="toSelect">
						<view class="avatar"></view>
						<view class="text text-overflow" v-if="detailinfo.user_role.id !== userinfo.id">{{role.role_name || '请选择'}}</view>
						<view class="text text-overflow" v-else>待对方选择</view>
					</view>
				</view>
				<!-- <view class="btn-box">
					<button>联系对手</button>
				</view> -->
			</view>
			
			<!-- <view class="consult" v-if="detailinfo.winners">
				胜利者：<text style="color: red;">{{detailinfo.winners.name}}</text>
			</view>
			<view class="imglist" v-if="JSON.stringify(detailinfo.images)!='[]'">
				<view class="imgcont">
					<image :src="list" mode="widthFix" v-for="(list,index) in detailinfo.images[0].images" :key="index"></image>
				</view>
			</view>
			<view class="imglist" v-if="JSON.stringify(detailinfo.images)!='[]' && detailinfo.images[1] ">
				<view class="imgcont">
					<image :src="list" mode="widthFix" v-for="(list,index) in detailinfo.images[1].images" :key="index"></image>
				</view>
			</view> -->

			<view class="info-card" v-if="type!=1&&type!=2">
				<view class="card-title">英雄禁用</view>
				<view class="card-box d-flex jc-between">
					<view class="zylist">
						<view class="zyitem" v-for="(list,index) in zydata" :key="index" :class="{check:checkzy==list.value}" @click="checkzy=list.value">
							{{list.text}}
						</view>
					</view>
				</view>
			</view>

			
			
			<!-- <view class="info-card">
				<view class="card-title">订单流程</view>
				<view class="card-box steps-box">
					<evan-steps :active="stepsActive" direction="horizontal" primaryColor="#00CB82">
						<block v-for="item in stepsList" :key="item.id">
							<evan-step :title="item.title"></evan-step>
						</block>
					</evan-steps>
				</view>
			</view> -->
		</view>
		<view class="fixed-btn d-flex" v-if="(detailinfo.status==1&&userinfo.id==detailinfo.user.id)||detailinfo.status==2">
			<view class="btn flex-1 d-flex ai-center jc-center" @tap="cancel" v-if="detailinfo.status==1&&userinfo.id==detailinfo.user.id">
				<view class="go">取消对战</view>
			</view>
			<view class="btn flex-1 d-flex ai-center jc-center" @tap="start" style="margin-left: 10rpx;" v-if="detailinfo.status==2">
				<view class="go">开始对战</view>
			</view>
		</view>
		<view class="fixed-btn d-flex" v-if="((type==1&&detailinfo.release_finish==0&&detailinfo.status==3) || (type==1&&detailinfo.release_finish==0&&detailinfo.status==4)) ||　((type==2&&detailinfo.partake_finish==0&&detailinfo.status==3) || (type==2&&detailinfo.partake_finish==0&&detailinfo.status==4)) ">
				<view class="btn flex-1 d-flex ai-center jc-center" @tap="result">
						<view class="go">结算上传</view>
				</view>
				<view class="btn flex-1 d-flex ai-center jc-center" @tap="apeal" style="margin-left: 10rpx;">
						<view class="go">申诉</view>
				</view>
		</view>
		<view class="fixed-btn d-flex" v-if="detailinfo.status==6">
			<view class="btn flex-1 d-flex ai-center jc-center" @tap="apealdetial">
				<view class="go">申诉详情</view>
			</view>
		</view>
		<view class="fixed-btn d-flex" v-if="detailinfo.status==1&&userinfo.id!=detailinfo.user.id">
			<view class="btn flex-1 d-flex ai-center jc-center" @tap="open">
				<view class="pay">支付{{detailinfo.amount}}帮币</view>
				<view class="go">发起挑战</view>
			</view>
		</view>
		<custom-popup :title="title" ref="pay" @confirm="payConfirm" @cancel="close"/>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import CustomPopup from '@/components/custom-popup/custom-popup.vue'
	import EvanSteps from '@/components/evan-steps/evan-steps.vue'
	import EvanStep from '@/components/evan-steps/evan-step.vue'
	export default {
		components: {
			EvanSteps,
			EvanStep,
			CustomPopup
		},
		data() {
			return {
				stepsList: [{
					id: 1,
					title: '双方确认'
				}, {
					id: 2,
					title: '等待结果'
				}, {
					id: 3,
					title: '结算审核'
				}],
				stepsActive: 1,
				detailinfo:{
					platforms:{
						name:''
					},
					user_role:{
						role_name:''
					},
					images:[],
					partake: {},
					user: {},
					winners: {}
				},
				match_id:'',
				checkzy:0,
				zydata: [{
						text: "不限",
						value: 0
					},
					{
						text: "法师",
						value: 1
					},
					{
						text: "刺客",
						value: 2
					},
					{
						text: "战士",
						value: 3
					},
					{
						text: "坦克",
						value: 4
					},
					{
						text: "辅助",
						value: 5
					},
					{
						text: "射手",
						value: 6
					}
				],
				type:'',
				userinfo:{}
			}
		},
		computed: {
			... mapState({
				// 箭头函数可使代码更简练
				role: state => state.role
			}),
			title() {
				return `是否确认支付${this.detailinfo.amount}帮币发起挑战`
			}
		},
		methods: {
			getuserinfo(){
				let that=this
				return new Promise((resolve, reject)=>{
					uni.getStorage({
						key: 'userinfo',
						success:(ress)=>{
							that.userinfo=ress.data
							resolve(ress.data)
						},
						fail() {
							resolve('')
						}
					})
				})
			},
			apealdetial(){
				uni.navigateTo({
					url:'../appealpkdetail/appealpkdetail?id='+this.detailinfo.appeal_id+'&orderid='+this.match_id
				})
			},
			result(){
				uni.navigateTo({
					url:'../uploadresults/uploadresults?id='+this.match_id
				})
			},
			apeal(){
				uni.navigateTo({
					url:'../appealpk/appealpk?id='+this.match_id
				})
			},
			toSelect() {
				if (this.detailinfo.status !== 7 && this.userinfo.id !== this.detailinfo.user.id) {
					uni.navigateTo({
						url: "../opposingrole/opposingrole?type=1"
					})
				}
			},
			cancel(){
				let opts = {
					url: '/api/match/cancel',
					method: 'put'
				}
				let params = {
					match_id: this.match_id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					uni.navigateBack({
						delta:1
					})
							
				}, error => {
					console.log(error);
				})
			},
			start(){
				let opts = {
					url: '/api/match/begin',
					method: 'post'
				}
				let params = {
					match_id: this.match_id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					this.getlist()
					// uni.navigateBack({
					// 	delta:1
					// })
				}, error => {
					console.log(error);
				})
			},
			// 获取详情
			getlist() {
				let opts = {
					url: `/api/match/show`,
					method: 'get'
				}
				let params = {
					match_id: this.match_id
				}
				return this.$http.httpTokenRequest(opts, params).then(res => {
					if (res.data.code == 200) {
						this.detailinfo=res.data.data
					}
				}, error => {
					console.log(error);
				})
			},
			//提交
			nextStep: function() {
				let opts = {
					url: '/api/match/partake',
					method: 'post'
				}
				let params = {
					partake_game_role_id: this.role.id,
					partake_ban: this.checkzy,
					match_id: this.match_id
				}
				this.$http.httpTokenRequest(opts, params).then(res => {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
					if(res.data.code==200){
						setTimeout(() => {
							uni.redirectTo({
								url: '../acceptthewar/acceptthewar'
							})
						}, 500)
					}
				}, error => {
					console.log(error);
				})
			},
			open() {
				if(!this.role.id){
					uni.showToast({
						icon:'none',
						title:'请选择角色'
					})
					return false
				}
				this.$refs['pay'].open()
			},
			close() {
				this.$refs['pay'].close()
			},
			payConfirm() {
				this.nextStep()
				this.close()
			}
		},
		async onLoad(option) {
			this.match_id = JSON.parse(option.list).id
			this.type = option.type
			this.getuserinfo()
		},
		onShow() {
			this.getlist()
		}
	}
</script>

<style lang="scss">
	page{
		padding: 0 20rpx;
		background-color: #F0F0F0;
		box-sizing: border-box;
	}
	.battle-details{
		width: 100%;
		padding-bottom: 118rpx;
		font-family: SimHei;
		font-weight: bold;
		.container{
			padding-bottom: 20rpx;
			.info-card{
				margin-top: 14rpx;
				border-radius: 15rpx;
				background-color: #fff;
				.card-title{
					padding: 26rpx 20rpx;
					border-bottom: 1px solid #F0F0F0;
					font-size: 26rpx;
					color:rgba(51,51,51,1);
					line-height: 26rpx;
				}
				.card-box{
					box-sizing: border-box;
					padding: 15rpx 20rpx;
					&.steps-box{
						padding: 30rpx 20rpx 15rpx;
					}
					.card-desc{
						padding: 15rpx 0;
						line-height: 26rpx;
						text{
							font-size: 26rpx;
							color:rgba(134,134,134,1);
						}
					}
					.desc{
						font-size: 26rpx;
						color:rgba(134,134,134,1);
						text.red{
							color: red;
						}
					}
					.vs{
						margin-top: 53.5rpx;
						image{
							display: block;
							padding: 0 20rpx;
							width: 60rpx;
							height: 81rpx;
						}
						.text{
							height: 81rpx;
							line-height: 81rpx;
						}
					}
					.avatar-box{
						width: 188rpx;
						.avatar{
							position: relative;
							width: 188rpx;
							height: 188rpx;
							border: 1rpx dashed #BEBEBE;
							display: flex;
							justify-content: center;
							align-items: center;
							overflow: hidden;
							box-sizing: border-box;
							.win{
								position: absolute;
								right: 0;
								top: 0;
								z-index: 1;
								width: 40rpx;
								height: 40rpx;
							}
							image{
								width: 100%;
							}
						}
						.text{
							padding: 20rpx 0;
							font-size: 26rpx;
							color:rgba(134,134,134,1);
							text-align: center;
							line-height: 26rpx;
						}
					}
				}
				.btn-box{
					padding:0 20rpx 20rpx;
					button{
						font-size: 30rpx;
						color:rgba(51,51,51,1);
					}
				}
			}
		}
		.fixed-btn{
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 118rpx;
			padding: 15rpx 20rpx;
			background-color: #fff;
			box-sizing: border-box;
			.btn{
				border-radius: 8rpx;
				background-color: #00CB82;
				.pay{
					padding-right: 32rpx;
					font-size: 26rpx;
					color:rgba(255,255,255,1);
				}
				.go{
					font-size: 36rpx;
					color:rgba(255,255,255,1);
				}
			}
		}
	}
	.zylist {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background: #fff;
		padding: 20rpx;
	}
	
	.zylist .zyitem {
		border: 2rpx solid #01A861;
		color: #01A861;
		font-size: 24rpx;
		width: 200rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
		border-radius: 10rpx;
		margin-top: 20rpx;
	}
	
	.zylist .zyitem.check {
		background: #01A861;
		color: #fff;
	}
	.imglist {
		display: flex;
		flex-wrap: wrap;
		background: #fff;
		.imgcont{
			width: 50%;
			height: 400rpx;
			box-sizing: content-box;
			padding: 10rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			image{
				width: 100%;
			}
		}
	}
	.consult{
		background: #fff;
	}
</style>
