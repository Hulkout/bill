const localStorageKeyName ='tagList'
type TagListModel = {
    data:string[]
    fetch:()=>string[] //fetch是一个函数返回一个字符串数组 上面和下面一一对应上面只写类型下面只写实现
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
        if (this.data.indexOf(name)>=0){
            //throw new Error('duplicated')
            return 'duplicated'
        }
        this.data.push(name)
        this.save()
        return 'success'
    }


}


export {tagListModel}