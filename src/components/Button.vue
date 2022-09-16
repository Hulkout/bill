<template>
  <div>
    <button class="button" ><slot></slot></button>
  </div>
</template>

<script lang="js">
export default {
  name: 'Button'
};
</script>

<style lang="scss" scoped>
.button{
  background: #767676;
  color: white;
  border: none;
  border-radius:4px;
  height: 35px;
  padding: 0 16px;
  &-wrapper{ //表示他的父元素
    text-align: center;
    padding: 44px;
  }
}
</style>