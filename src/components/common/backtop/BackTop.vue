<template>
  <div class="backTop" @click="backtop">
    
  </div>
</template>

<script>
export default {
  name: 'backTop',
  setup(props,{emit}){
    return{
      backtop:()=>{
        emit('bTop');
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
.backTop{
  width: 45px;
  height: 45px;
  position: fixed;
  bottom: 60px;
  right: 20px;
  z-index: 20;
  /* box-shadow: 5px 5px 5px #888888; */
  border-radius: 50%;
  background: #888888 url('../../../assets/images/pull_up.png');
}
</style>
