<template>
<Layout class-prefix="layout">
<!--<NumberPad :value="record.amount" @update:value="onUpdateAmount"></NumberPad>-->
  <NumberPad :value.sync="record.amount" @submit="saveRecord"></NumberPad>
<!--<Types @update:value="onUpdateType" :value="record.type"></Types>  改用下面的-->
<!--  <Types :value.sync="record.type"></Types>-->
  <Tabs :data-source="recordTypeList"
        :value.sync="record.type"/>
  <div class="notes">
    <FormItem @update:value="onUpdateNotes" field-name="备注" placeholder="请在此输入备注"></FormItem>
  </div>
<Tags/>
</Layout>
</template>

<script lang="ts">
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Vue} from 'vue-property-decorator';
// import oldStore from '@/store/index2';
import store from '@/store/index';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
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
@Component({
  components:{Tabs, Tags, FormItem, Types, NumberPad},
  // computed:{
  //   recordList(){
  //     return this.$store.state.recordList
  //   }
  // }
})
export default class Money extends Vue{
  // tags=['衣','食','住','行']
 // recordList = oldStore.recordList //好像没啥用了
  record:RecordItem = {
    tag:'',
    notes:'',
    type:'-',
    amount:0
  }
  recordTypeList = recordTypeList;


  //fetch返回值已经强制类型了
  // recordList:RecordItem[]= recordListModel.fetch()
  //recordList:Record[]=  JSON.parse(window.localStorage.getItem('recordList')||'[]')

  // onUpdateTags(value:string){
  //   this.record.tag = value
  // }
  onUpdateNotes(value:string){
    this.record.notes = value
  }
  saveRecord(){
    // const deepClone:RecordItem = JSON.parse(JSON.stringify(this.record))
   this.$store.commit('createRecord',this.record) //vuex的调用方法
  }
  // @Watch('recordList')
  // onRecordListChange(){
  //   // window.localStorage.setItem('recordList',JSON.stringify(this.recordList)) //只能存储字符串  通过JSON序列化 变为字符串
  //   recordListModel.save()
  // }
  // onUpdateType(value:string){ 由于改用.sync所以这里就不需要了
  //   this.record.type = value
  //   console.log(value)
  // }
  // onUpdateAmount(value:string){ //你会给我一个值 由于改用.sync所以这里就不需要了
  //   this.record.amount= parseFloat(value)
  //   console.log(value);
  // }
  created(){ //提前初始化 不然拿不到数据
    this.$store.commit('fetchRecords')
  }
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