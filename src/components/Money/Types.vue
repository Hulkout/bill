<template>
  <div>
    <ul class="types">
      <li :class="value==='-'&&'selected'" @click="selectType('-')">支出</li>
      <li :class="value==='+'&&'selected'" @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">

import { Vue, Component ,Prop} from 'vue-property-decorator'
//上面这个库是啥呢'vue-property-decorator' ，它不是由于西写的，因为它写的比由于西的好，由于西写的叫vue-class-component(官方提供的TS支持库)
//装饰器 Component 告诉 script 下面那个是Vue的组件，这些东西会自动被处理成data methods，不用深究
@Component
//还有好多装饰器 去网上看vue-property-decorator这个库的用法 component这个修饰器也是它用的官方的

export default class Types extends Vue{
  @Prop() readonly value!:string //不加！会报错 加了就是 你别管我有没有初始值

  selectType(type:string){ //接收一个type(+或-) 让data中的type等于这个type  如果不是+ - 报错
   if (type !== '-'&& type !== '+'){
    throw new Error('type is unknown')
   }
   this.$emit('update:value',type)
  }
}
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