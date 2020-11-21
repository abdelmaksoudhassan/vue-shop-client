<template>
  <div>
    <h1 class="header-center">Shopping Cart</h1>
    <div v-if="cart.length != 0">
      <el-table
        :data="cart"
        style="width: 100%">
        <el-table-column
        fixed="left"
        align="center"
        label="Product">
        <template slot-scope="scope">
          <div class="product">
            <el-avatar shape="square" :size="50"  :src="'https://e-combackend.herokuapp.com/products/'+scope.row.images[0]"></el-avatar>
            <span>{{scope.row.title}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="orderQuantity"
        label="Quantity">
      </el-table-column>
      <el-table-column
      align="center"
        label="Price">
        <template slot-scope="scope">
          {{scope.row.orderQuantity*scope.row.price | dollar-sign}}
        </template>
      </el-table-column>
      <el-table-column
      align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" :loading="removing" plain @click="removeIt(scope.row._id)">X</el-button>
        </template>
      </el-table-column>
      </el-table>
      <div class="body-center total">
        <div>
          <strong>Total Price : </strong> {{totalPrice | dollar-sign}}
        </div>
        <div>
          <el-button size="small" :disabled="!totalPrice" type="primary" @click="goCheckOut">Check Out</el-button>
          <el-button size="small" :loading="clearing" :disabled="!totalPrice" type="danger" @click="clearCart">Clear Cart</el-button>
        </div>
      </div>
    </div>
    <div v-else class="body-center">
      <el-alert title="Shopping cart is empty" type="info" show-icon></el-alert>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axiosInstance from '../axios-instances'
export default {
  computed:{
    ...mapGetters('cart',['cart','totalPrice'])
  },
  data(){
    return{
      removing:false,
      clearing:false
    }
  },
  methods:{
    removeIt(id){
      this.removing = true
      axiosInstance.delete(`remove-from-cart/${id}`).then(res=>{
        this.$store.dispatch('cart/setCart',res.data)
        console.log(res.data)
        this.removing = false
      }).catch(err=>{
        console.log(err)
        this.removing = false
      })
    },
    clearCart(){
      this.clearing = true
      axiosInstance.delete('clear-cart').then(()=>{
        this.$store.dispatch('cart/clearCart')
        this.clearing = false
      }).catch(e=>{
        console.log(e)
        this.clearing = false
      })
    },
    goCheckOut(){
      this.$router.push({name:'Check-Out'})
    }
  }
}
</script>
<style scoped>
.product{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.body-center{
  padding: 30px 0px;
}
</style>