import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createdId';

Vue.use(Vuex)
type RootState = {
  recordList:RecordItem[],
  tagList:Tag[],
  currentTag?:Tag //加？表示可以是undefined和Tag类型
}
const store =  new Vuex.Store({
  state: {
    recordList: [] ,
    tagList:[] ,
    currentTag:undefined
  }as RootState,
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






    fetchTags(state){ //读取数据
      state.tagList = JSON.parse(window.localStorage.getItem('tagList')||'[]')
    },
    saveTags(state){//保存数据
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
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
      store.commit('saveTags')
      window.alert('添加成功')
      return 'success'
    },
    setCurrentTag (state,id:string){
      //filter也返回数组 那他和map区别在哪 ,由于返回一个数组那我直接得到它[0]就是它
       state.currentTag = state.tagList.filter(t => t.id === id)[0] //这里不可以用this.tagList 因为箭头函数的this就是window 普通函数this是store
    },//下面这个由于不能接受三个参数 所以只能将他们两个变为对象
    updateTag(state,payload:{id:string,name:string}){ //告诉你id和name你去更新 成功返回success  失败告诉我问题，比如名字重复
      // 找数据库中有没有这个id
      // const id = object.id
      // const name = object.name
      const{id,name} = payload //析构语法 等于上面两局
      const idList = state.tagList.map(item=>item.id) //拿到所有id
      if ( idList.indexOf(id)>=0){ //如果有这个id 那就更新
        const names = state.tagList.map(item=>item.name)
        if (names.indexOf(name)>0){ //如果name在data中那就说重复了
          window.alert('标签名重复了') //这里可能有bug
        }else {
          const tag = state.tagList.filter(item=>item.id === id)[0] //拿到这个tag
          tag.name = name //更新name
          // tag.id = name
          store.commit('saveTags')//保存一下
        }
      }
    },
    removeTag(state,id:string){
      let index = -1
      for (let i = 0;i<state.tagList.length;i++){
        if (state.tagList[i].id === id){ //如果找到就结束 index 变为i
          index = i
          break
        }
      }
      if (index>=0){
        state.tagList.splice(index,1) //从这个index删除1个
        store.commit('saveTags')//删除完毕保存一下
      }else {
        window.alert('删除失败')
      }

    },
  },
  actions: {
  },
  modules: {
  }
})
export default store