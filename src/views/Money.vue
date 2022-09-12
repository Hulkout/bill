<template>
<Layout class-prefix="layout">
{{record}}
<!--<NumberPad :value="record.amount" @update:value="onUpdateAmount"></NumberPad>-->
  <NumberPad :value.sync="record.amount"></NumberPad>
<!--<Types @update:value="onUpdateType" :value="record.type"></Types>  改用下面的-->
  <Types :value.sync="record.type"></Types>
<Notes @update:value="onUpdateNotes" ></Notes>
<Tags   @update:value="onUpdateTags" :data-source.sync="tags"/>
</Layout>
</template>

<script lang="ts">

import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue} from 'vue-property-decorator';

//在TS中声明类型
type Record = {
  tag:string
  notes:string
  type:string //这两个type不会冲突哦 TS不是傻子
  amount:number
}

@Component({
  components:{Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue{
  tags=['衣','食','住','行','哈哈']
  record:Record = {
    tag:'',
    notes:'',
    type:'-',
    amount:0
  }
  onUpdateTags(value:string){
    this.record.tag = value
    console.log(value);
  }
  onUpdateNotes(value:string){
    this.record.notes = value
    console.log(value)
  }
  // onUpdateType(value:string){ 由于改用。sync所以这里就不需要了
  //   this.record.type = value
  //   console.log(value)
  // }
  // onUpdateAmount(value:string){ //你会给我一个值 由于改用。sync所以这里就不需要了
  //   this.record.amount= parseFloat(value)
  //   console.log(value);
  // }
}
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.layout-content{
  display: flex;
  flex-direction: column-reverse;
}
</style>