<template>
<v-container fluid>
    <v-row class="">
        <v-col md="6" lg="6" sm="6" cols="12" v-for="(item, tableIndex) in tableData " :key="tableIndex">
            <v-table class="w-100 mr-5 border-thin rounded-lg">
                <tbody>
                    <template v-for="(itemValue, itemKey, itemIndex) in item" :key="itemIndex">
                        <tr v-if="itemValue">
                            <td class="bg-grey-lighten-4 text-left text-tertiary font-weight-bold mr-3 f-12 w-50">{{itemKey }}</td>
                            <td v-if="Array.isArray(itemValue)" class='text-left  font-weight-medium f-12'>
                                <span v-if="itemValue[0]=='None' || itemValue[0]==null">{{itemValue[0]}}</span>
                                <span v-else>
                                <a href="javascript:void(0)" @click="download(itemValue[3])">{{itemValue[0]}}</a>{{itemValue[1]}}
                                <v-icon class="mdi mdi-certificate-outline text-tertiary mx-2" @click="$emit('showDSCToParent', itemValue[2])"></v-icon>
                                </span>
                            </td>
                            <td v-else class='text-left  font-weight-medium f-12'>{{itemValue}}</td>
                        </tr>
                    </template>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>
/* eslint-disable */
import { integer } from '@vuelidate/validators';
import { ref, defineProps, watch, onMounted } from 'vue';

const props = defineProps({
    details: Object,
})

const tableData = ref([]);
const emit = defineEmits(["downloadDoc"]);
const download = (docData) => {
    emit('downloadDoc', docData);
}

function splitObject(obj) {
    const keys = Object.keys(obj);
    if (keys.length <= 5) {
        tableData.value = [obj];
        return;
    }
    const mid = Math.ceil(keys.length / 2);        
    const splitData = [keys.slice(0, mid), keys.slice(mid)].map(keySet =>
        keySet.reduce((acc, key) => {
            if (obj[key]) {
                acc[key] = obj[key];
            }
            return acc;
        }, {})
    );
    tableData.value = splitData.filter(part => Object.keys(part).length);
}

onMounted(async () => {
    splitObject(props.details);
 
});
</script>

<style lang="scss" scoped>
.v-table--density-default {
    --v-table-row-height: 25px !important;

}

.v-table>.v-table__wrapper>table>tbody>tr>td {
    padding: 0px 10px !important;
}
</style>
