<template>
  <div class="scanner">
    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

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
</template>

<script setup>
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useStore } from "vuex";

const store = useStore();
const paused = ref(false);
const result = ref("");
const showScanConfirmation = ref(false);

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

const checkPuzzleComplete = () => {
  if (Object.values(store.state.ImageList).every((value) => value === true)) {
    alert("已收集全部拼圖!!!");
  }
};

const onDetect = async (detectedCodes) => {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue));

  let id = detectedCodes[0].rawValue;

  if (store.state.ImageList[id] === true) {
    alert("已經收集過囉~");
  } else {
    store.commit("setImageList", { ShowImageList: true, id: id });
  }

  checkPuzzleComplete();

  paused.value = true;
  await timeout(500);
  paused.value = false;
};
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);

  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.scanner {
  width: 500px;
  height: 500px;
}
</style>
