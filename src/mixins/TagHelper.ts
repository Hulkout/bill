import Vue from 'vue';
import Component from 'vue-class-component';

const map:{[key:string]:string} = {
    'tag name duplicated':'标签名重复'
}

@Component
export class TagHelper extends Vue{
    createTag(){
        const name = window.prompt('请输入标签名')
        if (name){
            this.$store.commit('createTag',name)
            if (this.$store.state.createTagError){
               window.alert(map[this.$store.state.createTagError.message]||'未知错误') //会报错 说你message不一定在map中 给map类型任意字符串就行吧
                return
            }
                window.alert('已保存')
        }else {
            window.alert('标签名不能为空')
        }
    }
}
