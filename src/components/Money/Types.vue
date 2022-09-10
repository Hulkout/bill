<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Types'
};
</script>

<style lang="scss" scoped>
.types{
  display: flex;
  background: #c4c4c4;
  text-align: center; //文字居中,这个没啥用可以去掉，因为我下面用flex做居中了
  font-size: 24px;
  >li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; //absolute父元素
    &.selected{ //如果不加&那就去他的子代找了，加了就看自身
      //border-bottom: 4px solid; //被选择下面出现黑线 不能用border 加border他就网上顶文字
      //所以用绝对定位，我们给他加一个after,当出先selected 再给他加after
      &::after{
        content: ''; //必须写不然不会出现
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333333;
      }

    }
  }
}
</style>