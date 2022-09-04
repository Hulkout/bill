<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
//加上下面两句就不需要一个一个引入了
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
export default {
  name: 'icon',
  props:['name']
};
</script>

<style lang="scss" scoped>
.icon{
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>