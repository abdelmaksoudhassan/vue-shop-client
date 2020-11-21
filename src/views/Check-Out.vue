<template>
    <div>
        <h1 class="header-center">Checkout</h1>
        <div class="body-center">
            <el-card>
                <div>
                <h5>Order Summary</h5>
                <span>You have {{items}} items in your shopping cart</span>
                </div>
                <div v-for="(item,index) in cart" :key="index">
                    {{ item.orderQuantity }}
                    <strong> x </strong>
                    {{ item.title }}
                    with Price
                    {{ item.orderQuantity * item.price | dollar-sign }}
                </div>
                <el-divider></el-divider>
                <div>
                <strong>Total : </strong> {{totalPrice | dollar-sign}}
                </div>
            </el-card>
            <el-button :disabled="emptyCart" class="make-order" type="info" plain @click="makeOrder" :loading="loading">Make order</el-button>
        </div>
    </div>
</template>
<script>
import axiosInstance from '../axios-instances'
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            loading:false
        }
    },
    computed:{
        ...mapGetters('cart',['items','cart','totalPrice']),
        emptyCart(){
            return this.cart.length == 0 ? true : false
        }
    },
    methods:{
        makeOrder(){
            this.loading = true
            axiosInstance.post('make-order').then(res=>{
                this.$store.dispatch('cart/clearCart')
                this.loading = false
            }).catch(err=>{
                console.log(err.response)
                this.loading = false
            })
        }
    }
}
</script>
<style scoped>
.make-order{
    margin: 20px 0px;
}
</style>