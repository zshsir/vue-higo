<template>
  <div id="app">
    <!-- <router-view/> -->

    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <div id="nav">
      <router-link to="/" class="tab-bar-item">
        <div class="icon"><i class="iconfont icon-shouye"></i></div>
        <div>首页</div>
      </router-link> 
      <router-link to="/category" class="tab-bar-item">
        <div class="icon"><i class="iconfont icon-fenlei"></i></div>
        <div>分类</div>
      </router-link> 
      <router-link to="/shotCart" class="tab-bar-item">
        <div class="icon">
          <van-badge :content="$store.state.cartCount" max="9" class='icon-gwc'>
          <i class="iconfont icon-gouwuche"></i>
         </van-badge>
          </div>
        <div>购物车</div>
      </router-link> 
      <router-link to="/profile" class="tab-bar-item">
        <div class="icon"><i class="iconfont icon-wode"></i></div>
        <div>我的</div>
      </router-link> 
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex'
export default{
  setup(){
    const store = useStore();
    onMounted(()=>{
      store.dispatch('updatedCart')
    })
  }
}
</script>
<style lang="scss">
@import './assets/css/common.css';
@import './assets/css/iconfont.css';
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom:0px;
  box-shadow: 0 -3px 1px rgba(100,100,100,0.1);
  z-index: 10000;
  a {
    color: #2c3e50;

    &.router-link-exact-active{
      color: rgb(243, 56, 56);
    }
  }
  .tab-bar-item{
    flex: 1;
    height: 50px;
    font-size: 14px;
  }
  .tab-bar-item .icon{
    width: 24px;
    height: 24px;
    display: inline-block;
  }
  .icon-gwc{
    margin-top: 5px;
  }
}
</style>
