<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" placeholder="在这里输入备注"
             v-model="value"
      >
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Vue,Watch} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
  value = ''
  @Watch('value')
  onValueChanged(value:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang="scss" scoped>
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
</style>