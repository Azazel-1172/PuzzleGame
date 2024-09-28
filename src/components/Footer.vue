<template>
  <div class="footer-btnGroup">
    <button
      class="footer-btn scanner"
      id="scaner_btn"
      @click="ClickerHandleObj.switcherScanner"
    >
      <img :src="qrcodeIcon" alt="qrcode_Icon" />
    </button>
    <button
      class="footer-btn puzzle select"
      @click="ClickerHandleObj.switcherPuzzle"
      id="puzzle_btn"
    >
      <img :src="puzzle" alt="qrcode_Icon" />
    </button>
  </div>
</template>

<script setup>
import qrcodeIcon from "../assets/img/qrcode.png";
import puzzle from "../assets/img/puzzle.png";

const { ClickerHandleObj } = defineProps({
  ClickerHandleObj: {
    type: Object,
  },
});
</script>

<style>
.footer-btnGroup {
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
}

.footer-btn {
  width: 50%;
  height: 5rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 12vh;
  background-color: #f8f8f8; /* 按鈕背景色，可以依需求調整 */
  border: none;
}

.footer-btn.scanner {
  display: flex;
  flex-direction: column; /* 讓圖片和文字垂直排列 */
  align-items: center; /* 水平居中對齊 */
  justify-content: center; /* 垂直居中對齊 */
  padding: 10px; /* 按鈕的內邊距，可以依需求調整 */
  margin-right: 4px;
}

.footer-btn.scanner img {
  max-width: 100%; /* 確保圖片不會超出按鈕寬度 */
  height: auto; /* 保持圖片比例 */
}

.select {
  background: transparent;
}
</style>
