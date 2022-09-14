<template>
<Layout class-prefix="layout">
{{recordList}}
<!--<NumberPad :value="record.amount" @update:value="onUpdateAmount"></NumberPad>-->
  <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
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
import {Component, Vue, Watch} from 'vue-property-decorator';

//在TS中声明类型
type Record = {
  tag:string
  notes:string
  type:string //这两个type不会冲突哦 TS不是傻子
  amount:number
  createdAT?: Date
  //时间 除了数据类型还可以写一个类。
  // JS中类也是构造函数，Object 数据类型中的一类Date createdTime?表示可以不存在
}

@Component({
  components:{Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue{
  tags=['衣','食','住','行']
  record:Record = {
    tag:'',
    notes:'',
    type:'-',
    amount:0
  }
  recordList:Record[]=  JSON.parse(window.localStorage.getItem('recordList')||'[]')
  onUpdateTags(value:string){
    this.record.tag = value
    console.log(value);
  }
  onUpdateNotes(value:string){
    this.record.notes = value
    console.log(value)
  }
  saveRecord(){
    const deepClone:Record = JSON.parse(JSON.stringify(this.record))
    deepClone.createdAT = new Date() //new Date当前时间
    this.recordList.push(deepClone)

  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList)) //只能存储字符串  通过JSON序列化 变为字符串
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