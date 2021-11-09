<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-info>
      <detail-params :paramsInfo="paramsInfo"></detail-params>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailInfo from './childComps/DetailInfo'
import DetailParams from './childComps/DetailParams'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, GoodsInfo, ShopInfo, ParamsInfo} from 'network/detail'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParams,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 1.获取顶部的图片轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goodsInfo);
      
      // 3.获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo)
      // console.log(this.shopInfo);
      
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramsInfo = new ParamsInfo(data.itemParams.info, data.itemParams.rule)
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>