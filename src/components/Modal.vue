<template>
  <el-dialog
    v-model="props.centerDialogVisible"
    :title="'問題'"
    :close-on-click-modal="false"
    :show-close="false"
    width="100%"
    center
    align-center
  >
    <p>{{ currentQuestion.question }}</p>
    <div class="dialog-content">
      <el-radio-group v-model="radio1">
        <el-radio
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :value="String(index + 1)"
          size="large"
          style="white-space: normal"
        >
          {{ option }}
        </el-radio>
      </el-radio-group>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm" size="large">
          確認
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { toast } from "vue3-toastify";
import _ from "lodash";
import { useStore } from "vuex";

import "vue3-toastify/dist/index.css";

const props = defineProps({
  centerDialogVisible: Boolean,
  questionId: String,
});

const emit = defineEmits();
const store = useStore();

const radio1 = ref(null);

watch(
  () => props.centerDialogVisible,
  (newVal) => {
    if (newVal) {
      // 對話框打開時，重置選項
      radio1.value = null;
    }
  }
);

const checkPuzzleComplete = async () => {
  let localData = JSON.parse(localStorage.getItem("data"));

  const checkLocalData = (obj) => {
    for (let i = 0; i <= 8; i++) {
      if (!obj[i]) {
        return false;
      }
    }
    return true;
  };

  if (
    Object.values(store.state.ImageList).every(
      (value) => value === true || checkLocalData(localData)
    )
  ) {
    await emit("fireWorkHandler");
  }
};

const isCorrect = computed(() => {
  return radio1.value === currentQuestion.value.correctAnswer;
});

const notifyThrottled = _.throttle(
  () => {
    toast("回答有誤!", {
      theme: "dark",
      type: "error",
      position: "bottom-right",
      autoClose: 5000,
    });
  },
  800,
  { trailing: false }
);

const questionsData = {
  0: {
    question:
      "更注重於社群交流和多元、並非只談論特定技術主題或語言的議題，每年吸引上千人參與的研討會是？",
    options: ["WORLDCUP", "Coffee Cup", "COSCUP", "COSPLAY"],
    correctAnswer: "3",
    correctMsg: "恭喜你獲得：小啄火鳳凰!",
  },
  1: {
    question:
      "哪哪一個作業系統的核心出現，採 GPL 授權讓大眾自由利用，開啟了開源作業系統的新時代？",
    options: ["奔騰 4 核心", "我的核心肌", "Linux", "Linus Torvalds"],
    correctAnswer: "3",
    correctMsg: "恭喜你獲得：Cyber Punk TUX 面具!",
  },
  8: {
    question:
      "以維護 Firefox 瀏覽器正體中文化為主要工作、同時也關心網路發展的社群是？",
    options: ["MozTW", "Moz Burger", "Momo Paradise", "Mozilla Foundation"],
    correctAnswer: "1",
    correctMsg: "恭喜你獲得：火狐神獸!",
  },
  3: {
    question: "「Given enough eyeballs, all bugs are shallow」是出自哪一本書？",
    options: ["公寓與大樓", "湯姆貓與傑利鼠", "教堂與市集", "市集與教堂"],
    correctAnswer: "3",
    correctMsg: "恭喜你獲得：雷曼多眼怪!",
  },
  4: {
    question: "開源祭主要是慶祝哪一個組織的十週年活動？",
    options: [
      "開放軟體有限公司",
      "開放文化基金會",
      "開源軟體基金會",
      "開放基金會",
    ],
    correctAnswer: "2",
    correctMsg: "恭喜你獲得：虛擬開源祭 Ｔ!",
  },
  5: {
    question: "自由軟體 Free Software 的 Free 是指？",
    options: ["免費", "自由", "富裕", "逃走"],
    correctAnswer: "2",
    correctMsg: "恭喜你獲得：言論自由啤酒杯!",
  },
  6: {
    question: "以公民科技、開放資料為主題，固定舉辦黑客松的社群是？",
    options: ["沒有人", "GOV", "g0v", "大黑客松小倆口"],
    correctAnswer: "3",
    correctMsg: "恭喜你獲得：g0v 沒有人拖鞋!",
  },
  7: {
    question: "學生自辦、傳達開源精神的研討會是？",
    options: ["MOPCON", "SITCON", "CONCOM", "COSCUP"],
    correctAnswer: "2",
    correctMsg: "恭喜你獲得：小石敢當!",
  },
  2: {
    question: "以討論 Python 程式語言為主的研討會是？",
    options: ["PythonTW", "PyTW", "拍繩.TW", "PyCon Taiwan"],
    correctAnswer: "4",
    correctMsg: "恭喜你獲得：PyConTW 雙蛇!",
  },
};

// 取得當前問題資料
const currentQuestion = computed(() => {
  return questionsData[`${props.questionId}`] || {};
});

const handleConfirm = () => {
  // 從 localStorage 取得已存在的 storageData
  let storageData = JSON.parse(localStorage.getItem("data")) || {};

  if (isCorrect.value) {
    emit("updateVisible");
    store.commit("setImageList", {
      ShowImageList: true,
      id: props.questionId,
    });

    // 正確的方式來動態設定屬性
    storageData[props.questionId] = true;

    // 將更新後的 storageData 儲存回 localStorage
    localStorage.setItem("data", JSON.stringify(storageData));

    emit("toPuzzleFn");

    toast(questionsData[props.questionId].correctMsg, {
      theme: "dark",
      type: "success",
      position: "bottom-center",
      transition: "flip",
      autoClose: 5000,
    });

    document.getElementById("puzzle_btn").classList.add("select");
    document.getElementById("scaner_btn").classList.remove("select");

    setTimeout(() => {
      document
        .getElementById(`slice_${props.questionId}`)
        .classList.add("flip");
    }, 1000); // 延遲1秒

    checkPuzzleComplete();
  } else {
    notifyThrottled();
  }
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}

p {
  color: black;
}

.dialog-content {
  word-wrap: break-word;
  max-height: 400px;
  overflow-y: auto;
}
</style>
