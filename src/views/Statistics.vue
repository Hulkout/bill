<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
<!--      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>-->
        <ol>
          <li v-for="(group,index) in groutList" :key="index" >
            <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
            <ol >
              <li v-for="item in group.items" :key="item.id" class="record" >
                <span>{{tagString(item.tag)}}</span>
                <span class="notes"> {{item.notes}}</span>
                <span>￥{{item.amount}} </span>
               </li>
            </ol>
          </li>
        </ol>
    </Layout>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';

import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs'
import clone from '@/lib/clone';
const api = dayjs()
console.log(api)
@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  // interval = 'day';
  // intervalList = intervalList;
  recordTypeList = recordTypeList
  created(){//记得先fetch
    this.$store.commit('fetchRecords')
  }
  get recordList (){
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList
  }

  get groutList(){ //拿到结果
    const {recordList} = this;
    if (recordList.length === 0){return [] }
    //它是一个数组 我们首先要对他进行排序,排序依据是时间，但是字符串可以判断大小，但是我们要判断大小等所以用减法 sort可能会改变原数组 所以克隆一下
    //克隆进行了修改  clone的类型可以通过recordList推出来 ，退出来之后sort里的每一项也都可以推出来
    const newList = clone(recordList).filter(r=>r.type===this.type).sort((a,b)=>dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
    type Result = {title:string,total?:number,items:RecordItem[]}[]
    //拿到第一项   需要格式化
    const result:Result = [{title:dayjs(newList[0].createdAt).format('YYYY-MM-DD'),items:[newList[0]]}]
    for (let i = 1;i<newList.length;i++){
      const current  = newList[i]
      const last = result[result.length-1]  //最后一项
      //最后一项的title  和当前的日期 是否是同一day 是就放进去 不是就新建
      if (dayjs(last.title).isSame(dayjs(current.createdAt),'day')){
        last.items.push(current)
      }else {
        result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'),items:[current]})
      }
    }
    //对每一项分组  然后给他加一个total 初始值0
    result.forEach(group=>{
      group.total = group.items.reduce((sum,item)=>sum+item.amount,0)
    })
    return result
  }
  // get groupedList() {
  //   const {recordList} = this;
  //   if (recordList.length === 0) {return [];}
  //   const newList = clone(recordList)
  //       .filter(r => r.type === this.type)
  //       .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  //   type Result = { title: string, total?: number, items: RecordItem[] }[]
  //   const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
  //   for (let i = 1; i < newList.length; i++) {
  //     const current = newList[i];
  //     const last = result[result.length - 1];
  //     if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
  //       last.items.push(current);
  //     } else {
  //       result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
  //     }
  //   }
  //   result.map(group => {
  //     group.total = group.items.reduce((sum, item) => {
  //       console.log(sum);
  //       console.log(item);
  //       return sum + item.amount;
  //     }, 0);
  //   });
  //   return result;
  // }
  //设置tag初始值
  // eslint-disable-next-line no-undef
  tagString(tag:Tag[]){
    console.log(tag)
    return tag.length === 0 ? '无' : tag.map(t=>t.name).join(',');
  }
  //美化title
    beautify(string: string) {
      const day = dayjs(string); //得到一个api  isSame 判断是否相同
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';         //now.subtract(1, 'day') subtract 减 1 天
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }
}
</script>

<style lang="scss" scoped>
  ::v-deep .type-tabs-item{
  background: #c4c4c4;
  &.selected{
    background: white;
    &::after{
      display: none;
    }
  }
}

  ::v-deep li.interval-tabs-item{
    height: 48px;
  }


  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }
  .title {
    @extend %item;
  }
  .record {
    background: white;
    @extend %item;
  }
  .notes{
    //由于我用的spaceB 它会居中 用下面一句可以控制它靠边
    margin-right: auto;
    margin-left: 8px;
    color: #999999;
    //万一备注很长 要加省略号
  }
</style>