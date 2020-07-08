<template>
	<view class="contact-us">
		<view class="logo d-flex jc-center">
			<image src="../../static/img/logo/logo.png" mode="widthFix"></image>
		</view>
		<view class="wrapper">
			<view class="list d-flex jc-between top">
				<view class="title">工作时间</view>
				<view class="text">周一至周六 9:00-6:30</view>
			</view>
			<block v-for="item in dataList" :key="item.id"> 
				<view class="list d-flex jc-between" @tap="call(item.phone)">
					<view class="title">客服电话</view>
					<view class="text">{{item.phone}}</view>
				</view>
			</block>
			<view class="tips">Tips:请尽量在工作时间拨打客服电话,我们的客服人员将竭尽全力为您解决问题</view>
		</view>
		<custom-popup ref="popup" title="您确定要拨打电话给客服吗？" @cancel="close" @confirm="confirm"/>
	</view>
</template>

<script>
	import customPopup from '../../components/custom-popup/custom-popup'
	export default {
		data() {
			return {
				phone: '',
				dataList: [
					{
						id: 0,
						phone: '15390230990'
					},
					{
						id: 1,
						phone: '100000-00-00'
					},
					{
						id: 3,
						phone: '100000-00-00'
					}
				]
			};
		},
		methods: {
			call(phone) {
				this.open()
				this.phone = phone
			},
			close() {
				this.$refs['popup'].close()
			},
			open() {
				this.$refs['popup'].open()
			},
			confirm() {
				this.close()
				uni.makePhoneCall({
					phoneNumber: this.phone,
					success(e) {

					},
					fail(e) {
						uni.showTost({
							icon: 'none',
							title: '拨打电话失败'
						})
					}
				})
			}
		},
		components: {
			customPopup
		}
	}
</script>

<style lang="scss">
	.contact-us{
		.logo{
			padding: 39upx 0 68upx 0;
			image{
				width: 185upx;
				height: 185upx;
			}
		}
		.wrapper{
			font-family: SimHei;
			font-weight: 400;
			color:rgba(153,153,153,1);
			.list{
				padding: 28upx 20upx;
				border-bottom: 1upx solid #DBDADA; 
				&.top{
					border-top: 1upx solid #DBDADA;
				}
				.title{
					font-size: 28upx;
					line-height: 28upx;
				}
				.text{
					font-size: 28upx;
					line-height: 28upx;
					color:rgba(85,85,85,1);
				}
			}
			.tips{
				padding: 20upx;
				font-size: 25upx;
				line-height: 45upx;
			}
		}
	}
</style>
