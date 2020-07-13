<template>
	<view class="release-order">
		<view class="wrapper">
			<!-- 段位信息 -->
			<view class="list-group">
				<view class="list-title">基本信息</view>
				<picker mode="multiSelector" @change="bindPickerChange" @columnchange="columnchange" :value="multiIndex" :range="multiArray" :range-key="'name'">
					<view class="list-item">
						<view class="item-title">选择区服</view>
						<view class="item-text d-flex ai-center jc-between">
							<input class="text" disabled="disabled" v-model="info.area" placeholder="请在此选择..." placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</picker>
				<custom-picker :array="data.segment" @confirm="originSegment">
					<view class="list-item">
						<view class="item-title">当前段位</view>
						<view class="item-text d-flex ai-center jc-between">
							<input disabled="disabled" placeholder="当前段位" v-model="info.current_segment" class="text" placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</custom-picker>
				<custom-picker :array="data.segment" @confirm="targetSegment">
					<view class="list-item">
						<view class="item-title">目标段位</view>
						<view class="item-text d-flex ai-center jc-between">
							<input disabled="disabled" placeholder="目标段位" v-model="info.tag_segment" class="text" placeholder-class="placeholder"/>
							<image src="../../static/img/other/left.png" mode="scaleToFill"></image>
						</view>
					</view>
				</custom-picker>
				<view class="list-item">
					<view class="item-title">订单价格</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.price" placeholder="请在此输入" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">铭文等级</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.inscription_level" placeholder="请在此输入" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">英雄个数</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.hero_num" placeholder="请在此输入" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">时限要求(写1表示1小时)</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.duration" placeholder="请在此输入" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 段位信息 -->
			<!-- 联系方式 -->
			<view class="list-group">
				<view class="list-title">联系方式</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">电话号码</view>
						<input class="flex-1" type="text" v-model="info.rel_phone" placeholder="请填写常用联系方式" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">QQ号码或微信</view>
						<input class="flex-1" type="text" v-model="info.rel_qq" placeholder="请填写QQ" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 联系方式 -->

			<!-- 账号信息 -->
			<view class="list-group">
				<view class="list-title">账号信息</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">游戏账号</view>
						<input class="flex-1" type="text" v-model="info.game_account" placeholder="请填写正确的游戏账号" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">账号密码</view>
						<input class="flex-1" type="text" v-model="info.game_password" placeholder="请填写正确的账号密码" placeholder-class="placeholder"/>
					</view>
				</view>
				<view class="list-item">
					<view class="item-box d-flex ai-center jc-between">
						<view class="left">游戏角色</view>
						<input class="flex-1" type="text" v-model="info.game_role_name" placeholder="请填写正确的游戏角色" placeholder-class="placeholder"/>
					</view>
				</view>
			</view>
			<!-- 账号信息 -->

			<!-- 服务保障 -->
			<view class="list-group">
				<view class="list-title">服务保障</view>
				<view class="list-item">
					<view class="item-title">安全保证金</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.promise_price" placeholder="请输入安全保证金" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">效率保证金</view>
					<view class="item-text d-flex ai-center jc-between">
						<input class="text flex-1" v-model="info.eff_price" placeholder="请输入效率保证金" placeholder-class="placeholder"/>
						<view class="money">（元）</view>
					</view>
				</view>
				<view class="list-item">
					<view class="item-title">增值业务</view>
					<view class="item-text d-flex ai-center jc-between">
						<text class="flex-1 placeholder">同省可接</text>
						<view>
							<checkbox-group>
								<label>
									<checkbox value="cb" :checked="province" @tap="province =! province" />
								</label>
							</checkbox-group>
						</view>
					</view>
				</view>
			</view>
			<!-- 服务保障 -->

			<!-- 游戏详细信息 -->
			<view class="list-group">
				<view class="list-title">游戏详细信息</view>
				<view class="list-item last">
					<textarea class="textarea" v-model="info.rel_message" placeholder-class="placeholder" placeholder="请填写游戏详情信息，如：xx个英雄xx级铭文"></textarea>
				</view>
			</view>
			<!-- 游戏详细信息 -->
		</view>

		<view class="next">
			<button  type="default" @tap="confirmOrder">确认发布</button>
		</view>
	</view>
</template>

<script>
	import * as check from "../../common/ckeck"
	import customPicker from '../../components/custom-picker'
	import data from '../../common/area'
	export default {
		components: {
			customPicker
		},
		data() {
			return {
				data,
				areaArr: [[0],[0]],
				province: false,
				info: {
					area: '',
					title: '',
					game_id: '1',
					platform_id: '',
					game_area_id: '',
					current_segment: '',
					tag_segment: '',
					price: '',
					rel_phone: '',
					rel_qq: '',
					game_account: '',
					game_password: '',
					game_role_name: '',
					promise_price: '',
					eff_price: '',
					rel_message: '',
					inscription_level: '',
					duration: '',
					hero_num: '',
					province: 0,
					lat: '',
					lon: ''
				},
				multiArray: [
					[0],
					[0]
				],
				multiIndex: [0, 0],
			}
		},
		methods: {
			check() {
				if (!check.checkNoThing(this.info.area)) {
					uni.showToast({
						icon: 'none',
						title: '请选择游戏区服'
					})
					return false
				}
				if (!check.checkNoThing(this.info.current_segment)) {
					uni.showToast({
						icon: 'none',
						title: '请选择当前段位'
					})
					return false
				}
				if (!check.checkNoThing(this.info.tag_segment)) {
					uni.showToast({
						icon: 'none',
						title: '请选择目标段位'
					})
					return false
				}
				if (!check.checkMoney(this.info.price)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的订单价格'
					})
					return false
				}
				if (!check.checkLevel(this.info.inscription_level)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的铭文等级'
					})
					return false
				}
				if (!check.checkHeroNum(this.info.hero_num)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的英雄个数'
					})
					return false
				}
				if (!check.checkDuration(this.info.duration)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的时间限制'
					})
					return false
				}
				if (!check.checkPhone(this.info.rel_phone)) {
					uni.showToast({
						icon: 'none',
						title: '请填写正确的手机号'
					})
					return false
				}
				if (!check.checkNoThing(this.info.rel_qq)) {
					uni.showToast({
						icon: 'none',
						title: '请填写QQ号或者微信'
					})
					return false
				}
				if (!check.checkNoThing(this.info.game_account)) {
					uni.showToast({
						icon: 'none',
						title: '游戏账号不能为空'
					})
					return false
				}
				if (!check.checkNoThing(this.info.game_password)) {
					uni.showToast({
						icon: 'none',
						title: '游戏密码不能为空'
					})
					return false
				}
				if (!check.checkNoThing(this.info.game_role_name)) {
					uni.showToast({
						icon: 'none',
						title: '游戏角色不能为空'
					})
					return false
				}
				if (!check.checkNoThing(this.info.promise_price)) {
					uni.showToast({
						icon: 'none',
						title: '安全保证金不能为空'
					})
					return false
				}
				if (!check.checkNoThing(this.info.eff_price)) {
					uni.showToast({
						icon: 'none',
						title: '效率保证金不能为空'
					})
					return false
				}
				return true
			},
			//确认订单
			confirmOrder() {
				if (this.check()) {
					this.info.title = this.info.area + this.info.current_segment + "到" + this.info.tag_segment 
					this.info.province = this.info.province ? 1 : 0;
					this.releaseOrder()
				} 
			},
			//当前段位
			originSegment(sm) {
				this.info.current_segment = sm
				console.log(sm)
			},
			//目标段位
			targetSegment(sm) {
				this.info.tag_segment = sm
			},
			// 发布订单
			releaseOrder() {
				let opts = {
						url: '/api/order/release',
						method: 'post'
				}
				this.$http.httpTokenRequest(opts, this.info).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						setTimeout(() => {
							uni.navigateTo({
								url:'../orderrelease/orderrelease'
							})
						}, 500)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}, error => {
					console.log(error);
				})
			},
			// 获取游戏平台
			getGameplatforms() {
				let opts = {
					url: '/api/game/platforms?game_id=1',
					method: 'get'
				}
				this.$http.httpRequest(opts).then(res => {
					if (res.data.code == 200) {
						const data = res.data.data
						this.multiArray[0] = data
						this.getGameAreas(data[0].id)
					}
				}, error => {
					console.log(error);
				})
			},
			//根据平台获取区
			getGameAreas(id) {
				let opts = {
					url: '/api/game/areas?platform_id=' + id,
					method: 'get'
				}
				this.$http.httpRequest(opts).then(res => {
					if (res.data.code == 200) {
						const data = res.data.data;
						this.multiArray[1] = data
						this.$forceUpdate()
					}
				}, error => {
					console.log(error);
				})
			},
			// 获取定位
			getlocation() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						this.info.lat = res.latitude
						this.info.lon = res.longitude
					},
					fail: function(res) {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: '获取定位失败'
						// })
					},
				})
			},
			 //绑定选择
			bindPickerChange(e) {
				//console.log(e)
				const value = e.detail.value
				this.multiIndex = value
				this.info.area = this.multiArray[0][value[0]].name + this.multiArray[1][value[1]].name
				this.info.platform_id = this.multiArray[0][value[0]].id
				this.info.game_area_id = this.multiArray[1][value[1]].id
			},
			// 获取二级分类
			columnchange(e) {
				// 当滚动切换一级分类时，为当前的一级分类添加它的子类
				if (e.detail.column == 0) {
					let id = this.multiArray[e.detail.column][e.detail.value].id
					this.getGameAreas(id)
				}
			}
		},
		onLoad() {
			this.getGameplatforms()
			this.getlocation()
		}
	}
</script>

<style lang="scss">
	.release-order{
		width: 100%;
		.wrapper{
			padding-bottom: 120rpx;
			.list-group{
				font-family: SimHei;
				font-weight: 400;
				.list-title{
					height: 90rpx;
					padding-left: 41rpx;
					background:rgba(244,244,244,1);
					font-size: 28rpx;
					color:rgba(51,51,51,1);
					line-height: 90rpx;
				}
				.list-item{
					padding: 18rpx 41rpx;
					background-color: #fff;
					&.last{
						border-bottom: 10rpx solid rgba(244,244,244,1);
					}
					.placeholder{
						font-size: 24rpx;
						color:rgba(153,153,153,1);
						line-height: 70rpx;
					}
					textarea{
						color:rgba(51,51,51,1);
						font-size: 24rpx;
						line-height: 70rpx;
					}
					.item-box{
						border-bottom: 1rpx solid #ccc;
						.left{
							font-size: 28rpx;
							color:rgba(51,51,51,1);
							line-height: 70rpx;
						}
						&>input{
							font-size: 24rpx;
							color:#000;
							line-height: 70rpx;
						}
					}
					.item-title{
						font-size: 28rpx;
						color:rgba(51,51,51,1);
						line-height: 70rpx;
					}
					.item-text{
						padding-bottom: 15rpx;
						border-bottom: 1rpx solid #ccc;
						input{
							font-size: 24rpx;
							color:#000;
							line-height: 70rpx;
						}
						image{
							width: 21rpx;
							height: 31rpx;
						}
						.money{
							font-size: 24rpx;
							color:rgba(153,153,153,1);
						}
					}
				}
			}
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
	}
</style>
