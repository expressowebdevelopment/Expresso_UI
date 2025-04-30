<template>
<v-breadcrumbs :items="breadItem" color="#666e7d" class="font-weight-bold f-14 pb-3 pa-0">
    <template v-slot:divider>
        <v-icon icon="mdi-chevron-right" color="#666e7d"></v-icon>
    </template>
</v-breadcrumbs>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, watch, onMounted } from 'vue';

const items = ref([])
const props = defineProps({
    breadItem: Array,
});

watch(() => props.breadItem, (item) => (items.value = item), { immediate: true, deep: true });

const call = () => {
    items.value = props.breadItem;
};

// Initialize inputs and validation when mounted
onMounted(() => {
    items.value = props.breadItem;    
});

defineExpose({
    call
})
</script>
