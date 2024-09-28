<template>
  <div class="scanner">
    <qrcode-stream
      :paused="paused"
      @detect="onDetect"
      @camera-on="onCameraOn"
      @camera-off="onCameraOff"
      @error="onError"
    >
      <div v-show="showScanConfirmation" class="scan-confirmation"></div>
    </qrcode-stream>
  </div>
  <Modal
    :centerDialogVisible="centerDialogVisible"
    :questionId="questionId"
    @updateVisible="updateVisible"
    @fireWorkHandler="fireWorkHandler"
    @toPuzzleFn="toPuzzleFn"
    @close="onModalClose"
  />
  <Particles v-if="showFirework" />
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useStore } from "vuex";
import Modal from "./Modal.vue";
import Particles from "./Particles.vue";
import { nextTick } from "vue";

const store = useStore();
const paused = ref(false);

const showScanConfirmation = ref(false);
const centerDialogVisible = ref(false);

const showFirework = ref(false);
const questionId = ref("");

const emit = defineEmits();

const onCameraOn = () => {
  showScanConfirmation.value = false;
};

const onCameraOff = () => {
  showScanConfirmation.value = true;
};

const onError = (error) => {
  console.error(error);
};

const timeout = (ms) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const toPuzzleFn = () => {
  emit("switchToPuzzle");
};

// 控制煙火
const fireWorkHandler = async () => {
  showFirework.value = true;
  await nextTick(); // 等待 DOM 更新
  emit("switchToPuzzle");
};

// 控制彈窗Fn
const updateVisible = () => {
  centerDialogVisible.value = !centerDialogVisible.value;
};

// 彈窗關閉執行Fn
const onModalClose = () => {
  centerDialogVisible.value = false;
  paused.value = false; // 在彈窗關閉後重新啟動掃描
};

const mappingData = {
  "5feceb66ffc86f38d952786c6d696c79c2dd1b9422c849b946f3e82e7e6b1d59": 0,
  "6b86b273ff34fce19d6b804eff5a3f5748fda2d68f10f49488e5d1dd3bde7975": 1,
  d4735e3a265e16e203f59718b6a03d179fcs0e99aa88e97034e4d997b52a3b: 2,
  "4e07408562bedb8b60ce05c1decfe3ad16b72230965d2c7d76c35e2a26d48697": 3,
  "4b227777d4dd1fc61c6f884f48641d02b4d121ab56a88d0f926d9bb0f0f6a2f6": 4,
  "8f2d127de37b9429b024d3d3f64b8f53dc2b12f21131a59a36453dbef6c8f8fd": 5,
  e473b7fbbce2345d7772b0674a318d5a4d71b9e237d17b8a2f5feb36457e66c: 6,
  ec8956637a99787bd15eacd77acce5e3d74c1d6a4f3cd6f5e8d52385b2e60: 7,
  "3c59dc048e8850243be8079a5c74d07924b010c8068b3c74e6f5451a95c4b5df": 8,
};

const getMappedNumber = (inputString) => {
  return mappingData[inputString];
};

// 掃描執行Fn
const onDetect = async (detectedCodes) => {
  let id = getMappedNumber(detectedCodes[0].rawValue);

  if (store.state.ImageList[id] === true) {
    alert("已經收集過囉~");
  } else {
    questionId.value = id;
    centerDialogVisible.value = true;
    paused.value = true;
  }
};
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 80vw;
  height: 80vw;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.scanner {
  border: 4px solid;
  border-image: linear-gradient(to bottom, #006aff, #833ab4) 1; /* 使用線性漸變作為邊框圖像 */
  border-radius: 10px;
  width: 80vw;
  height: 80vw;
  position: relative;
  box-sizing: border-box;
  margin: 2rem auto;
}
</style>
