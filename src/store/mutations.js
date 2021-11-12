export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法极可能完成的事件比较单一
  addCounter(state, payload) {
    payload.count++
  },
  addCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}