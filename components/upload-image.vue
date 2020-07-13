<template>
  <!-- 图片上传 -->
  <view class="image-upload">
    <view class="uni-list list-pd">
      <view class="uni-list-cell cell-pd">
        <view class="uni-uploader">
          <view class="uni-uploader-head">
            <!-- <view class="uni-uploader-info">{{imageList.length}}/5</view> -->
          </view>
          <view class="uni-uploader-body">
            <view class="uni-uploader__files">
              <block v-for="(image,index) in imageList" :key="index">
                <view class="uni-uploader__file">
                  <view class="delete_img" @tap="deleteImage(index)"></view>
                  <image class="uni-uploader__img" :src="image.url || image" :data-src="image.url || image" @tap="previewImage"></image>
                </view>
              </block>
              <view class="uni-uploader__input-box">
                <view class="uni-uploader__input" @tap="chooseImage"></view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <custom-popup ref="popup" title="您确定要删除这张图片吗？" @cancel="close" @confirm="confirm"/>
  </view>
	<!-- 图片上传 -->
</template>

<script>
import customPopup from './custom-popup/custom-popup'
export default {
  data() {
    return {
      imageList: [],
      index: -1
    }
  },
  components: {
    customPopup
  },
  methods: {
    // 图片上传
    chooseImage() {
      uni.chooseImage({
        count: 1,
        sizeType:['copressed'],
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths)
          this.$emit('upload', this.imageList)
        },
        fail: (res) => {
          uni.showToast({
            icon: 'none',
            title: '错误！'
          })
        }
      })
    },
    //删除图片
    deleteImage(index) {
      this.index = index
      this.open()
    },
    //预览图片
    previewImage: function(e) {
      var current = e.target.dataset.src
      uni.previewImage({
        current: current,
        urls: this.imageList
      })
		},
    //关闭提示窗
    close() {
      this.$refs['popup'].close()
    },
    //打开提示窗
    open() {
      this.$refs['popup'].open()
    },
    //用户确认删除
    confirm() {
      this.close()
      this.imageList.splice(this.index, 1)
      this.$emit('upload', this.imageList)
    }
  }
}
</script>

<style lang="scss">
  .uni-list:before{
    height: 0;
  }
  .uni-list:after{
    height: 0;
  }
  .uni-uploader__file{
    position: relative;
    .delete_img{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 999;
      width: 40rpx;
      height: 40rpx;
      background-image: url(../static/img/other/shanchu.png);
      background-size: 100% 100%;
    }
  }
</style>