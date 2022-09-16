const localStorageKeyName ='tagList'
type tag = {
    id:string
    name:string
}
type TagListModel = {
    data:tag[]
    fetch:()=>tag[] //获取 返回值是tag[] 上面和下面一一对应上面只写类型下面只写实现
    create:(name:string)=> 'success'| 'duplicated'//success表示成功 duplicated 代表重复 如果你返回的 仅有几个 可以这样 不需要string
    save:()=>void //void就是没返回值
}
const tagListModel:TagListModel = { //写一个对象并导出
    data:[],//拿到的数据tagList
    fetch(){ //读取数据
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]')
        return this.data
    },
    save(){//保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    },
    create(name:string){
        const names = this.data.map(item=>item.name)
        if (names.indexOf(name)>=0){
            //throw new Error('duplicated')
            return 'duplicated'
        }
        this.data.push({id:name,name:name})
        this.save()
        return 'success'
    }
}


export {tagListModel}