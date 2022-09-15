<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;//默认字体颜色，这个黑色柔和一些
  line-height: 1.5; //行高
  font-family: $font-kai; //字体
  font-size: 16px; //大小
  background: #f5f5f5;
}
</style>
