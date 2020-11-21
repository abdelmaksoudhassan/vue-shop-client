<template>
  <div>
    <h1 class="header-center">Authentication</h1>
    <div class="body-center">
      <el-tabs type="card" :value.sync="x">
        <el-tab-pane label="Sign Up" name="1">
          <sign-up-form @toggleToLogin="toggleToLogin()"></sign-up-form>
        </el-tab-pane>
        <el-tab-pane label="Log in" name="2">
          <log-in-form></log-in-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    components:{
      'sign-up-form':()=>import('../components/sign-up-form/sign-up-form'),
      'log-in-form':()=>import('../components/log-in-form/log-in-form')
    },
    data(){
      return{
        x:"1"
      }
    },
    methods:{
      toggleToLogin(){
        this.x = "2"
      }
    }
  };
</script>