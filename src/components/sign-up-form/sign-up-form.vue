<template>
    <el-form :model="user" ref="user" class="demo-ruleForm">
        <el-form-item label="Email">
            <el-input @input="$v.user.email.$touch()" type="text" v-model="user.email" autocomplete="off"></el-input>
            <alert-danger :alert="!$v.user.email.required && $v.user.email.$dirty && !!$v.user.email.$model">
                Email Is Required
            </alert-danger>
            <alert-danger :alert="!$v.user.email.email && $v.user.email.$dirty && !!$v.user.email.$model">
                Email Must Be In Avalid Format
            </alert-danger>
            <alert-danger :alert="!!errMsg">{{errMsg}}</alert-danger>
        </el-form-item>

        <el-form-item label="Password">
            <el-input @input="$v.user.password.$touch()" type="password" v-model="user.password" autocomplete="off"></el-input>
            <alert-danger :alert="!$v.user.password.required && $v.user.password.$dirty && !!$v.user.password.$model">
                Password Is Required
            </alert-danger>
            <alert-danger :alert="!$v.user.password.minLength && $v.user.password.$dirty && !!$v.user.password.$model">
                Password Must Be At Least {{$v.user.password.$params.minLength.min}} Characters
            </alert-danger>
        </el-form-item>

        <el-form-item label="ConfirmPassword">
            <el-input @input="$v.user.confirmPassword.$touch()" type="password" v-model="user.confirmPassword" autocomplete="off"></el-input>
            <alert-danger :alert="!$v.user.confirmPassword.required && $v.user.confirmPassword.$dirty && !!$v.user.confirmPassword.$model">
                Confirm Password Is Required
            </alert-danger>
            <alert-danger :alert="!$v.user.confirmPassword.sameAs && $v.user.confirmPassword.$dirty && !!$v.user.confirmPassword.$model">
                Confirm Password And Password Must Be Same
            </alert-danger>
        </el-form-item>

        <el-form-item>
            <el-button :disabled="$v.$invalid" :loading="loading" type="primary" @click="submitForm" size="small">Signup</el-button>
            <el-button @click="resetForm" type="button" size="small">Reset</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import axiosInstance from '../../axios-instances'
import { email,required,minLength,sameAs } from 'vuelidate/lib/validators'
export default {
    components:{
        'alert-danger':()=>import('../alert-danger/alert-danger'),
    },
    data(){
        return{
            user:{
                email:'user123@gmail.com',
                password:'123456',
                confirmPassword:'123456'
            },
            errMsg:null,
            loading:false
        }
    },
    validations:{
        user:{
            email:{
                required,
                email
            },
            password:{
                required,
                minLength:minLength(6)
            },
            confirmPassword:{
                required,
                sameAs:sameAs(function(){
                    return this.user.password
                })
            }
        }
    },
    methods:{
        submitForm(){
            this.loading = true
            axiosInstance.post('user/sign-up',{
                email:this.user.email,
                password:this.user.password
            }).then(response=>{
                this.$emit("toggleToLogin")
                this.loading = false
                this.resetForm()
            }).catch(err=>{
                this.loading = false
                if(err.response){
                    this.errMsg = err.response.data.message
                }
            })
        },
        resetForm(){
            this.user.email=''
            this.user.password=''
            this.user.confirmPassword=''
        }
    }
}
</script>