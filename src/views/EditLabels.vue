<template>
  <Layout>
    <div><span>编辑标签</span> <Icon name="left"/></div>
    <Notes field-name="标签名" placeholder="请输入标签名"/>
  </Layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import Notes from '@/components/Money/Notes.vue';
@Component({
  components: {Notes}
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
div{
  svg{
    color: red;

  }
}

</style>