<template>
  <div>
    <button class="button" @click="$emit('click',$event)"><slot></slot></button>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component
export default class Button extends Vue{

}
</script>

<style lang="scss" scoped>
.button{
  background: #767676;
  color: white;
  border: none;
  border-radius:4px;
  height: 35px;
  padding: 0 16px;
}
</style>