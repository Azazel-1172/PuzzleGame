<template>
  <div v-if="slices.length" class="image-grid">
    <div v-for="slice in ImageList" :key="slice?.id" class="image-slice">
      <img :src="slice?.src" :alt="'Image slice ' + slice?.id" />
    </div>
  </div>
  <button @click="getAllPuzzles">Click</button>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { fabric } from "fabric";
import img from "../assets/img/temp.jpg"; // 確保這個路徑是正確的
import locked from "../assets/img/locked.jpg"; // 確保這個路徑是正確的
import { useStore } from "vuex";

const store = useStore();

const slices = ref([]);
const imageUrl = img; // 使用導入的圖片變量

const splitImage = (src) => {
  slices.value = []; // 清除之前的切片
  fabric.Image.fromURL(src, (img) => {
    const width = img.width / 3;
    const height = img.height / 3;
    let id = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const canvas = new fabric.Canvas(null, {
          width: width,
          height: height,
        });
        const slice = new fabric.Image(img.getElement(), {
          left: -col * width,
          top: -row * height,
        });
        canvas.add(slice);
        canvas.renderAll(); // 確保圖像渲染完成
        const dataURL = canvas.toDataURL({ format: "png" });
        slices.value.push({ id: id++, src: dataURL });
      }
    }

    ImageList.value.map((item, index) => {
      if (store.state.ImageList[index]) {
        ImageList.value[index] = slices.value[index];
      } else {
        ImageList.value[index] = item;
      }
    });
  });
};

const downLoadPic = ref(false);

const getAllPuzzles = () => {
  const link = document.createElement("a");
  link.href = img;
  link.download = "IMG.jpg";
  link.click();
};

const ImageList = ref([
  { id: 0, src: locked },
  { id: 1, src: locked },
  { id: 2, src: locked },
  { id: 3, src: locked },
  { id: 4, src: locked },
  { id: 5, src: locked },
  { id: 6, src: locked },
  { id: 7, src: locked },
  { id: 8, src: locked },
]);

onMounted(() => {
  splitImage(imageUrl); // 在組件掛載時調用splitImage方法
});
</script>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 40vw;
}
.image-slice {
  text-align: center;
}
.image-slice img {
  width: 100%;
  height: 100%;
}
</style>
