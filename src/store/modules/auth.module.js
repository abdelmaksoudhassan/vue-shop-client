const namespaced = true
const state = {
    user:null,
    token:null
}
const getters = {
    user(state){
        return state.user
    },
    name(state){
        return (!!state.user.firstName && !!state.user.lastName) ?
            `${state.user.firstName} ${state.user.lastName}` : 
            state.user.email.substr(0,state.user.email.indexOf('@')) || 'User'
    },
    token(state){
        return state.token ? state.token : null
    },
    imageUrl(state){
        return state.user.image ? 'https://e-combackend.herokuapp.com/users/'+state.user.image : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
}
const mutations = {
    SET_USER(state,data){
        state.user = data.user
        state.token = data.token
    },
    LOG_OUT(state){
        state.user = null
        state.token = null
    },
    // SET_IMAGE(state){
    //     state.user.image = null
    // }
}
const actions = {
    setUser({commit},data){
        commit('SET_USER',data)
    },
    logout({commit}){
        commit('LOG_OUT')
        this.dispatch('cart/clearCart', {root:true})
    },
    // changeImage({commit}){
    //     commit('SET_IMAGE')
    // }
}
export default{
    namespaced,
    state,
    getters,
    mutations,
    actions
}