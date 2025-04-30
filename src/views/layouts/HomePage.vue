<template>
<v-hover v-slot="{ isHovering, props }">
    <v-carousel v-if="carouselItems.length" id="homePageCarousel" v-bind="props" continuous :interval="isHovering ? 10000000 : 5000" show-arrows="hover" height="auto" cycle hide-delimiter-background delimiter-icon="mdi-minus-thick">
        <v-carousel-item v-for="(item, i) in carouselItems" :key="i" :src="item" alt="img">
        </v-carousel-item>
    </v-carousel>
    <!-- :src="'data:image/png;charset=utf-8;base64, '+item" -->
</v-hover>

</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, onMounted, getCurrentInstance, computed } from 'vue';
const { proxy } = getCurrentInstance();
const service = proxy.service;
import { $global } from '@/main';
import services from '@/services/service';
const carouselItems = ref([]);


const windowLocation = window.location;

const originSplit = 'https://expresso.in'.split(".");

const path = windowLocation.pathname == '/' ? window.location.origin : window.location.origin + window.location.pathname

function setColorCode(indexVal) {
  return featureBoxColors.value[indexVal];
}


onMounted(async () => {
    
});


</script>
