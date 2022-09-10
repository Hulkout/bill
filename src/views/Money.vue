<template>
<Layout class-prefix="layout">



  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons" >
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注">
    </label>
  </div>
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
</Layout>
</template>

<script lang="ts">

export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad{
  >.output{
    font-size: 36px;
    font-family: Consolas,monospace;//,后面接一类字体  编程字体 每个字等宽
    padding: 9px 16px;
    text-align: right;
    @extend %innerShadow //内阴影

  }
  >.buttons{
    @extend %clearFix;
    button{
      float: left;
      width: 25%;
      height:64px;//8vh屏幕高度百分之8，宽度vw 写百分比没用不知道为啥
      background: transparent;
      border:none;
      &.ok{
        height: 128px;
        float: right;
      }
      &.zero{
        width: 50%;
      }
      $bg:#f2f2f2;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg,4%);//变暗
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg,8%);//变暗
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10){
        background: darken($bg,12%);//变暗
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(13){
        background: darken($bg,4*4%);//变暗
      }
      &:nth-child(14){
        background: darken($bg,5*4%);//变暗
      }
      &:nth-child(12){
        background: darken($bg,6*4%);//变暗
      }
    }
  }
}
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
.notes{
  //display: block;//它默认是 inline-block
  background: #f5f5f5;
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items: center;//上下居中
  .name{
    padding-right:16px ;
  }
  input{
    height:64px;//因为那一大块都要一点就能输入，所以我们要让他高一些，并且没有上下间距,height line height padding都可以做
    flex-grow: 1; //这个就宽了 直接flex:1也行，这里需要学一下，忘了咋弄了
    background: transparent;
    border: none;
    padding-right:16px;
    //同时input reset 掉了 点击出现的那个外边框
  }
}
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

<style lang="scss">
.layout-content{
  display: flex;
  flex-direction: column-reverse;
}
</style>