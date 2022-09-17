import createId from '@/lib/createdId';

const localStorageKeyName ='tagList'

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
        const id = createId().toString()
        this.data.push({id:id,name:name})
        this.save()
        return 'success'
    },
    update(id,name){ //告诉你id和name你去更新 成功返回success  失败告诉我问题，比如名字重复
        // 找数据库中有没有这个id
        const idList = this.data.map(item=>item.id) //拿到所有id
        if ( idList.indexOf(id)>=0){ //如果有这个id 那就更新
            const names = this.data.map(item=>item.name)
            if (names.indexOf(name)>0){ //如果name在data中那就说重复了
                return 'duplicated'
            }else {
                const tag = this.data.filter(item=>item.id === id)[0] //拿到这个tag
                tag.name = name //更新name
                // tag.id = name
                this.save()//保存一下
                return 'success'
            }
        }else {
            return 'not found'
        }

    },
    remove(id:string){
        let index = -1
       for (let i = 0;i<this.data.length;i++){
           if (this.data[i].id === id){ //如果找到就结束 index 变为i
               index = i
               break
           }
        }
       this.data.splice(index,1) //从这个index删除1个
        this.save()//删除完毕保存一下
        return true
    }
}


export {tagListModel}