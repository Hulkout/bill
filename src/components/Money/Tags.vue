<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id" @click="toggle(tag)" :class="{selected:selectedTags.indexOf(tag)>=0}">{{ tag.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">

import { mixins } from 'vue-class-component';
import {Component} from 'vue-property-decorator';
import {TagHelper} from '@/mixins/TagHelper';

@Component
export default class Tags extends mixins(TagHelper){
  get  tagList(){
    return this.$store.state.tagList
  }
  //tags = store.tagList
  // @Prop({required:true}) readonly dataSource!:string[]//默认所有tags 字符串数组  前面Array是JS写法可以不写 后买你string[]是TS写法,因为是外部数据你不要给它赋值
  created(){ //提前初始化 不然拿不到数据
    this.$store.commit('fetchTags')
  }
  selectedTags:string[]=[]  //被选中的标签 通过这个改变li的class
  toggle(tag:string){ //toggle开关
    const index = this.selectedTags.indexOf(tag)
    if (index>=0){ //如果已经被选中，那么 从这个索引开始删除一个，就是取消自身的选中
      this.selectedTags.splice(index,1)
    }else { //不在我才push 但是我只想让一个标签被选中，所以加一个判断，初始时候没有被选中你可以被选中，但是如果有被选中的，我就清空然后再push新选中的
      if (this.selectedTags.length>0){
        this.selectedTags =[]
        this.selectedTags.push(tag)
      }else {
        this.selectedTags.push(tag)
      }
    }
    this.$emit('update:value',this.selectedTags)
  }
  create(){
    const name = window.prompt('请输入标签名')
    if (name){
      this.$store.commit('createTag',name)
    }else {
      window.alert('标签名不能为空')
    }
    // if (name === ''){
    //   alert('标签名不能为空')
    // }else { //我要把他放到数据源啊
      // if (this.dataSource){
      //   this.dataSource.push(name!)//可以 但是理论上我们不能修改外部数据，所以我们要自觉地址这种行为 ,readyonly只能阻止你把他改为其他数组不能阻止你push
      // } 我们触发一个更新事件,值是之前的数组 ...展开运算符 展开了再给他加一个name
      //如果你填了name  我就把你要更新datasource的请求告诉给外部，外部可以接收这个事件 <Tags :data-source.sync="tags"  />我们给他加上.sync
      //如果你触发了update:dataSource 这个事件 他就会把你传的这个数组 赋值给money上的data-source
      // if (this.dataSource)
      // this.$emit('update:dataSource',[...this.dataSource,name])


  }

}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;//我们设置的默认字体大小是16,局部覆盖
  padding: 16px;
  >.current{
    display: flex;
    flex-wrap: wrap;//换行
    // 没办法实现标签部分加滚动条 overflow: auto;//给标签加滚动条
    >li{
      $bg:#d9d9d9;
      background:$bg;
      border-radius:12px ; //圆角要是高度的50% 直接border-radius:50%默认宽度
      height: 24px;//所以我给定高度，设置为一半即可
      line-height: 24px;//高度等于行高 单行垂直居中用
      padding: 0 16px;//宽度直接靠内边距，上下0左右
      margin-right: 12px;
      margin-top: 4px;
      &.selected{
        color: white;
        background: darken($bg,50%);
      }
    }
  }
  >.new{
    padding-top: 16px;//和上面距离，margin和padding都可以
    button{
      border: none;
      background: transparent;
      color: #999;
      border-bottom: 1px solid ;//默认和字体颜色一样
      padding: 0 5px; //下边框要比字宽，所以加内边距
    }
  }
}
</style>