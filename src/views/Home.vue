<template>
  <div>
    <el-input placeholder="Search By Product Title" v-model="query"></el-input>
    <div v-loading="loading">
      <el-row :gutter="24">
        <el-col v-for="product in productsFilterd" :key="product._id" :span="8">
          <el-card :body-style="{ padding: '0px' }">
            <div class="hvr" @click="dialogTableVisible = true">
              <el-image :src="'https://e-combackend.herokuapp.com/products/'+product.images[0]"></el-image>
            </div>
            <div class="data">
              <span class="time">{{product.title}}</span>
              <span type="text" class="button">{{product.price | dollar-sign}}</span>
            </div>
            <add-cart-btn :productId="product._id"></add-cart-btn>
          </el-card>
          <el-dialog :title="product.title" :visible.sync="dialogTableVisible" :fullscreen="true" >
            <div class="body-center">
              <slider :images="product.images"></slider>
              <div><strong>Price : </strong>{{product.price | dollar-sign}}</div>
              <div><strong>Available Quantity :</strong>{{product.quantity}}</div>
              <div><strong>Category</strong>{{product.categoryId.title}}</div>
              <div>
                <strong>Description : </strong>
                <span>
                  <li v-for="(item,index) in product.description" :key="index">
                    {{item}}
                  </li>
                </span>
              </div>
              <div><strong>Owner : </strong>{{product.owner.email}}</div>
              <div><strong>Created : </strong>{{product.createdAt | fromNow}}</div>
              <div><strong>Updated : </strong>{{product.updatedAt | fromNow}}</div>
            </div>
          </el-dialog>
        </el-col>
      </el-row>
    </div>
    <div class="body-center paginator">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="currentChange()">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  components:{
    'slider' : () => import('../components/slider/slider'),
    'add-cart-btn' : () => import('../components/add-cart-btn/add-cart-btn')
  },
  data(){
    return{
      query:'',
      total:0,
      pageSize:3,
      currentPage:1,
      loading:false,
      dialogTableVisible:false
    }
  },
  computed:{
    ...mapGetters('product',['products']),
    productsFilterd(){
      return this.query ? this.products.filter(p=>p.title.toLowerCase().includes(this.query.toLowerCase())) : this.products
    }
  },
  created(){
    this.loading=true
    this.currentPage = +localStorage.getItem('currentPage') || 1
    this.$axios.get(`get-all-products?page=${this.currentPage}&count=${this.pageSize}`).then(res=>{
      this.total = res.data.total
      this.$store.dispatch('product/setProducts',res.data.products)
      this.loading = false
    }).catch(err=>{
      console.log(err.response)
      this.loading = false
    })
  },
  methods:{
    currentChange(){
      this.loading=true
      localStorage.setItem('currentPage',this.currentPage)
      this.$axios.get(`get-all-products?page=${this.currentPage}&count=${this.pageSize}`).then(res=>{
        this.total = res.data.total
        this.$store.dispatch('product/setProducts',res.data.products)
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
.data{
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.el-input{
  margin: 20px 0px;
}
.hvr:hover{
  cursor: pointer;
  transition:500ms;
  opacity: 0.8;
}
li{
  list-style: none;
}
</style>