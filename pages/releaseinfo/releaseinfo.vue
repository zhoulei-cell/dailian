<template>
	<view class="content">
		<view class="conright">
			<form @submit="formSubmit">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏分类
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" value="王者荣耀" disabled="true" style="text-align: right;" />
							<view class="right">
								<image src="../../static/img/right.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							订单标题
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="title" placeholder="请输入订单标题" v-model="orderInfo.title" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏区服
						</view>
						<view class="uni-list-cell-db">
							<picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="multiIndex" :range="multiArray"
							 :range-key="'name'" style="flex: 1;">
								<view class="uni-input">{{multiArray[0][multiIndex[0]].name || ''}},{{multiArray[1][multiIndex[1]].name || ''}}</view>
							</picker>
							<view class="right">
								<image src="../../static/img/right.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							铭文等级
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="inscription_level" placeholder="请输入铭文等级" v-model="orderInfo.inscription_level" type="number" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							英雄个数
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="hero_num" placeholder="请输入英雄个数" v-model="orderInfo.hero_num" type="number" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							当前段位
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="current_segment" placeholder="请输入当前段位" v-model="orderInfo.current_segment" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							目标段位
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="tag_segment" placeholder="请输入目标段位" v-model="orderInfo.tag_segment" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							订单价格
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="price" placeholder="请输入订单价格" v-model="orderInfo.price" type="number" />
							<view class="tag">元</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							时限要求
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="duration" placeholder="请输入时限要求" v-model="orderInfo.duration" type="number" />
							<view class="tag">小时</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏账号
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="game_account" placeholder="请输入游戏账号" v-model="orderInfo.game_account" type="number" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏密码
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="game_password"  placeholder="请输入游戏密码" v-model="orderInfo.game_password" type="text" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏角色名
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input"  name="game_role_name"  placeholder="请输入游戏角色明" v-model="orderInfo.game_role_name" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							安全保障金
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="promise_price"  placeholder="请输入安全保障金" v-model="orderInfo.promise_price" type="number" />
							<view class="tag">元</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							效率保证金
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="eff_price"  placeholder="请输入效率保证金" v-model="orderInfo.eff_price" type="number" />
							<view class="tag">元</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							游戏信息
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="rel_message" placeholder="请填写英雄、铭文等信息" v-model="orderInfo.rel_message" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							增值服务
						</view>
						<view class="uni-list-cell-db">
							<view style="flex: 1;"></view>
							<view class="right" style="padding: 14rpx 0;width: 300rpx;">
								<checkbox-group>
									<label>
										<checkbox value="cb" :checked="orderInfo.province" @tap="orderInfo.province=!orderInfo.province" />省内代理员可接<text></text>
									</label>
								</checkbox-group>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							联系手机
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="rel_phone"  placeholder="请输入联系手机" v-model="orderInfo.rel_phone" type="number" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							联系QQ
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" name="rel_qq"  placeholder="请输入联系QQ" v-model="orderInfo.rel_qq" type="number" />
						</view>
					</view>
				</view>
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							代练要求
						</view>
						<view class="uni-list-cell-db">
							<input class="uni-input" placeholder="接单者半小时内上传好友排行段位首图..." disabled="true" style="text-align: right;" />
							<view class="right">
								<image src="../../static/img/right.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
				<view class="att">
					温馨提示：订单默认选中为“公共频道”，即大厅内的“普通”订单，便于用户查看和出售。
				</view>
				<view class="line2">
					<checkbox-group>
						<label>
							<checkbox value="cb" checked="true" disabled />我已阅读并接受<text>发单协议</text>
						</label>
					</checkbox-group>
				</view>
				<view class="next">
					<button type="default" form-type="submit">确认发布</button>
				</view>
			</form>
		</view>
	</view>
</template>
<script>
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				extraIcon1: {
					color: '#007aff',
					size: '22',
					type: 'gear-filled'
				},
				multiArray: [
					[0],
					[0]
				],
				multiIndex: [0, 0],
				orderInfo: {
					title: '',
					game_id: '1',
					platform_id: '',
					game_area_id: '',
					inscription_level: '',
					current_segment: '',
					tag_segment: '',
					duration: '',
					price: '',
					promise_price: '',
					eff_price: '',
					hero_num: '',
					game_account: '',
					game_password: '',
					game_role_name: '',
					province: true,
					lon: '',
					lat: '',
					rel_qq: '',
					rel_phone: ''
				},
				lat: '',
				lon: '',
			}
		},
		components: {},
		computed: {

		},
		onShow() {
			this.getGameplatforms()
			this.getlocation()
		},
		methods: {
			// 获取游戏平台
			getGameplatforms() {
				let opts = {
					url: '/api/game/platforms?game_id=1',
					method: 'get'
				}
				this.$http.httpRequest(opts).then(res => {
					if (res.data.code == 200) {
						this.multiArray[0] = res.data.data
						this.getGameAreas(res.data.data[0].id)
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
						this.multiArray[1] = res.data.data
						this.$forceUpdate()
					}
				}, error => {
					console.log(error);
				})

			},
			formSubmit(e) {
				var rule = [
				    {name:"title",checkType:"notnull", errorMsg:"标题不能为空"},
					{name:"hero_num",checkType:"notnull", errorMsg:"铭文等级不能为空"},
					{name:"current_segment",checkType:"notnull", errorMsg:"当前段位不能为空"},
					{name:"tag_segment",checkType:"notnull", errorMsg:"目标段位不能为空"},
					{name:"price",checkType:"notnull", errorMsg:"订单价格不能为空"},
					{name:"duration",checkType:"notnull", errorMsg:"时限不能为空"},
					{name:"game_account",checkType:"notnull", errorMsg:"游戏账号不能为空"},
					{name:"game_password",checkType:"notnull", errorMsg:"游戏密码不能为空"},
					{name:"game_role_name",checkType:"notnull", errorMsg:"游戏角色名不能为空"},
					{name:"game_role_name",checkType:"notnull", errorMsg:"qq不能为空"},
					{name:"rel_phone",checkType:"phoneno", errorMsg:"电话不能为空"}
				]
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					const newobj = this.orderInfo
					newobj.platform_id = this.multiArray[0][this.multiIndex[0]].id
					newobj.game_area_id = this.multiArray[1][this.multiIndex[1]].id
					newobj.province = this.orderInfo.province ? 1 : 0
					newobj.lat = this.lat
					newobj.lon = this.lon
					let opts = {
						url: '/api/order/release',
						method: 'post'
					}
					this.$http.httpTokenRequest(opts, Object.assign(newobj)).then(res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
							setTimeout(() => {
								uni.navigateBack({
									delta:1
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
				}else{
				    uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			// 获取定位
			getlocation() {
				var _this = this
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						_this.lat = res.latitude
						_this.lon = res.longitude
					},
					fail: function(res) {

					},
				})
			},
			bindMultiPickerColumnChange: function(e) {
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)
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
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			}
		},
	}
</script>
<style>
	.content {
		background-color: #f4f8fb;
		padding: 0 20rpx;
		position: relative;
		padding-bottom: 150rpx;
	}

	.uni-list {
		background: none !important;
	}

	.uni-list:after {
		background: none !important;
	}

	.uni-list-cell-db {
		border-bottom: 1px solid rgba(220, 220, 220, 1) !important;
		display: flex;
		align-items: center;
	}

	.uni-list::before {
		background: none;
		height: 0 !important;
	}

	.uni-list-cell-left {
		width: 140rpx !important;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(128, 128, 128, 1);
		padding: 0 !important;
	}

	.uni-input {
		background: none !important;
		text-align: right !important;
	}

	.uni-list-cell-db .right {
		display: flex;
		align-items: center;
	}

	.uni-list-cell-db .right image {
		width: 13px;
		height: 22px;
	}

	.uni-list-cell-db input {
		text-align: right !important;
	}

	.uni-list-cell-db .tag {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.att {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		padding: 40rpx 0;
	}

	.line2 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 203, 130, 1);
		line-height: 25rpx;
		display: flex;
		align-items: center;
	}

	.next {
		position: fixed;
		bottom: 0;
		width: 100%;
		left: 0;
		height: 120rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 2px -3px 5px 0px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;
		padding: 20rpx 24rpx;
	}

	.next button {
		width: 100%;
		height: 80rpx;
		background: rgba(0, 203, 130, 1);
		box-shadow: 0px 6rpx 6rpx 0px rgba(0, 0, 0, 0.1);
		border-radius: 15rpx;
		line-height: 80rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	/* #ifdef APP-PLUS */
	.next {
		bottom: 0;
	}

	/* #endif */
	.orderlist .item {
		display: flex;
		padding: 30rpx 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.1);
		border-radius: 15px;
		margin-top: 20rpx;
		position: relative;
	}

	.orderlist .item .tag1 {
		position: absolute;
		right: 0;
		top: 0;
		width: 78rpx;
		height: 78rpx;
	}

	.orderlist .item .tag1 image {
		width: 100%;
		height: 100%;
	}

	.orderlist .item .itemimg {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 20rpx;
	}

	.orderlist .item .itemimg image {
		width: 131rpx;
		height: 131rpx;
	}

	.orderlist .itemright {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.orderlist .itemright .title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 203, 130, 1);
	}

	.orderlist .itemright .desc {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.orderlist .itemright .fabuzhe {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.orderlist .itemright .comfirm {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		display: flex;
		align-items: center;
	}

	.orderlist .itemright .tag {
		padding: 0 10rpx;
	}
</style>
