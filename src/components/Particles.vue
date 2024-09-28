<script setup>
import { onMounted, ref } from "vue";
import confetti from "canvas-confetti";

onMounted(() => {
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function runConfetti() {
    confetti({
      ...defaults,
      particleCount: 50,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount: 50,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });

    setTimeout(runConfetti, 250); // 再次調用自己以持續效果
  }

  runConfetti(); // 初始化調用
});
</script>
