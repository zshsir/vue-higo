<template>
  <div class='HomeSwipe'>
    <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in banners">
            <img v-lazy="item.img_url" />
        </van-swipe-item>
        
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'HomeSwipe',
  props:{
      banners:{
        type:Array,
         default(){
            return []
       }
    }
      
  },
  data () {
   return {
   }
 },
  created () {},
  methods: {}
}

</script>

<style  scoped>
img{
    width: 100%;
    height: auto !important;
}
</style>
