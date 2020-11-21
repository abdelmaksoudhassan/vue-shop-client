<template>
  <el-menu :default-active="$route.name" class="el-menu-demo" mode="horizontal" :router="true">
    <el-menu-item index="Home" :route="{name:'Home'}">Home</el-menu-item>
    <el-menu-item index="Shopping-Cart" :route="{name:'Shopping-Cart'}">Shopping Cart <el-badge class="mark" :value="items" /></el-menu-item>
    <el-menu-item index="Check-Out" v-show="!!user" :route="{name:'Check-Out'}">Check Out</el-menu-item>
    <el-menu-item index="Authentication" v-if="!user" :route="{name:'Authentication'}">Authentication</el-menu-item>
    <el-submenu  index="2" trigger="click" v-if="user">
      <template slot="title">
        {{name}} <el-avatar :size="40" :src="imageUrl"></el-avatar>
      </template>
      <el-menu-item index="2-1" :route="{name:'Profile'}">Profile</el-menu-item>
      <el-menu-item index="2-2" @click="logout">Log Out</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script>
import axiosInstance from '../../axios-instances'
import {clearToken} from '../../functions'
import { mapGetters,mapActions } from 'vuex'
export default {
  name:'navBar',
  computed:{
    ...mapGetters('cart',['items']),
    ...mapGetters('auth',['name','user','imageUrl'])
  },
  methods:{
    logout(){
      axiosInstance.post('user/log-out').then(()=>{
        this.$store.dispatch('auth/logout')
        clearToken()
        this.$router.push('/')
      }).catch(e=>{
        console.log(e)
      })
    }
  }
}
</script>
<style scoped>
.el-menu-item{
  padding: 0px 5px;
}
.el-menu--horizontal>.el-submenu {
    float: right;
}
</style>