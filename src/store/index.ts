import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createdId';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList:[] as Tag[]
  },
  mutations: {
    createRecord(state,record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAT = new Date();
      state.recordList.push(record2);
      //saveRecords(); //这里放到store中的调用
      store.commit('saveRecords')
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      //return this.recordList;  不需要return了 直接就改了 ，一定要钩子提前初始化 不然拿不到之前的数据
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },










    createTag(state,name:string){
      const names = state.tagList.map(item=>item.name)
      if (names.indexOf(name)>=0){
        //throw new Error('duplicated')
        window.alert('标签名重复了')
        return 'duplicated'
      }
      const id = createId().toString()
      state.tagList.push({id:id,name:name})
      //this.saveTags()
      window.alert('添加成功')
      return 'success'
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store