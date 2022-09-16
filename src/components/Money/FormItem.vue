<template>
  <div>
    <label class="formItem">
      <span class="name">{{this.fieldName }}</span>
      <input type="text" :placeholder="this.placeholder"
             v-model="value"
      >
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
@Component
export default class FormItem extends Vue{
  value = ''
  @Watch('value')
  onValueChanged(value:string){
    this.$emit('update:value',value)
  }

  @Prop({required:true}) fieldName!:string  //必须传 加！你别烦我了不加就必须给初始值 option里写一个deft
  @Prop({required:true}) placeholder?:string //写个问好有可能不存在
}
</script>

<style lang="scss" scoped>
.formItem{
  //display: block;//它默认是 inline-block
  font-size: 14px;
  padding-left:16px;
  display: flex;
  align-items: center;//上下居中
  .name{
    padding-right:16px ;
  }
  input{
    height:40px;//因为那一大块都要一点就能输入，所以我们要让他高一些，并且没有上下间距,height line height padding都可以做
    flex-grow: 1; //这个就宽了 直接flex:1也行，这里需要学一下，忘了咋弄了
    background: transparent;
    border: none;
    padding-right:16px;
    //同时input reset 掉了 点击出现的那个外边框
  }
}
</style>