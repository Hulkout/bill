type RecordItem = {
  tag:string
  notes:string
  type:string //这两个type不会冲突哦 TS不是傻子
  amount:number
  createdAT?: Date
  //时间 除了数据类型还可以写一个类。
  // JS中类也是构造函数，Object 数据类型中的一类Date createdTime?表示可以不存在
}