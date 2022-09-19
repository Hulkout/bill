<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名" placeholder="请输入标签名" :value="currentTag.name" @update:value="updateTag"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {FormItem,Button},
})
export default class EditLabels extends Vue{
  // eslint-disable-next-line no-undef
  //tag?: Tag  = undefined //tag初始值和类型写上 当created之后才能拿到tag
  get currentTag(){
    return  this.$store.state.currentTag
  }
  created(){
    this.$store.commit('fetchTags')
    const id = this.$route.params.id //获取id
    this.$store.commit('setCurrentTag',id)
    if (!this.currentTag){
      //如果tag没有那就重新定向到404
      //this.$router.push('/404') push不好用 因为每次返回他都发现不存在就又跳到404卡住了
      this.$router.replace('/404')
    }
  }
  updateTag(name:string){
    if (this.currentTag)
    this.$store.commit('updateTag',{id:this.currentTag.id,name:name})
  }
  remove(){
    if (this.currentTag){
      this.$store.commit('removeTag',this.currentTag.id)
      this.$router.back()
    }

  }
  goBack(){
    this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.navBar{
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center; //垂直居中
  .leftIcon{
    width: 24px;
    height: 24px;
  }
  .rightIcon{ //虽然我没有 这个 但是我为了完成左中右布局我给他假的
    width: 24px;
    height: 24px;
  }
}
.form-wrapper{
  margin-top: 8px;
  background: white;
}
.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

</style>