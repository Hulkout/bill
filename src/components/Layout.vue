<template>
  <div class="nav-wrapper">
    <div class="content">
    <slot>插槽 用户传给我的内容</slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  export default {
    name:'Layout'
  }
</script>

<style lang="scss" scoped>
.nav-wrapper{
  display: flex;
  flex-direction: column;
  height: 100vh; //确定 容器的高度
}
.content{

  flex-grow: 1;//让内容有多少占多少
  overflow: auto; //当内容太多了出滚动条 而不是把我的nav顶出屏幕
}
</style>