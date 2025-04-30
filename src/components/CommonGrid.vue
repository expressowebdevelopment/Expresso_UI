<template>
<div id="simpleTable" class="tabBlock-content">
    <v-card class="mx-3 my-2 rounded-lg" variant="outlined" color="rgb(var(--v-theme-border-primary-light))">
        <v-card-item v-if="headingText" class="py-2 border-b-md bg-white">
            <v-card-title class="d-flex align-center">
                <v-avatar color="rgb(var(--v-theme-primary-light))" size="small" class="mr-2">
                    <v-icon icon="mdi-table" size="small" color="rgb(var(--v-theme-tertiary))"></v-icon>
                </v-avatar>
                <p class="text-tertiary font-weight-bold text-subtitle-1">{{gridTitle}}</p>
            </v-card-title>
        </v-card-item>
        <v-card-text class="pa-0 bg-white border-b-md ">
            <slot name="gridTable"></slot>
        </v-card-text>
    </v-card>
</div>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, onMounted } from 'vue';
const props = defineProps({
    headingText: String
})

const gridTitle = ref('');

watch(() => props.headingText, (newValue) => {
    gridTitle.value = newValue;
}, {
    deep: true,
    immediate: true
});

onMounted(() => {
    gridTitle.value = props.headingText;
});
</script>