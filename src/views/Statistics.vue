<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
      <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
      <div>
        type: {{type}}
        <br/>
        interval: {{interval}}
      </div>
      <div>
        <ol>
<!--          key 不知道咋写 用下标吧-->
          <li v-for="(group,index) in result" :key="index">
            <h3>{{group.title}}</h3>
            <ol>
              <li v-for="item in group.items" :key="item.id">{{item.amount}}
                {{item.createdAt}}</li>
            </ol>
          </li>
        </ol>
      </div>
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
    const {recordList} = this
    //const recordList = this.recordList
    //做一个桶
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable :{[key:string]:HashTableValue}= {} //声明一个空对象的类型
    for(let i = 0;i<recordList.length;i++){
      const[date,time] = recordList[i].createdAt!.split('T')
      //放到哈希中
      hashTable[date] =   hashTable[date]||{title: date, items: []};
      hashTable[date].items.push(recordList[i])

    }
    return hashTable
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
</style>