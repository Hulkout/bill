type RecordItem = {
  tag:string
  notes:string
  type:string //这两个type不会冲突哦 TS不是傻子
  amount:number
  createdAT?: Date
  //时间 除了数据类型还可以写一个类。
  // JS中类也是构造函数，Object 数据类型中的一类Date createdTime?表示可以不存在
}
type Tag = {
  id:string
  name:string
}
type TagListModel = {
  data:Tag[]
  fetch:()=>Tag[] //获取 返回值是tag[] 上面和下面一一对应上面只写类型下面只写实现
  create:(name:string)=> 'success'| 'duplicated'//success表示成功 duplicated 代表重复 如果你返回的 仅有几个 可以这样 不需要string
  save:()=>void //void就是没返回值
  update:(id:string,name:string)=>'success'|'not found' | 'duplicated'
  remove:(id:string) => boolean
 }
// interface Window{ //给Window加上一个属性  FUCK 那我这里就没用了
//   // store:{
//   //   tagList:Tag[] //类型Tag数组
//   //   createTag:(name:string)=>void
//   //   removeTag:(id:string)=>boolean
//   //   updateTag:(id:string,name:string)=>'success'|'not found' | 'duplicated'
//   //   findTag:(id:string)=>Tag
//   //
//   //   //record
//   //   recordList:RecordItem[]
//   //   createRecord:(record:RecordItem)=>void
//   // }
// }