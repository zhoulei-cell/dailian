<template>
    <!-- 删除收货地址弹出层 -->
    <uni-popup ref="showtip" type="center" :mask-click="false">
        <view class="uni-tip">
            <!--
            <text class="uni-tip-title">警告</text> -->
            <text class="uni-tip-content">{{title}}</text>
            <view class="uni-tip-group-button">
                <text class="uni-tip-button" @tap="$emit('cancel')" v-if="isCancel">取消</text>
                <text class="uni-tip-button check" @tap="$emit('confirm')">确定</text>
            </view>
        </view>
    </uni-popup>
    <!-- 删除收货地址弹出层 -->
</template>

<script>
import uniPopup from "../uni-popup/uni-popup"
export default {
    name: "customPopup",
    props: {
        title: {
            type: String,
            default: "默认的标题"
        },
        isCancel: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        open() { //打开弹出层
            this.$nextTick(() => {
                this.$refs['showtip'].open()
            })
        },
        close() {
            this.$refs['showtip'].close()
        }
    },
    components: {
        uniPopup
    }
}
</script>

<style>
    /* 提示窗口 */
    .uni-tip {
        /* #ifndef APP-NVUE */
        display: flex;
        flex-direction: column;
        /* #endif */
		width: 540upx;
        padding: 15upx;
        background-color: #fff;
        border-radius: 10upx;
		box-sizing: border-box;
    }

    .uni-tip-title {
        margin-bottom: 10upx;
        text-align: center;
        font-weight: bold;
        font-size: 16upx;
        color: #333;
    }

    .uni-tip-content {
        /* padding: 15px; */
        font-size: 30rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #444;
        text-align: center;
    }

    .uni-tip-group-button {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        margin-top: 20px;
    }

    .uni-tip-button {
        flex: 1;
        text-align: center;
        font-size: 30rpx;
        font-family: FZZhunYuan-M02;
        font-weight: 400;
        color: rgba(3,3,3,1);
    }
    
    .uni-tip-button.check{
        color: red;
    }
	/* 提示窗口 */
</style>