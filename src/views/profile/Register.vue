<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户注册</template>
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
                v-model="name"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
                />
                <van-field
                v-model="password_confirmation"
                type="password"
                name="确认密码"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ required: true, message: '请填写确认密码' }]"
                />
                <van-field
                v-model="email"
                name="电子邮箱"
                label="电子邮箱"
                placeholder="电子邮箱"
                :rules="[{ required: true, message: '请填写正确邮箱格式' }]"
                />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round  block type="primary" @click="$router.push({path:'/login'})" >
                已有账号,立即登入
                </van-button>
                <van-button round color="#42b983" block type="primary" native-type="submit" style="margin-top:10px">
                注册
                </van-button>
            </div>
            </van-form>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import { register } from '../../network/user'
import { ref, reactive,toRefs} from 'vue'
import { Dialog,Toast } from 'vant';
import { useRouter } from 'vue-router'
export default {
  name: 'Register',
  components:{
      NavBar
  },
 setup(){
     const userinfo = reactive({
         name:'',
         password:'',
         password_confirmation:'',
         email:'',
     });
    
    const router = useRouter();
    const onSubmit = ()=>{
        if(userinfo.password != userinfo.password_confirmation){
            Dialog({ message: '两次输入的密码不一致' });
        }else{
            register(userinfo).then(res=>{
                //uers  用户名zshadmin 密码123456 email zshadmin@qq.com
                if(res.status == '201'){
                    Toast('注册成功');
                    setTimeout(()=>{
                        router.push({path:'/login'})
                    },1000)
                }
                userinfo.password = '';
                userinfo.password_confirmation = '';
            })
        }
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
