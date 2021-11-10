<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <!-- <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-info> -->
       <detail-info :detailInfo="detailInfo"></detail-info>
      <detail-params :paramsInfo="paramsInfo"></detail-params>
      <detail-comment :commentInfo="commentInfo"></detail-comment>
      <goods-list :goods="recommends"></goods-list>
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
import DetailComment from './childComps/DetailComment'
import GoodsList from "components/content/goods/GoodsList";

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, GoodsInfo, getRecommend, ShopInfo, ParamsInfo} from 'network/detail'
import {itemListenerMixin} from 'common/mixin'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParams,
    DetailComment,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      // 也可以使用混入
      // itemImgListener: null 
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取数据
      const data = res.result

      // 2.获取顶部的图片轮播图数据
      this.topImages = data.itemInfo.topImages

      // 3.获取商品信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goodsInfo);
      
      // 4.获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo)
      // console.log(this.shopInfo);
      
      // 5.获取商品的详情数据
      this.detailInfo = data.detailInfo

      // 6.获取参数信息
      this.paramsInfo = new ParamsInfo(data.itemParams.info, data.itemParams.rule)

      // 7.获取评论信息
      // 如果有评论信息
      if(data.rate.cRate !== 0){
        // this.commentInfo = data.rate.list[0]
        this.commentInfo = data.rate
        // console.log(this.commentInfo);
      }
    })

    // 3.请求详情数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
  },
  // methods: {
  //   imageLoad() {
  //     this.$refs.scroll.refresh()
  //   }
  // },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
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