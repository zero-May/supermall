<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import Scroll from "components/common/scroll/Scroll"

import {mapGetters} from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
    Scroll
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    // mapGetters辅助函数仅仅是将store中的getter映射到computed
    ...mapGetters(['cartLength'])
  },
  activated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
}
</style>