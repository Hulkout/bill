<template>
  <div class="tags">
    <div class="new">
      <button>新增标签</button>
    </div>
    <ul class="current">
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>

    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags{
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;//我们设置的默认字体大小是16,局部覆盖
  padding: 16px;
  >.current{
    display: flex;
    flex-wrap: wrap;//换行
    // 没办法实现标签部分加滚动条 overflow: auto;//给标签加滚动条
    >li{
      background:#d9d9d9;
      border-radius:12px ; //圆角要是高度的50% 直接border-radius:50%默认宽度
      height: 24px;//所以我给定高度，设置为一半即可
      line-height: 24px;//高度等于行高 单行垂直居中用
      padding: 0 16px;//宽度直接靠内边距，上下0左右
      margin-right: 12px;
      margin-top: 4px;
    }
  }
  >.new{
    padding-top: 16px;//和上面距离，margin和padding都可以
    button{
      border: none;
      background: transparent;
      color: #999;
      border-bottom: 1px solid ;//默认和字体颜色一样
      padding: 0 5px; //下边框要比字宽，所以加内边距
    }
  }
}
</style>