<template>
  <div id="app">
    <MainMap/>
    <SideBar class="side-bar" />
  </div>
</template>

<script setup>
import MainMap from '@/components/MainMap'
import SideBar from '@/components/SideBar'
import {ref, provide} from "vue";

const globalMessage = ref('');
provide('globalMessage', globalMessage);
</script>

<style>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
}
#app {
  font-family: 'Pretendard-Regular';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .side-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }
}
</style>