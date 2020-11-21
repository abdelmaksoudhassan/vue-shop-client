<template>
    <el-form :model="user" ref="user" class="demo-ruleForm">
        <el-form-item label="Email">
            <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="Password">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <alert-danger :alert="!!errMsg">{{errMsg}}</alert-danger>

        <el-form-item>
            <el-button type="primary" @click="submitForm" size="small" :loading="loading">Login</el-button>
            <el-button @click="resetForm" type="button" size="small">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import {saveToken} from '../../functions'
import axiosInstance from '../../axios-instances'
export default {
    components:{
        'alert-danger':()=>import('../alert-danger/alert-danger'),
    },
    data(){
        return{
            user:{
                email:'user123@gmail.com',
                password:'123456'
            },
            errMsg:null,
            loading:false
        }
    },
    methods:{
        async submitForm(){
            this.loading = true
            try{
                const user = await this.$axios.post('user/log-in',{
                    email:this.user.email,
                    password:this.user.password
                })
                saveToken(user.data.token)
                this.$store.dispatch('auth/setUser',user.data)
                const cart = await axiosInstance.get('get-cart')
                this.$store.dispatch('cart/setCart',cart.data)
                this.loading = false
                this.resetForm()
                this.errMsg = null
                const path = sessionStorage.getItem('fullPath')
                !!path ? this.$router.push(path) : this.$router.push('/')
            }
            catch(err){
                this.loading = false
                if(err.response){
                    this.errMsg = err.response.data.message
                }
            }
        },
        resetForm(){
            this.user.email=''
            this.user.password=''
        }
    }
}
</script>