<template>
<Layout class-prefix="layout">
<!--<NumberPad :value="record.amount" @update:value="onUpdateAmount"></NumberPad>-->
  <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
<!--<Types @update:value="onUpdateType" :value="record.type"></Types>  改用下面的-->
  <Types :value.sync="record.type"></Types>
  <div class="notes">
    <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请在此输入备注"></FormItem>
  </div>
<Tags   @update:value="onUpdateTags" :data-source.sync="tags"/>
</Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue, Watch} from 'vue-property-decorator';
import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';
//在TS中声明类型
// type RecordItem = {
//   tag:string
//   notes:string
//   type:string //这两个type不会冲突哦 TS不是傻子
//   amount:number
//   createdAT?: Date
//   //时间 除了数据类型还可以写一个类。
//   // JS中类也是构造函数，Object 数据类型中的一类Date createdTime?表示可以不存在
// }
const recordList = recordListModel.fetch()

@Component({
  components:{Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue{
  // tags=['衣','食','住','行']
  tags = tagListModel.fetch()
  record:RecordItem = {
    tag:'',
    notes:'',
    type:'-',
    amount:0
  }

  recordList = recordList
  //fetch返回值已经强制类型了
  // recordList:RecordItem[]= recordListModel.fetch()
  //recordList:Record[]=  JSON.parse(window.localStorage.getItem('recordList')||'[]')

  onUpdateTags(value:string){
    this.record.tag = value
    console.log(value);
  }
  onUpdateNotes(value:string){
    this.record.notes = value
    console.log(value)
  }
  saveRecord(){
    // const deepClone:RecordItem = JSON.parse(JSON.stringify(this.record))
    recordListModel.create(this.record)
  }
  @Watch('recordList')
  onRecordListChange(){
    // window.localStorage.setItem('recordList',JSON.stringify(this.recordList)) //只能存储字符串  通过JSON序列化 变为字符串
    recordListModel.save()
  }
  // onUpdateType(value:string){ 由于改用.sync所以这里就不需要了
  //   this.record.type = value
  //   console.log(value)
  // }
  // onUpdateAmount(value:string){ //你会给我一个值 由于改用.sync所以这里就不需要了
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
.notes{
  padding: 12px 0;
}
</style>