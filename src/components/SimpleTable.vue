<template>
<v-table class="pa-4" density="compact">
    <thead>
        <tr>
            <th v-for="(thdata, thIndex) in thInfoList" :key="thIndex" class="font-weight-bold thBgColor text-white" :class="thdata.class">{{ thdata.title}}</th>
        </tr>
    </thead>
    <tbody v-if="!noRecord">
        <template v-for="(group, groupIndex) in tdDataInfoList" :key="groupIndex">
            <tr v-if="group.title" class="font-weight-bold bg-light tdBgColor">
                <td :colspan="thInfoList.length" class="text-center text-tertiary">{{ group.title }}</td>
            </tr>
            <tr v-for="(tddata, index) in group.dataRow" :key="index" :class="group.title ? index :  groupIndex % 2 === 0 ? '' : 'tdBgColor'">
                <td v-for="(item, labelIndex) in tddata" :key="labelIndex" :class="item.class">
                    <a v-if="item.isOpen" @click="nextPageClick(group.eventRow)" class="cursor-pointer text-tertiary text-decoration-underline">
                        {{ item.value }}
                        <v-icon v-if="item.icon" :icon="item.icon" color="rgb(var(--v-theme-tertiary))"></v-icon>
                    </a>
                    <a v-else-if="item.link" :href="item.url" @click="item.url ? nextPageClick(tddata.eventRow?.[0]):null" :target="item.url ? '_blank' : '_self'" class="cursor-pointer text-tertiary text-decoration-underline">
                        {{ item.value }}
                        <v-icon v-if="item.icon" :icon="item.icon" color="rgb(var(--v-theme-tertiary))"></v-icon>
                    </a>
                    <span v-else>{{ item.value }}</span>
                </td>
            </tr>
        </template>
    </tbody>
    <tbody v-else>
        <tr class="text-center text-primary bg-white">
            <td :colspan="thInfoList.length">No Record Found</td>
        </tr>
    </tbody>
</v-table>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    headingText: String,
    thHeaders: Array,
    tdDataItems: Array,
    key: Number
})

const thInfoList = ref([]);
const tdDataInfoList = ref([])
const hideFooter = ref(false);
const emit = defineEmits(["nextPageClick"]);
const noRecord = ref(false)

watch(
    () => props.tdDataItems,
    (newValue) => {
        tdDataInfoList.value = newValue;
        noRecord.value = tdDataInfoList.value?.length < 1;
    }, {
        deep: true
    }
);
const nextPageClick = (obj) => {
    emit('pageClickNextPage', obj)
}
onMounted(async () => {
    thInfoList.value = props.thHeaders
    tdDataInfoList.value = props.tdDataItems;
    noRecord.value = tdDataInfoList.value?.length < 1;
})
</script>

<style lang="scss" scoped>
.v-table__wrapper {
    border-radius: 1px !important;
}

.v-table>.v-table__wrapper>table>thead {
    background-color: rgb(var(--v-theme-primary-light)) !important;
    color: rgb(var(--v-theme-tertiary)) !important;
}

.v-table>.v-table__wrapper>table>tbody>tr>td {
    padding: 0px 10px !important;
}
</style>
