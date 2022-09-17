import clone from '@/lib/clone';

const localStorageKeyName ='recordList'
const recordListModel = { //写一个对象并导出
    data:[] as RecordItem[], //强制断言他是这个类型
    fetch(){ //读取数据
        //TS解析不出来 这个字符串JSON.parse解析出来是啥类型 所以我们强制指定
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]') as RecordItem[]
        return this.data
    },
    save(){//保存数据  此时不用给我data了我直接保存我的data就行了
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    },
    create(record:RecordItem){
        const deepClone:RecordItem = clone(record)
        deepClone.createdAT = new Date() //new Date当前时间
        this.data.push(deepClone)
        this.save()//创建后马上save
    }
}

// export default recordListModel
export {recordListModel}