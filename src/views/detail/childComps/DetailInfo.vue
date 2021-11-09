<template>
  <div class="queryDetail" v-if="Object.keys(detailInfo).length !== 0">
    <div class="desc small">
      <p>“{{detailInfo.desc}}”</p>
    </div>
    <div class="descImg">
      <div class="imgBox" v-for="(item, index) in detailInfo.detailImage[0].list" :key="index">
        <img :src="item" @load="imgLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      // 判断所有的图片都加载完了，那么进行一次回调就可以了
      // counter与当前图片个数比较，相同代表加载完成
      if(++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      // 获取图片个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.queryDetail {
  padding: 10px;
  border-bottom: 4px solid #ccc;
}
.queryDetail .desc {
    margin-bottom: 20px;
  }
</style>>
