import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue{
    createTag(){
        const name = window.prompt('请输入标签名')
        if (name){
            this.$store.commit('createTag',name)
            if (this.$store.state.createTagError===null){
                window.alert('已保存')
            }
        }else {
            window.alert('标签名不能为空')
        }
    }
}
