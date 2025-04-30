<template>
<div id="pagination" class="d-flex align-center justify-end font-weight-bold">
    <div class="d-flex align-center">
        <p class="pr-2 f-14">Items Per Page:</p>
        <v-select v-model="countPerPage" hide-details :items="paginationFilterList" @update:modelValue="updateCountPerPage" variant="outlined" density="compact" max-width="100"></v-select>
    </div>
    <div class="d-flex align-center pl-3 f-14">
        <p class="pr-2"><span>{{(currentPage * countPerPage) - countPerPage + 1}} - {{(currentPage * countPerPage) - countPerPage + dataLenght}}</span> of <span>{{totalDataCount}}</span></p>
        <v-btn icon="mdi-page-first" density="compact" color="#4f398d" variant="text" :disabled="currentPage == 1" @click="paginationBtn(1)"></v-btn>
        <v-btn icon="mdi-chevron-left" density="compact" color="#4f398d" variant="text" :disabled="currentPage == 1" @click="paginationBtn(currentPage - 1)"></v-btn>
        <v-btn icon="mdi-chevron-right" density="compact" color="#4f398d" variant="text" :disabled="currentPage == lastPage" @click="paginationBtn(currentPage + 1)"></v-btn>
        <v-btn icon="mdi-page-last" density="compact" color="#4f398d" variant="text" :disabled="currentPage == lastPage" @click="paginationBtn(lastPage)"></v-btn>
    </div>
</div>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, watch, onMounted } from 'vue';
import { $global } from '@/main';
let countPerPage = ref();
let paginationFilterList = $global.$commonstore.paginationFilterList;
const totalDataCount = ref("");
const dataLenght = ref("");

const emit = defineEmits(["pageClickHandler"]);

const props = defineProps({
    totalCount: Number,
    tdDataLength: Number
});

watch(
    () => [props.totalCount, props.tdDataLength], 
    ([newTotalCount, newTdDataLength]) => {
        totalDataCount.value = newTotalCount;
        dataLenght.value = newTdDataLength;
    }, {
        immediate: true
    }
);

let currentPage = ref(1);
let lastPage = ref(1);

const paginationBtn = (type=1) => {
    currentPage.value = type;
    $global.$commonstore.paginationPageDetails.paginationOffset = ($global.$commonstore.paginationPageDetails.paginationLimit * type) - $global.$commonstore.paginationPageDetails.paginationLimit;
    emit('pageClickHandler', currentPage.value);
    window.scrollTo({
        top: 0
    });
}

const updateCountPerPage = () =>{
    $global.$commonstore.paginationPageDetails.paginationLimit = countPerPage.value;
    lastPage.value = Math.ceil(totalDataCount.value / $global.$commonstore.paginationPageDetails.paginationLimit);
    paginationBtn();
}

onMounted(() => {
    // if($global.$commonstore.isPageRefresh){
       currentPage.value = ($global.$commonstore.paginationPageDetails.paginationOffset / $global.$commonstore.paginationPageDetails.paginationLimit) + 1
    // }
    countPerPage.value = $global.$commonstore.paginationPageDetails.paginationLimit ? $global.$commonstore.paginationPageDetails.paginationLimit : $global.$commonstore.paginationPerItem;
    totalDataCount.value = $global.$commonstore.paginationPageDetails.paginationRecordCount || props.totalCount;
    lastPage.value = Math.ceil(totalDataCount.value / $global.$commonstore.paginationPageDetails.paginationLimit);
    dataLenght.value = props.tdDataLength;
});
</script>