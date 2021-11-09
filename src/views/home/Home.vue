<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- :class="{fixed: isTabFixed}" -->
      <tab-control 
      :titles="['流行','新款','精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"
      ></tab-control>
      <!-- Home中请求到goods数据，GoodsList中拿到某一类型的数据list:goods,在GoodsListItem中遍历list:goods中的每一小项 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 在BackTop组件中监听事件还需传值到Home组件中，麻烦，所以直接在Home组件中监听BackTop组件的点击事件即可，但是，无法直接监听组件事件，需用 @click.native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// 导入公共组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

// 导入子组件
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 导入方法
import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from 'common/utils'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      // 先保存goods(流行/新款/精选)的数据，再分类每个类别对应一个key,每个key有自己的page和list
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: true,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    // console.log('home destroyeds');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    // 1.请求多个数据(banners和recommends)
    // 把请求数据的方法放在了methods中，在created中调用
    // 如果名字一样getHomeMultidata，就需要加this,不一样的方法名就不需要this(因为之前已经定义过该方法，不过不加this，就是调用的home.js中的方法)
    this.getHomeMultidata();

    // 2.请求goods数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.GoodsListItem中图片加载完成的事件监听
    // 图片监听执行次数过多，可以用防抖函数来解决
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on("itemImageLoad", () => {
      refresh()
    });    
  },
  methods: {
    // 事件监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 两个tabControl点击的统一
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 返回顶部
    backClick() {
      // this.$refs.scroll.message 可以拿到Scroll组件中data值
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载更多（默认加载一次，需完成加载更多，再加载）
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
    },
    // 获取tabControl的offsetTop
    // 所有的组件都有一个属性$el: 用于获取组件中的元素
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop 
    },

    // 网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        // 保存请求到的数据
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        // 将请求到的数据保存下来，保存到data->goods->list(对应的)
        this.goods[type].list.push(...res.data.list);
        // 页码初始化是0，请求到后就发生变化
        this.goods[type].page += 1;

        // 完成加载更多
        this.$refs.scroll.finishPullUp()
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在浏览器原生滚动时。为了让导航不跟随一起滚动，使用Better-Scroll不需要fixed */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; 
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .tab-control {
  position: sticky;
  top: 44px;
} */
/* Better-Scroll中无法使用 tab-control吸顶*/
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
</style>