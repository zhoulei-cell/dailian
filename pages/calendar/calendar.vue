<template>
	<view class="content">
		<view class="cltop">
			<view class="clcont">
				<view class="left">
					<view class="lefttop">已连续签到</view>
					<view class="leftbottom"><text>{{daylx}}</text>天</view>
				</view>
				<view class="right">
					<button @tap="lisign">{{calendarText}}</button>
				</view>
			</view>
		</view>
		<view class="calendar-content">
			<view>
				<!-- 插入模式 -->
				<uni-calendar :selected="info.selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
			</view>
		</view>
	</view>
</template>

<script>
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import util from '@/common/util.js'
	export default {
		components: {
			uniSection,
			uniCalendar
		},
		data() {
			return {
				info: {
					date: '2019-08-15',
					startDate: '2019-06-15',
					endDate: '2019-010-15',
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
				daylx:0,
				calendarText: "立即签到"
			}
		},
		methods: {
			// 立即签到
			async lisign(){
				var date = new Date()
				var datetime = util.getTime(date)
				await this.sign()
				let time = util.dateFormat('YYYY-mm',date)
				this.getsignlist(time+'-01',time+'-31')
			},
			async change(e) {
				var date = new Date()
				var datetime = util.getTime(date)
				if (e.fulldate == datetime) {
					await this.sign()
					this.info.selected.push({
						date: datetime,
						info: '已签到'
					})
				}
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
				this.getsignlist(e.year+'-'+e.month+'-01',e.year+'-'+e.month+'-31')
			},
			// 获取签到历史
			getsignlist(begin_time,end_time) {
				let opts = {
					url: '/api/signin_list',
					method: 'get'
				};
				let param = {
					days: "",
					begin_time: begin_time,
					end_time: end_time
				}
				this.$http.httpTokenRequest(opts, param).then(res => {
					if (res.data.code == 200) {
						if(res.data.data.length>0){
							//console.log(res.data.data)
							for (var i = 0; i < res.data.data.length; i++) {
								let date=res.data.data[i].created_time.split(' ')
								this.info.selected.push({
									date: date[0],
									info: '已签到'
								})
								//console.log(this.info.selected)
							}
							let num=res.data.data.length-1
							this.daylx=res.data.data[num].sign_in_num
							let date=new Date()
							let time=util.dateFormat('YYYY-mm-dd',date)
							if ( time === this.info.selected[num].date ) {
								this.calendarText = "已签到"
							}
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}, error => {
					console.log(error);
				})
			},
			// 签到
			sign() {
				let opts = {
					url: '/api/signin',
					method: 'post'
				};
				let param = {

				}
				this.$http.httpTokenRequest(opts, param).then(res => {
					if (res.data.code == 200) {
						this.calendarText = "已签到"
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}, error => {
					console.log(error);
				})
			},
			getMonthDay(year, month) {
				let days = new Date(year, month + 1, 0).getDate()
				return days
			}
		},
		onLoad() {
			let date = new Date()
			let time = util.dateFormat('YYYY-mm',date)
			//console.log(this.getMonthDay(date.getFullYear(), date.getMonth() + 1 + 2))
			this.getsignlist(time+'-01',time+'-31')
		}
	}
</script>

<style>
	.content{
		padding: 0;
		background-color: #f4f8fb;
	}
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
	}

	.calendar-button {
		flex: 1;
		font-weight: bold;
		font-size: 32rpx;
	}
	.cltop{
		padding: 20rpx;
	}
	.clcont{
		width: 100%;
		height: 265rpx;
		background: url(../../static/img/other/clender.png);
		background-size: cover;
		display: flex;
	}
	.clcont .left{
		width: 40%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 53rpx;
	}
	.clcont .left .lefttop{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.clcont .left .leftbottom{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.clcont .left .leftbottom text{
		font-size:72rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.clcont .right{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	} 
	.clcont .right button{
		width:270rpx;
		height:60rpx;
		line-height:60rpx;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
</style>
