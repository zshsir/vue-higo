<template>
  <div class="detail">
    <nav-bar>
      <template v-slot:default>商品详情</template>
    </nav-bar>
    <!-- 商品图片信息 -->
    <van-image
      class="detailImage"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      class="cardInfo"
      :num="detail.stock"
      :price="detail.price+'.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">新书</van-tag>
        <van-tag v-if="detail.is_recommend == 1" plain type="danger"
          >推荐</van-tag
        >
      </template>
      <template #footer>
        <van-button size="warning" @click="handleAddCart">加入购物车</van-button>
        <van-button type="danger" @click="goToCart">立即购买</van-button>
      </template>
    </van-card>
<!-- 商品信息 -->
    <van-tabs v-model:active="active" @click-tab="showDialog">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div v-if="comments.length >0"  v-for="item, in comments" :key="item.id">
          <div>
            <label>{{item.user.name}}:</label>
            <label>{{item.content}}</label>
          </div>
        </div>
      </van-tab>
      <van-tab title="相关图书">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue';
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {useRoute, useRouter} from 'vue-router';
import { ref,onMounted, reactive, toRefs} from 'vue'
import {getDetail} from '../../network/detail'
import { Dialog, Toast } from 'vant';
import { addCart } from '@/network/cart';
import router from '@/router';
import { useStore } from 'vuex';
export default {
  name: 'Detail',
 components:{
    NavBar,
    GoodsList
  },
  setup(){
    const route = useRoute();
    const router = useRouter();

    const store = useStore();
    let id = ref(0);
    let book = reactive({
      detail:{},
      like_goods:[],
      comments:[]
    })
    const active = ref(0);
    onMounted(()=>{
      id.value = route.query.id;

      getDetail(id.value).then(res=>{
        book.detail = res.goods;
        book.like_goods = res.like_goods;
        book.comments = res.goods.comments;
      })
    })
     const showDialog = ()=>{
      if(book.comments == 0 && active.value == 1){
          Dialog({ message: '暂无评论' });
      }
    }

    //加入购物车
    const handleAddCart = ()=>{
       addCart({goods_id:book.detail.id,num:1}).then(res=>{
         if(res.status == '204' || res.status == '201'){
           //设置 store中 cartCount
           store.dispatch('updatedCart')
           Toast.success('添加成功')
         }
       })
    }
    //立即购买
    const goToCart = ()=>{
      addCart({goods_id:book.detail.id,num:1}).then(res=>{
         if(res.status == '204' || res.status == '201'){
           //设置 store中 cartCount
           store.dispatch('updatedCart')
           Toast.success('添加成功,')
           router.push({path:'/ShotCart'});

         }
       })
    }
    return{
      id,
      ...toRefs(book),
      active,
      showDialog,
      handleAddCart,
      goToCart
    }
  },
  methods: {}
}

</script>

<style lang="scss" scoped>
.detail{
  .detailImage{
    margin-top: 50px;
  }
  .cardInfo{
    text-align: left;
  }
  .content{
    padding: 10px;
    margin-bottom: 50px;
  }
}
</style>
