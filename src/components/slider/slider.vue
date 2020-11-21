<template>
    <el-carousel :interval="interval" height="150px">
        <el-carousel-item v-for="(image,index) in images" :key="index">
            <el-image :src="'https://e-combackend.herokuapp.com/products/'+image" style="width: 150px; height: 150px" fit="fill"></el-image>
        </el-carousel-item>
    </el-carousel>
</template>
<script>
export default {
    name:'slider',
    props:{
        interval:{
            type:Number,
            default:1000
        },
        images:{
            type:Array,
            required:true
        }
    }
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>