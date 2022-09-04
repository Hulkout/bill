<template>
<div class="nav-wrapper">
  <div class="content">

    <p>Money</p>
    <p>Money</p>
    <p>Money</p><p>Money</p><p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p><p>Money</p><p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>    <p>Money</p>
    <p>Money</p>
    <p>Money</p><p>Money</p><p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>    <p>Money</p>
    <p>Money</p>
    <p>Money</p><p>Money</p><p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>    <p>Money</p>
    <p>Money</p>
    <p>Money</p><p>Money</p><p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>
    <p>Money</p>


  </div>

  <Nav/>
</div>
</template>

<script lang="ts">

export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
  .nav-wrapper{
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    height: 100vh; //确定 容器的高度
  }
  .content{
    border: 1px solid green;
    flex-grow: 1;//让内容有多少占多少
    overflow: auto; //当内容太多了出滚动条 而不是把我的nav顶出屏幕
  }
</style>