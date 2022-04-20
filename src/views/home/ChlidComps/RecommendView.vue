<template>
  <div class="recommend">
      <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
          <a href="" @click.prevent = "goD(item.id)">
              <img v-lazy="item.cover_url" />
              <div>{{item.title}}</div>
          </a>
      </div>
      
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: 'RecommendView',
  props:{
      recommends:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  setup(){
      const router = useRouter();
      const goD = (id)=>{
          router.push({
              path:'/detail',
              query:{id}
          })
      }
      return {
          goD
      }

  },
  
  data () {
   return {
   }
 },
  created () {
     
  },
  methods: {}
}

</script>

<style  scoped lang="scss">
.recommend {
    width: 100%;
    display: flex;
    text-align: center;
    padding: 10px 0px 30px;
    border-bottom: 8px solid #EEE;
    font-size: 12px;
}
.recommend-item {
    flex: 1;
    img{
        width: 75px;
        height: 75px;
        margin-bottom: 10px;
    }
}
</style>
