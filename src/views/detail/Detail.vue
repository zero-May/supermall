<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" :probeType="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
      <detail-shop-info :shopInfo="shopInfo"></detail-shop-info>
      <detail-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-info>
      <detail-params ref="params" :paramsInfo="paramsInfo"></detail-params>
      <detail-comment ref="comment" :commentInfo="commentInfo"></detail-comment>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom></detail-bottom>
    <!-- 返回顶部 （mixin） -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailInfo from "./childComps/DetailInfo";
import DetailParams from "./childComps/DetailParams";
import DetailComment from "./childComps/DetailComment";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottom from './childComps/DetailBottom'

import Scroll from "components/common/scroll/Scroll";

import {
  getDetail,
  GoodsInfo,
  getRecommend,
  ShopInfo,
  ParamsInfo
} from "network/detail";
import { itemListenerMixin, backTopMixIn } from "common/mixin";
import {debounce} from 'common/utils'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailParams,
    DetailComment,
    GoodsList,
    Scroll,
    DetailBottom,
  },
  // 图片监听混入和回到顶部混入
  mixins: [itemListenerMixin, backTopMixIn],
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
      // itemImgListener: null ,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 1.获取数据
      const data = res.result;

      // 2.获取顶部的图片轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 3.获取商品信息
      this.goodsInfo = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goodsInfo);

      // 4.获取店铺信息
      this.shopInfo = new ShopInfo(data.shopInfo);
      // console.log(this.shopInfo);

      // 5.获取商品的详情数据
      this.detailInfo = data.detailInfo;

      // 6.获取参数信息
      this.paramsInfo = new ParamsInfo(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 7.获取评论信息
      // 如果有评论信息
      if (data.rate.cRate !== 0) {
        // this.commentInfo = data.rate.list[0]
        this.commentInfo = data.rate;
        // console.log(this.commentInfo);
      }
    /*
      // 1.第一次获取，值不对
      // 因为this.$refs.params.$el压根儿就没渲染
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);

      // 2.第二次获取：值不对
      // 因为图片没有计算在内
      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      // offsetTop值不对的时候，都是因为图片的问题
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
        */
    });

    // 3.请求详情数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },100)
  },

  methods: {
    imageLoad() {
      // 防抖，利用混入
      // this.$refs.scroll.refresh()
      this.refresh()
      this.getThemeTopY()
      
    },
    // DetailNavBar联动
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y
      
      // 2.positionY和主题中值进行对比
      // [0,1000,2000,3000]
      // positionY在0-1000之间，index=0
      // positionY在1000-2000之间，index=1
      // positionY在2000-3000之间，index=2

      // positionY超过3000，index=3
      // for(let i in this.themeTopYs) {
        // if(this.positionY > this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1]) {
        //   console.log(i);
        // }             
        // 这里i是字符串
      // }

      // 有两种情况：012时，判断在区间，3时超过即可
      let length = this.themeTopYs.length
      for(let i=0; i<length; i++){
        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])))
        // this.currentIndex = i;
        // this.$refs.nav.currentIndex = this.currentIndex
        // hack做法
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 3.是否显示回到顶部（这里回到顶部用了混入）
      // 混入时，methods中函数内部不能再拆分，只能是一个完整的函数，不会合并，生命周期函数可以合并
      this.isShowBackTop = -position.y > 1000;
    }
  },
  destroyed() {
    // 取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};
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