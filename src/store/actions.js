export default {
  addCart(context, payload) {
    // 1.查找之前数组中是否有该商品
    let oldCartGoods = context.state.cartList.find(item => item.iid === payload.iid)

    // 判断oldProduct
    if(oldCartGoods) {
      // oldCartGoods.count += 1
      context.commit('addCounter', oldCartGoods)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit('addCart', payload)
    }
  }
}