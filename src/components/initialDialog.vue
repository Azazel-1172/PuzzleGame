<template>
  <el-dialog
    v-model="showInitDialog"
    title="開源祭集點遊戲"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    center
    align-center
  >
    <p>失傳的9個秘寶，是開源人的最後希望，到展覽區去找出來吧！</p>
    <p>完成後破關畫面，請以「瀏覽器畫面」到服務台換取贈品，截圖無效。</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeModal"> 確認 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";

const showInitDialog = ref(false);

if (!sessionStorage.getItem("showInitDialog")) {
  showInitDialog.value = true;
  sessionStorage.setItem("showInitDialog", true);
} else {
  showInitDialog.value = false;
}

const closeModal = () => {
  showInitDialog.value = false;
  sessionStorage.setItem("showInitDialog", true);
};
</script>

<style>
p {
  text-align: center;
}
</style>
