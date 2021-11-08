<template>
  <!-- 点击backTop，Home组件中返回 ，传值麻烦，可以直接在Home组件中监听BackTop组件的backTop事件-->
  <!-- <div class="back-top" @click="backClick"> -->
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'BackTop',
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>