<template>
<div class="mt-5 mx-auto">
    <div class="tabBlock-content">
        <v-card class="mx-3 my-2 rounded-lg" variant="outlined" color="rgb(var(--v-theme-border-primary-light))" elevation="2">
            <v-card-item class="align-center py-2 border-b-md bg-white">
                <v-card-title class="d-flex align-center text-tertiary font-weight-bold text-subtitle-1">
                    <v-avatar color="rgb(var(--v-theme-primary-light))" size="small" class="mr-2">
                        <v-icon icon="mdi-table" size="small" color="rgb(var(--v-theme-tertiary))"></v-icon>
                    </v-avatar>
                    <span class="fs">{{headingText}}</span>
                    <v-spacer v-if="isBackBtn"></v-spacer>
                    <v-icon icon="mdi-arrow-left-circle " v-if="isBackBtn" size="small" color="rgb(var(--v-theme-tertiary))" @click="backToPage()"></v-icon>
                </v-card-title>
            </v-card-item>
            <v-divider class="border-opacity-100" color="#d3d4e7"></v-divider>
            <v-card-text class="py-0 pr-0 d-flex border-b-sm" v-for="(tddata, index) in cardListInfo" :key="index" :class="index%2 === 0 ? '' : 'bg-white'">
                <v-row align="start" no-gutters style="width:95%;">
                    <v-col :xl="item.xl ||'3'" :lg="item.lg ||'3'" :md="item.md || '6'" :sm="item.sm || '6'" :cols="item.cols||'12'" class="align-self-center" v-for="(item, labelIndex) in tddata.dataRow[0]" :key="labelIndex">
                        <div class="d-flex align-center">
                            <v-avatar v-if="item.icon" :color="index%2 === 0 ? '#ffffff' : 'rgb(var(--v-theme-primary-light))'" size="x-small">
                                <v-icon :icon="item.icon || '' " size="small" color="rgb(var(--v-theme-tertiary))"></v-icon>
                            </v-avatar>
                            <div>
                                <h4 class="pt-2 pb-1 px-3 text-tertiary font-weight-bold">{{ item.label }}</h4>
                                <template v-if="item.iconImage">
                                     <v-icon class="text-justify pt-1 pb-2 px-7 mx-auto my-1" :icon="item.valueicon" color="rgb(var(--v-theme-tertiary))" @click="viewEditPage(item.value)" :title="item.title"></v-icon>  
                                </template>
                                <template v-else>
                                <h4 class="pt-1 pb-2 px-3 text-grey-darken-3 font-weight-regular text-justify">{{ item.value }}</h4>
                                </template>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row align="center" no-gutters width="5%" class="pb-2 bg-primary-light" v-if='(typeof(tddata.eventRow) != "undefined")'>
                    <v-col class="d-flex justify-center align-center" v-for="(item, idIndex) in tddata.eventRow[0]" :key="idIndex">
                        <v-icon icon="mdi-file-eye" color="rgb(var(--v-theme-tertiary))"  @click="viewPage(item)" :title="item.title"></v-icon>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text v-if="noRecord" class="text-body-2 text-center text-primary bg-white">
                No Record Found
            </v-card-text>
        </v-card>
    </div>
</div>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import {ref, watch, onMounted} from 'vue';

const cardListInfo = ref([]);
const noRecord = ref(false)
const emit = defineEmits(['back','viewToParent','viewToParentnext']);


const props = defineProps({
    headingText: String,
    cardListDetails: Array,
    isBackBtn:Boolean
    // showDates:Boolean
})

watch(() => props.cardListDetails, (newVal) => {
    cardListInfo.value = newVal;
    noRecord.value = cardListInfo.value?.length < 1;
});

function viewEditPage(data){
    emit('viewToParentnext', data)
}
function backToPage() {
    emit('back')
}
function viewPage(data){
    emit('viewToParent', data)
}
onMounted(async () => {
    cardListInfo.value = props.cardListDetails;
    noRecord.value = cardListInfo.value?.length < 1;
});

</script>

<style lang="scss" scoped>
.tabBlock-content {
    border-radius: 10px 10px 0 0 !important;
}

.v-list-item__prepend>.v-badge .v-icon,
.v-list-item__prepend>.v-icon,
.v-list-item__append>.v-badge .v-icon,
.v-list-item__append>.v-icon {
    opacity: 1 !important;
}
</style>
