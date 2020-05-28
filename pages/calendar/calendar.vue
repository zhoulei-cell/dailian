<template>
	<view class="calendar-content">
		<uni-section title="每日签到可得奖励" type="line"></uni-section>
		<view>
			<!-- 插入模式 -->
			<uni-calendar :selected="info.selected" :showMonth="false" @change="change" @monthSwitch="monthSwitch" />
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
				}
			}
		},
		methods: {
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
							console.log(res.data.data)
							for (var i = 0; i < res.data.data.length; i++) {
								let date=res.data.data[i].created_time.split(' ')
								this.info.selected.push({
									date: date[0],
									info: '已签到'
								})
								console.log(this.info.selected)
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

					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
				}, error => {
					console.log(error);
				})
			}
		},
		onLoad() {
			let date=new Date()
			let time=util.dateFormat('YYYY-mm',date)
			this.getsignlist(time+'-01',time+'-31')
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

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
</style>
