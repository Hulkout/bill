<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem  field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
@Component({
  components: {FormItem,Button}
})
export default class EditLabels extends Vue{
  created(){
    const id = this.$route.params.id //获取id
    tagListModel.fetch()
    const tags = tagListModel.data //获取全部tags
    //filter也返回数组 那他和map区别在哪 ,由于返回一个数组那我直接得到它[0]就是它
    const tag = tags.filter(t => t.id === id)[0]
    if (tag){
      console.log(tag)
    }else{
      //如果tag没有那就重新定向到404
      //this.$router.push('/404') push不好用 因为每次返回他都发现不存在就又跳到404卡住了
      this.$router.replace('/404')
    }
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