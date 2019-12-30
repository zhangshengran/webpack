<template>
<div>
    Vue{{name}}
     <router-view></router-view>
</div>
</template>
<script>
export default {
  data(){
    console.log(123)
    return {
      name:123
    }
  },
}
</script>
<style>
div{
  color: red;
}
</style>
