<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户登入</template>
    </nav-bar>
    <div class="register">
        <div class="registerInfo">
            <van-image
            width="10rem"
            height="10rem"
            fit="contain"
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-9dbe1e2184b4ec4872ed5db829efd632_1440w.jpg%3Fsource%3D172ae18b&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1652957821&t=e724c6da044a972a760a23a6fe0e7ffd"
            />
        </div>
    </div>
    <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                v-model="email"
                name="邮箱"
                label="邮箱"
                placeholder="邮箱"
                :rules="[{ required: true, message: '请填写邮箱' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round  block type="primary" @click="$router.push({path:'/register'})" >
                没有账号,立即注册
                </van-button>
                <van-button round color="#42b983" block type="primary" native-type="submit" style="margin-top:10px">
                登入
                </van-button>
            </div>
            </van-form>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { login } from '../../network/user'
import { ref, reactive,toRefs} from 'vue'
import { Dialog,Toast } from 'vant';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
export default {
  name: 'Login',
  components:{
      NavBar
  },
 setup(){
     const userinfo = reactive({
         email:'',
         password:'',
     });
    
    const router = useRouter();
    const store = useStore();

    const onSubmit = ()=>{
        login(userinfo).then(res=>{
            //一定要把 token 保存在本地 windows.localStorage setItem(key,value)  getItem(key)
            window.localStorage.setItem('token',res.access_token);
            //在 vuex isLogin
            store.commit('setIsLogin',true)


            Toast.success('登入成功')
            userinfo.email = '';
            userinfo.password = '';

            setTimeout(()=>{
                router.go(-1);
            },500)

        })
    }
     
     return {
         ...toRefs(userinfo),
         onSubmit
     };
 },
}

</script>

<style lang="scss" scoped>
.register{
    margin-top: 50px;
    .registerInfo{
        text-align: center;
    }

}
</style>
