<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :product="item" :key="item.id"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
  name: 'GoodsList',
  props:{
      goods:{
          type:Array,
          default(){
              return [];
          }
      }
  },
  components:{
    GoodsListItem
  },
  data () {
   return {
   }
 },
  created () {},
  methods: {}
}

</script>

<style lang="scss"  scoped>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 5px;
    z-index: 5px;
    // margin-bottom: 110px;
}
</style>
