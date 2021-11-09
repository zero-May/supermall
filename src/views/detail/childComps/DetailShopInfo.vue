<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.logo" alt="">
      <span class="title">{{shopInfo.name}}</span>
      <span class="fans"
        >粉丝数：<span>{{ shopInfo.fans }}</span></span
      >
    </div>
    <div class="shop-middle">
      <div class="left">
        <span>
          <p>{{totalSell}}</p>
          <p>总销量</p>
        </span>
        <span>
          <p>{{shopInfo.goodsCount}}</p>
          <p>全部宝贝</p>
        </span>
      </div>
      <div class="right">
          <p v-for="(item,index) in shopInfo.score" :key="index">{{item.name}}
            <span class="score" :class="{'score-better':item.isBetter}">{{item.score}}</span>
            <span class="better" :class="{'better-more':item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
          </p>
      </div>
      <div class="bottom">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  // filters: {
  //   sellCountFilter: function(value) {
  //     if(value < 10000) return value;
  //     return (value/10000).toFixed(1) + '万'
  //   }
  // }
  computed: {
    // 销量格式化
    totalSell() {
      const sell = this.shopInfo.sells;
      const sellFormat= parseInt(sell / 10000) + "." + parseInt((sell % 10000) / 1000) + "w"
      return sell > 10000 ? sellFormat : sell
    }
  }
}
</script>

<style scoped>
.shop-info {
  padding: 10px;
  border-top: 5px solid rgb(220, 220, 220);
  border-bottom: 5px solid rgb(220, 220, 220);
}
.shop-info .shop-top {
  position: relative;
}
.shop-info .shop-top img {
  width: 50px;
}
.shop-info .shop-top span {
  margin-left: 10px;
  font-size: 16px;
}
.shop-info .shop-top .fans {
  position: absolute;
  font-size: 12px;
  bottom: 0;
  right: 5%;
}
.shop-info .shop-top .fans span {
  color: var(--color-tint);
}
.shop-middle {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
}
.left {
  display: flex;
  width: 50%;
  justify-content: center;
}
.left span{
  margin-right: 20px;
}
.left span p:first-child {
  font-size: 16px;
  padding-bottom: 10px;
  color: rgb(0, 0, 0);
}
.right {
  width: 45%;;
}
.right p {
  margin-bottom: 10px;
}
.right .scroll-better {
  color: var(--color-tint) !important;
}
.right p span.score {
  margin: 0 5px;
  color: rgb(7, 163, 7);
}
.right p span.better {
  float: right;
  color: #fff;
  padding: 2px;
  background-color: rgb(7, 163, 7);
}
.right .better-more {
  background-color: var(--color-tint) !important;
}
.bottom {
  padding: 8px 40px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: rgb(242, 245, 252);
}
</style>
