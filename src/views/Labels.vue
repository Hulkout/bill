<template>
  <Layout>
    <div class="tags">
<!--      包一个span经验之谈-->
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key = 'tag.id'><span>{{tag.name}}</span><Icon name="right"/></router-link>
    </div>
    <div class="createTag-wrapper">
    <Button @click="createTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Vue,Component}from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import Button from '@/components/Button.vue';
// tagListModel.fetch() //先fetch就可以直接用data了
@Component({
  components: {Button}
})
export default class Labels extends Vue{
  tags = window.tagList
  createTag(){
    const name = window.prompt('请输入标签名')
    // window.createTag(name,()=>{},()=>{}) 如果需要更多功能可以添加函数 成功了调第一个失败掉第二个
    if (name){
      window.createTag(name)
    }
    // if (name){
    //   try {
    //     tagListModel.create(name)//当用户输入之后自动保存
    //   }catch (error){
    //     if (error.message === 'duplicated'){
    //       window.alert('标签名重复了')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  font-size: 16px;
  padding-left:16px ;
  .tag{
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right:16px;
    border-bottom: 1px solid #e6e5e8;
    svg{
      color: #333333;
      width: 20px;
      height: 20px;
    }
  }
}


.createTag-wrapper { //表示他的父元素
   text-align: center;
   padding: 44px;
 }
</style>