<template>
<!-- ref -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      message: 'hhhhh'
    }
  },
  mounted() {
    // 1.创建BScroll对象
    // ref获取到wrapper元素，document.getElementBy...无法确定获取到的是哪个wrapper
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      // 这里根据需要进行监听滚动位置
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad

    })

    // 2.监听滚动的位置
    // 滚动一定值后才显示backtop按钮
    this.scroll.on('scroll', (position) => {
      // console.log(position);
      // 将自定义scroll方法和position传给Home组件使用
      this.$emit('scroll', position)
    })

    // 3.监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('加载更多');
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
}
</script>

<style scoped>

</style>