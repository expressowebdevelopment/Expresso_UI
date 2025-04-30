<template>
<v-overlay :model-value="overlay" class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, nextTick } from 'vue';

let overlay = ref(false);

const open = () => {
  overlay.value = true;
}

const close = async () => {
  await nextTick();
  overlay.value = false;
}

defineExpose({
  open,
  close
})
</script>
