<template>
  <div class="footer-btnGroup">
    <button class="footer-btn" @click="ClickerHandleObj.switcherScanner">
      遊戲
    </button>
    <button class="footer-btn" @click="ClickerHandleObj.switcherPuzzle">
      進度
    </button>
  </div>
</template>

<script setup>
const { ClickerHandleObj } = defineProps({
  ClickerHandleObj: {
    type: Object,
  },
});
// console.log(ClickerHandleObj);
</script>

<style>
.footer-btnGroup {
  position: absolute;
  bottom: 0;
  width: 100vw;
}

.footer-btn {
  width: 50%;
  height: 5rem;
}
</style>
