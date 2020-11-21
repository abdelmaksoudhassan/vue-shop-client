<template>
  <div id="app">
      <nav-bar></nav-bar>
      <transition enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutDown" mode="out-in" >
          <router-view/>
      </transition>
  </div>
</template>
<script>
import axiosInstance from './axios-instances'
export default {
  components:{
    navBar : () => import('./components/nav-Bar/nav-bar')
  },
  async created(){
    try{
      const user = await axiosInstance.get('user/auto-log-in')
      this.$store.dispatch('auth/setUser',user.data)
      const cart = await axiosInstance.get('get-cart')
      this.$store.dispatch('cart/setCart',cart.data)
    }
    catch(e){
      if(this.$route.name !== 'Authentication'){
        this.$router.push({name:'Authentication'})
      }
    }
  },
  mounted(){
    alert('in image upload you may face a problem due to limited size because of free hosting.')
  }
}
</script>