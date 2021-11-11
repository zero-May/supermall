import {debounce} from './utils';

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh,50)
    this.refresh = debounce(this.$refs.scroll.refresh,50)
      this.itemImgListener = () => {
        this.refresh()
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);

    // console.log('wo是混入中的内容');
  },
}