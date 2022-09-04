<template>
<nav>
  <router-link to="/money" class="item">
    <Icon name="money"/>
    记账</router-link>
  <router-link to="/labels" class="item">

    <Icon name="label"/>
    标签
  </router-link>
  <router-link to="/statistics" class="item">
    <Icon name="statistics"/>
    统计
  </router-link>
</nav>
</template>

<script lang="ts">


export default {
  name: 'Nav',

};
</script>

<style lang="scss" scoped>
  nav{
    font-size: 12px;
  display: flex;
  box-shadow: 0 0 3px rgba(0,0,0,0.25); //阴影
    .item{
      //上下2左右0
      padding: 2px 0;
      width: 33.333%;
      //居中
      display: flex;
      justify-content: center;
      align-items: center;
      //我们不去限定他的高度 而是用边距撑起来
      flex-direction: column;
      .icon{
        width: 30px;
        height: 30px;
      }
    }
  }
</style>