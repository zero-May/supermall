import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from  './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  /*
  mutations: {
    // mutations唯一的目的就是修改state中状态
    // mutations中的每个方法极可能完成的事件比较单一
    addCart(state, payload) {
      // payload新添加的商品
          
      // let oldCartGoods = null;
      // for(let item of state.cartList) {
      //   if(item.iid === payload.iid) {
      //     oldCartGoods = item;
      //   }
      // }

      // 1.查找之前数组中是否有该商品
      let oldCartGoods = state.cartList.find(item => item.iid === payload.iid)

      // 判断oldProduct
      if(oldCartGoods) {
        oldCartGoods.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  */
  actions
})

// 3.挂在Vue实例上
export default store