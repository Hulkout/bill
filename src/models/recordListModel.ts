const localStorageKeyName ='recordList'
const recordListModel = { //写一个对象并导出
    fetch(){ //读取数据
        //TS解析不出来 这个字符串JSON.parse解析出来是啥类型 所以我们强制指定
        return JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as RecordItem[]
    },
    save(data:RecordItem[]){//保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(data))
    },
    clone(data:RecordItem | RecordItem[]){
        return JSON.parse(JSON.stringify(data))
    }
}

// export default recordListModel
export {recordListModel}