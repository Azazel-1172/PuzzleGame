<template>
  <div>
    <input type="file" @change="onFileChange" />
    <div v-if="slices.length" class="image-grid">
      <div v-for="slice in slices" :key="slice.id" class="image-slice">
        <img :src="slice.src" :alt="'Image slice ' + slice.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fabric } from "fabric";
import img from "../assets/img/Img.jpg";

export default {
  setup() {
    const slices = ref([]);

    const onFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          splitImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const splitImage = (src) => {
      slices.value = []; // Clear previous slices
      fabric.Image.fromURL(src, (img) => {
        const width = img.width / 3;
        const height = img.height / 3;
        let id = 1;
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
            canvas.renderAll(); // Ensure the image is rendered before getting data URL
            const dataURL = canvas.toDataURL({ format: "png" });
            slices.value.push({ id: id++, src: dataURL });
          }
        }
      });
    };

    return {
      slices,
      onFileChange,
    };
  },
};
</script>

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 0; /* 確保列之間沒有間隔 */
}
.image-slice {
  text-align: center;
}
.image-slice img {
  width: 100%;
  height: 100%;
}
</style>
