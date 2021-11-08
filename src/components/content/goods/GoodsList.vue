<template>
  <div class="goods">
    <!-- goods中遍历出来的item是一个个小对象，需要把每个item给GoodsListItem使用 -->
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'

export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },

}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>