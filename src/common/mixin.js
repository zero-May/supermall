import {debounce} from './utils';
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh,50)
    this.refresh = debounce(this.$refs.scroll.refresh,100)
      this.itemImgListener = () => {
        this.refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);

    // console.log('wo是混入中的内容');
  },
}

export const backTopMixIn = {
  components: {
    BackTop,
  },
  data() {
    return {
      // 是否显示返回顶部
      isShowBackTop: false,
    };
  },
  methods: {
    // 返回顶部
    backClick() {
      // 调用scroll里封装的方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 当滑动到一定位置出现返回顶部
      this.isShowBackTop = position.y < -1000 ? true : false;
    },
  },
};