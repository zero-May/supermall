<template>
  <div class="bottom-bar">
    <div class="left">
      <span>
        <span class="icon"> </span>
        <span>客服</span>
      </span>
      <span>
        <span class="icon"> </span>
        <span>店铺</span>
      </span>
      <!-- <span class="cart" @click="toCart"> -->
      <span class="cart">
        <div>
          <img src="~assets/img/tabbar/shopcart.png" />
          <!-- <i class="badge" v-if="cartBadge">{{ cartBadge }}</i> -->
          <i class="badge"></i>
        </div>
        <span>购物车</span>
      </span>
    </div>
    <div class="right">
      <span class="cart">加入购物车</span>
      <!-- <span class="cart" @click="addCart">加入购物车</span> -->
      <span class="buy">购买(未开发)</span>
      <!-- <span class="buy" @click="buyNow">购买(未开发)</span> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottom'
}
</script>

<style scoped>
.bottom-bar {
  position: fixed;
  display: flex;
  height: 55px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  z-index: 2;
}
.bottom-bar .left, .bottom-bar .left  {
  display: flex;
  flex: 1;
  text-align: center;
}
.bottom-bar .left span, .bottom-bar .left span {
  display: block;
  flex: 1;
}
.left .cart {
  position: relative;
  top: 9px;
}
.left .cart div {
  width: 30px;
  margin: 0 auto;
}
.left .cart div img {
  width: 30px;
  height: 30px;
}
.left .cart div .badge {
  position: absolute;
  top: -7px;
  padding: 1px 3px;
  border-radius: 100%;
  color: #fff;
  background-color: red;
}
.left span.icon {
  display: inline-block;
  margin: 3px 0;
  width: 30px;
  height: 30px;
  background: url("~@/assets/img/detail/detail_bottom.png") no-repeat;
  background-size: 90%;
}
.left span:first-child > span.icon {
  background-position: 0 -60px;
}
.left span:nth-child(2) > span.icon {
  background-position: 0 -115px;
}
.right span {
  display: inline-block;
  height: 55px;
  font-size: 17px;
  line-height: 55px;
}
.right span.cart {
  background-color: rgb(255, 221, 16);
}
.right span.buy {
  background-color: rgb(123, 63, 74);
  color: #fff;
}
</style>