<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里

})
export default class App extends Vue{}
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
