<template>
<!-- 所有的item都展示同一个图片，同一个文字 -->
  <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 底部文字颜色动态绑定 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    
    <!-- <img src="../../assets/img/tabbar/home.png">
    <div>首页</div> -->
  </div>
  
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
     activeColor: {
       type: String,
       default: 'red'
     }
  },
  data() {
    return {
      // isActive: true
    }
  },
  // 底部颜色点击当前才变色 活跃路由与this.path进行匹配
  computed: {
    isActive() {
      // /home -> item1(/home) = true
      // /home -> item1(/category) = false
      // /home -> item1(/cart) = false
      // /home -> item1(/profile) = false
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 底部文字颜色动态绑定 :style
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      // console.log('fff');
      this.$router.push(this.path)
    }
  }
};
</script>

<style scoped>
.tabbar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active{
  color: #d81e06;
} */
</style>