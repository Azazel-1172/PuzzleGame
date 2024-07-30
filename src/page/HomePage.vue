<template>
  <Puzzle v-if="switcherPuzzle" />
  <Scanner v-if="switcherScanner" />
  <bottom_Footer :ClickerHandleObj="ClickerHandleObj" />
</template>

<script setup>
import Puzzle from "../components/Puzzle.vue";
import Scanner from "../components/Scanner.vue";
import bottom_Footer from "../components/Footer.vue";

import { ref } from "vue";

const switcherPuzzle = ref(false);
const switcherScanner = ref(true);

const ClickerHandleObj = {
  switcherPuzzle: () => {
    switcherPuzzle.value = true;
    switcherScanner.value = false;
  },
  switcherScanner: () => {
    switcherPuzzle.value = false;
    switcherScanner.value = true;
  },
};
</script>
