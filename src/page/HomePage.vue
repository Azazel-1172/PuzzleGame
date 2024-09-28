<template>
  <Headers />
  <Puzzle v-if="switcherPuzzle" />
  <Scanner v-if="switcherScanner" @switchToPuzzle="switchToPuzzle" />
  <bottom_Footer :ClickerHandleObj="ClickerHandleObj" />
</template>

<script setup>
import Puzzle from "../components/Puzzle.vue";
import Scanner from "../components/Scanner.vue";
import Headers from "../components/Header.vue";
import bottom_Footer from "../components/Footer.vue";
import { useStore } from "vuex";

import { onMounted, ref } from "vue";

const store = useStore();
const switcherPuzzle = ref(true);
const switcherScanner = ref(false);

const ClickerHandleObj = {
  switcherPuzzle: () => {
    switcherPuzzle.value = true;
    switcherScanner.value = false;
    document.getElementById("puzzle_btn").classList.add("select");
    document.getElementById("scaner_btn").classList.remove("select");
  },
  switcherScanner: () => {
    switcherPuzzle.value = false;
    switcherScanner.value = true;
    document.getElementById("puzzle_btn").classList.remove("select");
    document.getElementById("scaner_btn").classList.add("select");
  },
};

const switchToPuzzle = () => {
  switcherPuzzle.value = true;
  switcherScanner.value = false;
};

onMounted(() => {
  const storageData = JSON.parse(localStorage.getItem("data"));

  if (storageData) {
    for (let key in storageData) {
      if (storageData.hasOwnProperty(key)) {
        store.commit("setImageList", {
          ShowImageList: true,
          id: key,
        });
      }
    }
  } else {
    console.log("No data found in localStorage.");
  }
});
</script>
