<template>
    <div v-loading="loading">
        <el-row v-if="counter == 0">
            <el-button class="add" type="primary" @click="startConter()" size="mini" icon="el-icon-shopping-cart-1">Add</el-button>
        </el-row>
        <el-row v-else>
            <div class="after-add">
                <el-button type="warning" @click="decreaseCounter()" size="mini">-</el-button>
                <span>{{counter}}</span>
                <el-button type="info" @click="increaseCounter()" size="mini">+</el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axiosInstance from '../../axios-instances'
export default {
    props:{
        productId:{
            required:true,
            type:String
        }
    },
    data(){
        return{
            counter:0,
            loading:false
        }
    },
    computed:{
        ...mapGetters('cart',['cart']),
    },
    created(){
        this.loading = true
        setTimeout(()=>{
            for (let index = 0; index < this.cart.length; index++) {
                const element = this.cart[index];
                if(element._id == this.productId){
                    this.counter = element.orderQuantity
                    break
                }else{
                    continue
                }
            }
            this.loading = false
        },500)
    },
    methods:{
        startConter(){
            this.loading = true
            axiosInstance.post(`add-to-cart/${this.productId}`).then(response=>{
                this.loading = false
                this.counter = 1
                this.$store.dispatch('cart/setCart',response.data)
            }).catch(err=>{
                console.log(err.response)
                if(err.response.data.code == 'INVALID'){
                    this.$message.error('Oops, you must login to use cart');
                    this.$router.push('authentication')
                }
                this.loading = false
            })
        },
        increaseCounter(){
            this.loading = true
            axiosInstance.post(`add-to-cart/${this.productId}`).then(response=>{
                this.loading = false
                this.counter += 1
                this.$store.dispatch('cart/setCart',response.data)
            }).catch(err=>{
                console.log(err.response)
                this.loading = false
            })
        },
        decreaseCounter(){
            this.loading = true
            axiosInstance.post(`decrease-quantity/${this.productId}`).then(response=>{
                this.loading = false
                this.counter -= 1
                this.$store.dispatch('cart/setCart',response.data)
            }).catch(err=>{
                console.log(err.response)
                this.loading = false
            })
        }
    }
}
</script>
<style scoped>
.add{
    width: 100%;
}
.after-add{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>