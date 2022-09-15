<template>
  <Layout>
    <ol class="tags">
<!--      包一个span经验之谈-->
      <li v-for="tag in tags" :key = 'tag'><span>{{tag}}</span><Icon name="right"/></li>
    </ol>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Vue,Component}from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
tagListModel.fetch() //先fetch就可以直接用data了

@Component
export default class Labels extends Vue{
  tags = tagListModel.data
  createTag(){
    const name = window.prompt('请输入标签名')
    // if (name){
    //   try {
    //     tagListModel.create(name)//当用户输入之后自动保存
    //   }catch (error){
    //     if (error.message === 'duplicated'){
    //       window.alert('标签名重复了')
    //     }
    //   }
    // }
    if (name){
      const message = tagListModel.create(name)
      if (message === 'duplicated'){
        window.alert('标签名重复了')
      }else if (message==='success'){
        window.alert('创建成功')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  font-size: 16px;
  padding-left:16px ;
  li{
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

.createTag{
  background: #767676;
  color: white;
  border: none;
  border-radius:4px;
  height: 35px;
  padding: 0 16px;
  &-wrapper{ //表示他的父元素
    text-align: center;
    padding: 44px;
  }
}
</style>