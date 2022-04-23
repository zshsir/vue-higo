<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <div style="margin:15px;margin-top:100px">
      <van-button @click="tologout" round block color="#44BA80">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { logout } from '@/network/user'
import NavBar from '../../components/common/navbar/NavBar.vue'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
 
export default {
  name: 'Profile',
  data () {
   return {
   }
 },
 components:{
    NavBar,
  },
  setup(){
    const router = useRouter();
    const store = useStore();
    const tologout = ()=>{
      logout().then(res=>{
        if(res.status == '204'){
          Toast.success('退出成功');
          //清除token window.localStroage
          window.localStorage.setItem('token','');

            store.commit('setIsLogin',false)
          setTimeout(()=>{
            router.push({path:'/login'});
          },)
        }
      })
      
    }
    return{
      tologout
    }
  },
}

</script>

<style  scoped>

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 4px;
      }
      .user-desc {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        line-height: 20px;
        font-size: 14px;
        color: #fff;
        span {
          color: #fff;
          font-size: 14px;
          padding: 2px 0;
        }
      }
      .account-setting {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 13px;
        color: #fff;
        .van-icon-setting-o {
          font-size: 16px;
          vertical-align: -3px;
          margin-right: 4px;
        }
      }
    }
  }
  .user-list {
    padding: 0 8px;
    margin-top: 40px;
    li {
      padding-left: 5px;
      padding-right: 5px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .van-icon-arrow {
        margin-top: 13px;
      }
      margin: 20px 0 !important;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
</style>
