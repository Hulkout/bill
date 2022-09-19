
import createId from '@/lib/createdId';

const localStorageKeyName ='tagList'

const tagStore = { //写一个对象并导出
    tagList:[] as Tag[],//拿到的数据tagList
    fetchTags(){ //读取数据
        this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName)||'[]')
        return this.tagList
    },
    saveTags(){//保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.tagList))
    },
    createTag(name:string){
        const names = this.tagList.map(item=>item.name)
        if (names.indexOf(name)>=0){
            //throw new Error('duplicated')
            window.alert('标签名重复了')
            return 'duplicated'
        }
        const id = createId().toString()
        this.tagList.push({id:id,name:name})
        this.saveTags()
        window.alert('添加成功')
        return 'success'
    },
    updateTag(id:string,name:string){ //告诉你id和name你去更新 成功返回success  失败告诉我问题，比如名字重复
        // 找数据库中有没有这个id
        const idList = this.tagList.map(item=>item.id) //拿到所有id
        if ( idList.indexOf(id)>=0){ //如果有这个id 那就更新
            const names = this.tagList.map(item=>item.name)
            if (names.indexOf(name)>0){ //如果name在data中那就说重复了
                return 'duplicated'
            }else {
                const tag = this.tagList.filter(item=>item.id === id)[0] //拿到这个tag
                tag.name = name //更新name
                // tag.id = name
                this.saveTags()//保存一下
                return 'success'
            }
        }else {
            return 'not found'
        }

    },
    removeTag(id:string){
        let index = -1
        for (let i = 0;i<this.tagList.length;i++){
            if (this.tagList[i].id === id){ //如果找到就结束 index 变为i
                index = i
                break
            }
        }
        this.tagList.splice(index,1) //从这个index删除1个
        this.saveTags()//删除完毕保存一下
        return true
    },


}
tagStore.fetchTags()

export default tagStore


