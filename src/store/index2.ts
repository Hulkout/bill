import {recordListModel} from '@/models/recordListModel';
import {tagListModel} from '@/models/tagListModel';

const store = {
    //record store
    recordList : recordListModel.fetch(),
    createRecord : (record:RecordItem)=>{
        recordListModel.create(record)
    },

    //tag store
    tagList : tagListModel.fetch(),
    createTag : (name:string)=>{
        const message = tagListModel.create(name)
        if (message === 'duplicated'){
            window.alert('标签名重复了')
        }else if (message==='success'){
            window.alert('创建成功')
        }
    },
    removeTag : (id:string)=>{
        return tagListModel.remove(id); //它本来就返回布尔
    },
    updateTag : (id:string,name:string)=>{
        return tagListModel.update(id,name)
    },
    findTag : (id:string)=>{
        //filter也返回数组 那他和map区别在哪 ,由于返回一个数组那我直接得到它[0]就是它
        return  store.tagList.filter(t => t.id === id)[0] //这里不可以用this.tagList 因为箭头函数的this就是window 普通函数this是store
    }
}
export default store