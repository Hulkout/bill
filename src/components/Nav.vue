<template>
<nav >
  <router-link to="/money" class="item" active-class="selected">
    <Icon name="money"/>
    记账
  </router-link>
  <router-link to="/labels" class="item" active-class="selected">
    <Icon name="label"/>
    标签
  </router-link>
  <router-link to="/statistics" class="item" active-class="selected">
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
@import "~@/assets/style/helper.scss";
  nav{
    @extend %outerShadow;//外阴影
    font-size: 12px;
    display: flex;
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
    .selected{
      color: $color-highlight;
    }
  }
</style>