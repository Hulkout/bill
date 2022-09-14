<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons" >
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue,Component,Prop} from 'vue-property-decorator';
@Component
export default class NumberPad extends Vue{
  @Prop() readonly value!:number
  output = this.value.toString()
  // output = '0'  本来这样就可以 但是为了代码的统一性改用.sync 改成上面这个样子其实没必要
  inputContent(event:MouseEvent){
    const button = event.target as HTMLButtonElement
    const input = button.textContent as string //下面有报错input可能是空 但是我们知道它不可能是空所以强制指定, as string 可以用！替换，！就是把空排除
    if (this.output.length===16){
      alert("醒醒 你没那么多钱");
      return;
    }
    if (this.output === '0'){ //output 是0
      if ('0123456789'.indexOf(input)>=0){//如果你输入的东西是0123456789中的索引大于=0 那就替换掉它
        this.output = input
      }else{ //看是不是.
        this.output+=input
      }
      return;
    }
    if (this.output.indexOf('.')>=0){
      if (input === '.'){return;}
    }
    this.output+=input
  }
  remove(){
    if (this.output.length===1){
      this.output = '0'
      return
    }
    this.output = this.output.slice(0,this.output.length-1);
  }
  clear(){
    this.output = '0'
  }
  ok(){
    this.$emit('update:value',this.output)
    this.$emit('submit',this.output)
    this.output = '0'
  }

}
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
</style>