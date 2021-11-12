<template>
  <div class="wrapper">
    <div class="goods-wrapper">
      <!-- mutations中addCart时当前商品设置为选中状态 -->
      <check-btn :is-checked="product.checked" @click.native="checkClick"></check-btn>
      <div class="goodsImg">
        <img :src="product.iamge" alt="" />
      </div>
      <div class="goods-info">
        <p class="title">{{ product.title }}</p>
        <p class="desc">{{ product.desc }}</p>
        <div class="info_bottom">
          <span>￥{{ product.price }}</span>
          <span>x{{ product.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBtn from "components/content/checkBtn/CheckBtn";

export default {
  name: 'CartListItem',
  components: {
    CheckBtn
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    }
  },
}
</script>

<style scoped>
.goods-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
}
.goods-wrapper .goodsImg {
  margin: 0 10px;
}
.goods-wrapper .goodsImg img {
  width: 80px;
  height: 110px;
  border-radius: 5px;
}
.goods-wrapper .goods-info {
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.goods-wrapper .goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-wrapper .goods-info .desc {
  margin: 20px 0;
  font-size: 12px;
  color: rgb(160, 160, 160);
}
.goods-wrapper .goods-info .info_bottom {
  display: flex;
  justify-content: space-between;
}
.goods-info .info_bottom span {
  font-size: 20px;
}
.goods-info .info_bottom span:first-child {
  color: var(--color-tint);
}
.goods-info .info_bottom span:last-child {
  color: rgb(157, 77, 3);
}
</style>