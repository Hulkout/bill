
import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
    ...recordStore, //对象的值拷贝过来
    ...tagStore


}
export default store