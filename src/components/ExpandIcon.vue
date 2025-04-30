<template>
    <v-avatar :color="avatarColor" size="x-small">
      <v-icon :color="iconColor" :icon="iconName" size="default"></v-icon>
    </v-avatar>
  </template>
  
  <script setup>
  import { defineProps, computed } from 'vue';
  const props = defineProps({
    expanded: {
      type: Boolean,
      required: true
    }
  });
  const avatarColor = computed(() => props.expanded ? 'rgb(var(--v-theme-primary))' : 'rgb(var(--v-theme-primary-light))');
  const iconColor = computed(() => props.expanded ? 'white' : 'rgb(var(--v-theme-primary))');
  const iconName = computed(() => props.expanded ? 'mdi-minus' : 'mdi-plus');
  </script>
  
  