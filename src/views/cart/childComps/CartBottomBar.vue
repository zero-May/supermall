<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-btn class="check-btn" 
      :is-checked="isSelectAll"
      @click.native="checkClick"
      ></check-btn>
      <span>全选</span>
    </div>
    <div class="price">合计{{totalPrice}}</div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckBtn from 'components/content/checkBtn/CheckBtn'
export default {
  name: 'CartBottomBar',
  components: {
    CheckBtn
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      if(this.$store.state.cartList.length === 0) return false
      // 方法一使用filter
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      // 方法二使用find
      // return !this.$store.state.cartList.find(item => !item.checked)
      // 方法三使用遍历
      for(let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) { // 全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else { // 部分或全部不选中
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 49px;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 90px;
}
.check-btn {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-left: 10px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 80px;
  background-color: var(--color-tint);
  color:#fff;
  text-align: center;
}
</style>