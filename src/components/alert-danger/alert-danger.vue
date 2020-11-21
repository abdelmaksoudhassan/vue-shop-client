<template>
    <el-alert v-show="alert" type="error">
        <slot></slot>
    </el-alert>
</template>
<script>
export default {
    name:'alert-danger',
    props:{
        alert:{
            type:Boolean,
            default:false
        }
    }
}
</script>
<style scoped>
.el-alert{
    padding: 5px;
    line-height: 20px;
    margin: 2px 0px;
}
</style>