<template>
    <div>
        <h1 class="header-center">Edit Profile</h1>
        <div class="body-center">
            <el-upload
            class="avatar-uploader"
            action="https://e-combackend.herokuapp.com/user/change-photo"
            :headers="headers"
            :multiple="false"
            :limit="1"
            name="image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
            </el-upload>
            
            <el-form :model="name" ref="name" class="demo-ruleForm border">
            <el-form-item label="Fisrt Name">
                <el-input size="mini" @input="$v.name.first.$touch()" type="text" v-model="name.first" autocomplete="off"></el-input>
                <alert-danger :alert="!$v.name.first.required && $v.name.first.$dirty && !!$v.name.first.$model">
                    First Name Is Required
                </alert-danger>
                <alert-danger :alert="!$v.name.first.minLength && $v.name.first.$dirty && !!$v.name.first.$model">
                    First Name Must Be At Least {{$v.name.first.$params.minLength.min}} Letters
                </alert-danger>
                <alert-danger :alert="!$v.name.first.maxLength && $v.name.first.$dirty && !!$v.name.first.$model">
                    First Name Must Be Maximum {{$v.name.first.$params.maxLength.max}} Letters
                </alert-danger>
                <alert-danger :alert="!$v.name.first.alpha && $v.name.first.$dirty && !!$v.name.first.$model">
                    First Name Must Be Only Letters
                </alert-danger>
            </el-form-item>

            <el-form-item label="Last Name">
                <el-input size="mini" @input="$v.name.last.$touch()" type="text" v-model="name.last" autocomplete="off"></el-input>
                <alert-danger :alert="!$v.name.last.required && $v.name.last.$dirty && !!$v.name.last.$model">
                    Last Name Is Required
                </alert-danger>
                <alert-danger :alert="!$v.name.last.minLength && $v.name.last.$dirty && !!$v.name.last.$model">
                    Last Name Must Be At Least {{$v.name.last.$params.minLength.min}} Letters
                </alert-danger>
                <alert-danger :alert="!$v.name.last.maxLength && $v.name.last.$dirty && !!$v.name.last.$model">
                    Last Name Must Be Maximum {{$v.name.last.$params.maxLength.max}} Letters
                </alert-danger>
                <alert-danger :alert="!$v.name.last.alpha && $v.name.last.$dirty && !!$v.name.last.$model">
                    Last Name Must Be Only Letters
                </alert-danger>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" :loading="loading" :disabled="$v.name.$invalid" type="success" plain @click="submitForm">Save</el-button>
                <el-button size="mini" @click="resetForm" type="warning" plain>Reset</el-button>
            </el-form-item>
            </el-form>

            <el-form class="border">
            <el-form-item label="Old Password">
                <el-input size="mini" type="password" v-model="password.old" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="New Password">
                <el-input size="mini" @input="$v.password.new.$touch()" type="password" v-model="password.new" autocomplete="off"></el-input>
                <alert-danger :alert="!$v.password.new.required && $v.password.new.$dirty && !!$v.password.new.$model">
                    Confirm Password Is Required
                </alert-danger>
                <alert-danger :alert="!$v.password.new.minLength && $v.password.new.$dirty && !!$v.password.new.$model">
                    Confirm Password Must Be At Least {{$v.password.new.$params.minLength.min}} Digits
                </alert-danger>
            </el-form-item>

            <el-form-item>
                <el-button :loading="ploading" size="mini" :disabled="$v.password.$invalid" type="success" plain @click="submitPassword">save</el-button>
                <el-button @click="resetPassword" size="mini" type="warning" plain>Reset</el-button>
            </el-form-item>
            </el-form>
            <el-button :loading="deleting" @click="deleteMyAccount" type="danger" icon="el-icon-delete" class="delete-btn">Delete my account</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { required,minLength,maxLength,alpha } from 'vuelidate/lib/validators'
import axiosInstance from '../axios-instances'
import {clearToken} from '../functions'
export default {
    components:{
        'alert-danger':()=>import('./../components/alert-danger/alert-danger'),
    },
    data(){
        return{
            imageUrl: '',
            name:{
                first:'',
                last:''
            },
            password:{
                old:'',
                new:''
            },
            loading:false,
            ploading:false,
            headers:{},
            deleting:false
        }
    },
    mounted(){
        setTimeout(()=>{
            this.headers = {
                'token': this.$store.getters['auth/token'] || fetchToken()
            }
        },1000)
    },
    validations:{
        name:{
            first:{
                required,
                minLength:minLength(3),
                maxLength:maxLength(10),
                alpha
            },
            last:{
                required,
                minLength:minLength(3),
                maxLength:maxLength(10),
                alpha
            }
        },
        password:{
            new:{
                required,
                minLength:minLength(6)
            }
        }
    },
    methods:{
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            this.$notify.error({
                title: 'Error',
                message: 'Avatar picture must be JPG format!'
            });
        }
        if (!isLt2M) {
            this.$notify.error({
                title: 'Error',
                message: 'Avatar picture size can not exceed 2MB!'
            });
        }
        return isJPG && isLt2M;
      },
        handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // this.$store.dispatch('auth/changeImage',res.image)
        this.$notify({
            title: 'Success',
            message: 'Profile Image Updated',
            type:'success'
        });
      },
     submitForm(){
            this.loading = true
            axiosInstance.patch('user/change-name',{
                firstName:this.name.first,
                lastName:this.name.last
            }).then(response=>{
                this.loading = false
                this.$store.dispatch('auth/updateData',response.data)
                this.$notify({
                    title: 'Success',
                    message: 'User Name Updated',
                    type:'success'
                });
                this.resetForm()
            }).catch(err=>{
                this.$notify.error({
                    title: 'Error',
                    message: err.response.data.message
                });
                this.loading = false
            })
        },
        resetForm(){
            this.name.first=''
            this.name.last=''
        },
        submitPassword(){
            this.ploading = true
            axiosInstance.patch('user/change-password',{
                oldPassword:this.password.old,
                newPassword:this.password.new
            }).then(response=>{
                this.ploading = false
                this.resetForm()
                this.$notify({
                    title: 'Success',
                    message: 'Password Updated',
                    type:'success'
                });
            }).catch(err=>{
                this.$notify.error({
                    title: 'Error',
                    message: err.response.data.message
                });
                this.ploading = false
            })
        },
        resetPassword(){
            this.password.old=''
            this.password.new=''
        },
        deleteMyAccount(){
            this.deleting = true
            axiosInstance.delete('user/delete-my-account').then(()=>{
                this.deleting = false
                this.$store.dispatch('auth/logout')
                clearToken()
                this.$router.push('/')
            }).catch(e=>{
                console.log(e.response)
                this.deleting = false
            })
        }
    }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .border{
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      padding:0px 10px;
      margin:0px 10px;
      border-radius: 10px;
  }
  .delete-btn{
      margin-bottom: 20px;
  }
</style>