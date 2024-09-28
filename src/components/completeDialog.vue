<template>
  <el-dialog
    v-model="props.showCompleteDialog"
    title="恭喜！您已搜集完成全部的秘寶！"
    width="100%"
    :close-on-click-modal="false"
    :show-close="false"
    center
    align-center
  >
    <p>請以此畫面至 OCF 櫃檯領取小獎品～</p>
    <p>限量 200 份，兌完為止！</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="emit('closeCompleteModal')">
          確認
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  showCompleteDialog: Boolean,
});

const emit = defineEmits();
</script>
