<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
          <li v-for="(group,index) in result" :key="index" >
            <h3 class="title">{{group.title}}</h3>
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
@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList
  created(){//记得先fetch
    this.$store.commit('fetchRecords')
  }
  get recordList (){
    // eslint-disable-next-line no-undef
    return (this.$store.state as RootState).recordList
  }

  get result(){ //拿到结果
    const {recordList} = this;
    //const recordList = this.recordList
    //做一个桶
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {}; //声明一个空对象的类型
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T')
      //放到哈希中
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable
  }
  //设置tag初始值
  tagString(tag:string){
    return tag === ''?'无':tag
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .type-tabs-item{
  background: white;
  &.selected{
    background: #c4c4c4;
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
    //万一备注很长 可以要加省略号
  }
</style>