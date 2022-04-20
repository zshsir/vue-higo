<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <tab-control @tabClick='tabClick' v-show="isTabFixed" :titles = "['畅销','新书','精选']"></tab-control>

    <div class="wrapper">
      <div class="content">
        <div ref="bannref">
          <home-swipe :banners="banners"></home-swipe>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control @tabClick='tabClick' :titles = "['畅销','新书','精选']"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
        </div>
    </div>
    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwipe from '../home/ChlidComps/HomeSwipe.vue'
import NavBar from '../../components/common/navbar/NavBar.vue'
import RecommendView from '../home/ChlidComps/RecommendView.vue'
import { getHomeAllData,getHomeGoods } from '../../network/home'
import { ref,reactive,onMounted, computed,watchEffect,nextTick } from 'vue'
import TabControl from '../../components/content/tabControl/TabControl.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import BackTop from '../../components/common/backtop/BackTop.vue'

import BScroll from 'better-scroll';

export default {
  name: 'Home',
  components:{
    NavBar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwipe,
    
  },
  setup(){

    let isTabFixed = ref(false);
    let isShowBackTop = ref(false);
    let bannref = ref(null);
    //商品数据模型
    const goods = reactive({
      sales:{page:1,list:[]},
      recommend:{page:1,list:[]},
      new:{page:1,list:[]},

    })
    let currentType = ref('sales');
    const showGoods = computed(()=>{
      return goods[currentType.value].list
    })

    let bscroll = reactive({});
    const recommends = ref([]);

    let banners = ref([]);
    onMounted(()=>{
      getHomeAllData().then(res => {
        recommends.value = res.goods.data;
        banners.value = res.slides;
      });
      getHomeGoods('sales').then(res => {
        goods.sales.list =  res.goods.data;
      })
      getHomeGoods('recommend').then(res => {
        goods.recommend.list =  res.goods.data;
        
      })
      getHomeGoods('new').then(res => {
        goods.new.list =  res.goods.data;
        
      })
      //创建betterScroll对象
      bscroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,//会触发scroll事件
        click: true,//是否允许点击
        pullUpLoad: true,//上拉加载更多 默认是false
      });
      
      //触发滚动事件
      bscroll.on('scroll',(position)=>{
       isShowBackTop.value = isTabFixed.value = (-position.y) > bannref.value.offsetHeight
      })
      //上拉加载数据,触发事件pullUpLpad
      bscroll.on("pullingUp",()=>{

        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value,page).then(res =>{
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        })

        //完成上拉 ，等数据请求完成 要将新数据展示出来
        bscroll.finishPullUp();

        //重新计算高度
        bscroll.refresh();
      })
      
    })

    const tabClick = (index)=>{
      let  types = ['sales','recommend','new'];
      currentType.value=types[index];
      nextTick(()=>{
        //重新计算高度
        bscroll && bscroll.refresh()
      })
    }

    //监听 任何一个变量有变量
    watchEffect(()=>{
      nextTick(()=>{
        //重新计算高度
        bscroll && bscroll.refresh()
      })
    })

    const bTop = () =>{
      bscroll.scrollTo(0,0,500)
    }

    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      bannref,
      isShowBackTop,
      bTop,
      banners
    }
    

  },
  data () {
   return {
   }
 },
}
</script>

<style scope>
.banners img{
  width: 100%;
  height: auto;
}
#home{
  height: 100vh;
  position: relative;
}
.wrapper{
  position:absolute;
  top:45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden; 
}
</style>
