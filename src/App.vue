<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{//默认行高
    line-height: 1.5;
  }
  a{
    //取消下划线
    text-decoration: none;
    color: inherit;
  }
</style>
