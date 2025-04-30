<template>
<v-container fluid> 
    <v-row id="dataGridTable" class="padNone" :class="gridTitle ? 'border':'mx-auto'">
        <v-label v-if="gridTitle" class="text-tertiary font-weight-bold ml-2 f-13 px-auto py-2 ">{{gridTitle}}</v-label>
        <v-data-table :headers="commonthData" :items="commontdData" item-key="id"  :hide-default-footer="true" density="compact" class="my-2 rounded-lg mx-3">
            <template v-slot:body="{ items }" v-if="rowSpanTDGrid">
                <template v-if="items.length === 0">
                    <tr>
                        <td :colspan="commonthData.length" class="text-center align-middle">
                            No Records
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <template v-for="(tdData) in items">
                        <tr v-for="(rowSpanData, index2) in tdData.rowspanList" :key="index2">
                            <template v-for="(val, index3) in Object.keys(tdData)">
                                <td v-if="val != 'rowspanList' && index2 === 0 && !ignoreColumn.includes(val)" :key="index3" class="text-left align-middle" :rowspan="tdData.rowspanList.length">
                                    {{ tdData[val] }}
                                </td>
                                <template v-else-if="val === 'rowspanList'" v-for="val in Object.keys(rowSpanData)" :key="rowSpanData[val]">
                                    <template v-if="val === 'documentName' && rowSpanData[val]">
                                        <td class="text-left">
                                            <a href="javascript:void(0)" rel="noopener noreferrer" @click="$emit('getDocument', rowSpanData)" :class="rowSpanData.disabledoc ? 'disabled-link' : ''">
                                                {{ rowSpanData[val] }}
                                            </a>
                                            <v-icon v-if="rowSpanData[val]!=null" class="mdi mdi-certificate-outline text-tertiary mx-2" @click="$emit('showDSCToParent', rowSpanData)" :class="rowSpanData.disabledoc ? 'disabled-link' : ''"></v-icon>
                                        </td>
                                    </template>
                                    <template v-else-if="!ignoreColumn.includes(val)">
                                        <td class="text-left" :class="rightAlign.includes(val) ? 'text-right':'text-left'">
                                            {{ rowSpanData[val] }}
                                        </td>
                                    </template>
                                </template>
                            </template>
                        </tr>
                    </template>
                </template>
            </template>

            <template v-slot:body="{ items }" v-else>
                <tr v-if="items.length === 0" class="text-center">
                    <td :colspan="commonthData.length" class="text-center align-middle">
                        No Records
                    </td>
                </tr>
                <tr v-for="(tdData, index) in items" :key="index">
                <template v-for="(header, i) in commonthData" :key="i" >
                    <td v-if=" header.value !== null" :class="rightAlign.includes(header.value)? 'text-right' : 'text-left'" :style="{ width: header.width || 'auto' }">
                        <span v-if="header.value === 'documentName'">
                            <span  v-if="Array.isArray(tdData[header.value])">
                                            <a href="javascript:void(0)" rel="noopener noreferrer" @click="$emit('downloadDoc', tdData[header.value][3])" :class="tdData.disabledoc ? 'disabled-link' :''">
                                    {{ tdData[header.value][0] }}
                                        </a>{{tdData[header.value][1]}} 
                                    <v-icon class="mdi mdi-certificate-outline text-tertiary mx-2" @click="$emit('showDSCToParent', tdData[header.value][2])"></v-icon>
                            </span>   
                            <span v-else-if="tdData[header.value]">
                                <a href="javascript:void(0)" rel="noopener noreferrer" @click="$emit('getDocument', tdData)" :class="tdData.disabledoc ? 'disabled-link' :''">
                                    {{ tdData[header.value] }}
                                </a>
                                <!-- <v-icon v-if="tdData[header.value]!=null" class="mdi mdi-certificate-outline text-tertiary mx-2" @click="$emit('showDSCToParent', tdData)" :class="tdData.disabledoc ? 'disabled-link' : ''"></v-icon> -->
                                <v-icon :icon="!tdData.printIcon ? 'mdi-certificate-outline': ''"  class="text-tertiary mx-2" @click="$emit('showDSCToParent', tdData)" :class="[tdData.disabledoc && !['Work Item Documents', 'NDA Documents'].includes(tdData.sectionTitle) ? 'disabled-link': '']"></v-icon>
                            </span>
                            <span v-else>{{'NA'}}
                        </span>
                        </span>
                        <span v-else-if="header.value === 'viewButton'">
                        <v-icon class="mdi mdi-file-outline text-tertiary mx-2" @click="$emit('modalToView', tdData)"></v-icon>
                        </span>
                        <span v-else-if="header.value === 'zipFile'">
                            <v-icon icon="mdi-zip-box-outline" size="large" color="rgb(var(--v-theme-tertiary))" class="mr-2" title="Download all applicable documents as zip" @click="$emit('zipFileDownload', tdData)"/>
                        </span>
                        <span v-else v-html="tdData[header.value]"></span>
                    </td>
                </template>
                </tr>
            </template>

        </v-data-table>
    </v-row>
</v-container>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, defineEmits, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	thList: Array,
	tdDataList: Array,
	FooterData: Boolean,
	gridTitle: String,
	rowSpanTDGrid: Boolean,
	ignoreColumn: Array
});

const emit = defineEmits([" showDSCToParent", "modalToView","getDocument"]);
const rightAlign = ref(['docSize','tolerancePercentage','conversionRate'])

const commonthData = ref([]);
const commontdData = ref([]);
const disableFooter = ref(false);
const rowSpanTDGrid = ref(false);
const ignoreColumn = ref([]);

watch(
	() => [props.thList, props.tdDataList, props.ignoreColumn],
	([newthVal, newtdDataVal, newIgnoreCol]) => {
		commonthData.value = newthVal;
		commontdData.value = newtdDataVal;
		ignoreColumn.value = newIgnoreCol || [];
	},
	{
		immediate: true
	}
);


onMounted(async () => {
	commontdData.value = props.tdDataList;
	commonthData.value = props.thList;
	disableFooter.value = props.FooterData;
	rowSpanTDGrid.value = props.rowSpanTDGrid;
});
</script>
<style lang="scss" scoped>
.disabled-link {
  pointer-events: none !important;
  cursor: not-allowed !important;
  text-Decoration:none !important;
  color: black !important;
}
</style>
