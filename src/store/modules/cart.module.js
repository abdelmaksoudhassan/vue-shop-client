const namespaced = true
const state={
    cart:[]
}
const getters={
    cart(state){
        return state.cart
    },
    items(state){
        const array = state.cart
        let items = 0
        array.forEach(element => {
            items += element.orderQuantity
        });
        return items
    },
    totalPrice(state){
      let total = 0
      state.cart.forEach(element => {
          total += element.orderQuantity * element.price
      });
      return total
    }
}
const mutations={
    SET_CART(state,data){
        state.cart = data
    },
    CLEAR_CART(state){
        state.cart =[]
    }
}
const actions={
    setCart({commit},data){
        commit('SET_CART',data)
    },
    clearCart({commit}){
        commit('CLEAR_CART')
    }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}