const namespaced = true
const state = {
    products:[]
}
const getters = {
    products(state){
        return state.products
    }
}
const mutations = {
    SET_PRODUCTS(state,products){
        state.products = products
    }
}
const actions = {
    setProducts({commit},products){
        commit('SET_PRODUCTS',products)
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced
}