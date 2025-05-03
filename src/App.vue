<template>
<v-app>
    <!-- <HeaderView homePageHeader="homePageHeader" /> -->
    <v-main>
        <router-view />
    </v-main>
    <!-- <HomePageFooter /> -->
    <Dialog ref="dialog" />
    <PageLoader ref="pageLoader" />
</v-app>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n(); 
import { ref, onMounted, defineAsyncComponent, getCurrentInstance, nextTick } from 'vue';
import { $global } from '@/main';
import { useCommonStore } from '@/store';
const { proxy } = getCurrentInstance();
const service = proxy.service;
const HeaderView = defineAsyncComponent(() =>  import('@/views/layouts/HeaderView.vue'));
const HomePageFooter = defineAsyncComponent(() =>  import('@/views/layouts/HomePageFooter.vue'));
import PageLoader from "@/components/PageLoader";
import Dialog from '@/components/Dialog.vue';
import services from '@/services/service';

const assignCommonStore = () => {
    $global.$commonstore = useCommonStore();
}

const pageLoader = ref("");
const dialog = ref(null);

onMounted(async () => {
    assignCommonStore();
    $global.$commonstore.currentTheme = 'yellowTheme';
});


</script>

<style lang="scss">
@import "./assets/sass";
</style>
