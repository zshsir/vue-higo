<template>
  <div class="nav-bar">
    <div class="left" @click="goback()">
        <slot name="left">
            <img src="@/assets/images/left.png" alt=""/>
        </slot>
    </div>
    <div class="center"><slot></slot></div>
    <div class="right"><slot name="right"></slot></div>

  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'NavBar',
  setup(){
      const router = useRouter();
      const goback = () =>{
          router.go(-1)
      }
      return {
          goback
      }
  },


}

</script>

<style lang="scss" scoped>
.nav-bar{
    display: flex;
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top:0px;
    z-index: 10;
    height: 45px;
    line-height: 45px;
    text-align: center;
    box-shadow: 0 3px 0px rgba(100,100,100,0.1);
}
.left, .right{
    width: 60px;
}
.left img{
    width: 45px;
    height: 45px;
    padding: 5px;
}
.center{
    flex: 1;
}
</style>
