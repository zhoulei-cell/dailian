<template>
  <picker mode="multiSelector"  
    @change="bindPickerChange"
    @columnchange="columnchange"
    :value="index" 
    :range="pickerArr"
    range-key="text"
  >
    <slot/>
  </picker>
</template>

<script>
export default {
  props: {
    array: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      area: '',
			pickerArr: [],
      index: [0, 0] // picker - 索引
    }
  },
  methods: {
    //初始化picker
    initPicker() {
      this.pickerArr[0] = this.array
      this.pickerArr[1] = this.array[0].children
    },
    //绑定选择
    bindPickerChange(e) {
      console.log(e)
      const value = e.detail.value
      this.index = value
      this.area = this.array[value[0]].text + " " + this.array[value[0]].children[value[1]].text
      this.$emit('confirm', this.area)
    },
    // 获取二级分类
    columnchange(e) {
      // 当滚动切换一级分类时，为当前的一级分类添加它的子类
      if (e.detail.column == 0) {
        this.pickerArr[1] =  this.array[e.detail.value].children
      }
    }
  },
  created() {
    this.initPicker()
  }
}
</script>

<style>

</style>