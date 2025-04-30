<template>
<v-footer id="v-footer" border>
    <div class="w-100">
        <v-row class="ma-auto">
            <v-col md="3" lg="4" sm="6" cols="12" class="pb-0">
                <v-row>
                    <v-col lg="6" md="6" sm="6" cols="6" align="left">
                    </v-col>
                    <v-col lg="6" md="6" sm="6" cols="6" align="right">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col lg="3" md="12" sm="12" cols="12">
                    </v-col>
                    <v-col lg="9" md="12" sm="12" cols="12" class="text-justify pl-lg-2">
                        <p class="text-subtitle-2">{{FooterContent?.copyright?.copyrightContent}}</p>
                    </v-col>
                </v-row>
            </v-col>

            <v-divider color="tertiary" class="border-opacity-50 d-none d-sm-flex" vertical />

            <v-col md="2" lg="2" sm="6" cols="12" class="pb-0">
                <h3 class="text-justify mx-3  my-auto"><span class="white-border-bottom-gradient py-1">Certifying Agency</span></h3>
            </v-col>
            <v-divider color="tertiary" class="border-opacity-50 d-sm-none d-md-flex" vertical />

            <v-col md="2" lg="3" sm="6" cols="12" class="pb-0">
                <h3 class="text-justify mx-3 my-auto"><span class="white-border-bottom-gradient py-1">Resource</span></h3>
                <v-list density="compact" class="my-auto pb-0 pt-md-0" >
                    <v-row no-gutters class="mt-3">
                        <v-col v-for="(list, colIndex) in splitResourceList" :key="colIndex" cols="6" lg="6" md="12" sm="12">
                            <v-list-item v-for="item in list" :key="item.name" class="cursor-pointer" v-ripple>
                                <v-list-item-title @click="redirect(item.path,item.isExternal)" :title="t(item.name)">{{ t(item.name) }}</v-list-item-title>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-list>
            </v-col>
            <v-divider color="tertiary" class="border-opacity-50 d-none d-sm-flex" vertical />

            <v-col md="5" lg="3" sm="6" cols="12" class="pb-0">
                <v-row justify="around" no-gutters>
                    <v-col cols="6" class="text-right">
                        <h3 class="text-justify mx-3 my-auto"><span class="white-border-bottom-gradient py-1">Contact Us</span></h3>
                    </v-col>
                    <v-col cols="6" class="text-right">
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-btn v-bind="props" :variant="isHovering ? 'tonal' : 'outlined'" append-icon="mdi-arrow-right" color="#fffff" class="f-12 px-2 text-capitalize text-caption" rounded="lg" density="comfortable" @click="getContact">More Details</v-btn>
                            </template>
                        </v-hover>
                    </v-col>
                </v-row>
                <v-list lines="two" class="contact my-auto f-14">
                    <v-list-item  class="pa-1">
                        <template v-slot:prepend>
                            <v-avatar variant="tonal" rounded="lg">
                                <v-icon color="#ffffff">mdi-phone-in-talk</v-icon>
                            </v-avatar>
                        </template>
                        <v-list-title>{{ContactList?.phone}}</v-list-title>
                       
                    </v-list-item>
                    <v-list-item  class="pa-1">
                        <template v-slot:prepend>
                            <v-avatar variant="tonal" rounded="lg">
                                <v-icon color="#ffffff">mdi-email-fast</v-icon>
                            </v-avatar>
                        </template>
                        <v-list-title>{{ContactList?.contactemail}}</v-list-title>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>

        <v-divider color="tertiary" class="border-opacity-50 d-none d-sm-flex mb-3"></v-divider>
        <v-row no-gutters class="f-14">
            <v-col lg="4" md="4" sm="4" cols="12" class="d-flex justify-center justify-md-start">
                {{FooterContent?.copyright?.copyrightText}}
            </v-col>
            <v-col lg="4" md="4" sm="4" cols="12" class="d-flex justify-center">
                {{FooterContent?.Version}}
            </v-col>
            <v-col lg="4" md="4" sm="4" cols="12" class="d-flex justify-center  justify-md-end">
                <v-tooltip location="top">
                    <template v-slot:activator="{ props }"> 
                        <div v-bind="props" class="cursor-pointer"  @click="portalInfo">
                            Portal Policies
                        </div>
                    </template>
                    <span>Click to view portal policies</span>
                </v-tooltip>
            </v-col>
        </v-row>
    </div>
</v-footer>
</template>

<script setup>
/* eslint-disable */
import { useI18n } from 'vue-i18n';
const { t } = useI18n(); 
import { ref, computed, watch, onMounted, getCurrentInstance } from "vue";
const FooterContent = ref({});
const { proxy } = getCurrentInstance();

// Props definition
const props = defineProps({
    homePageFooter: Object
});

watch(
    () => props.homePageFooter,
    footerDetails => {
        FooterContent.value = footerDetails;
    }, {
        immediate: true,
        deep: true
    }
);

// const ContactList = ref([{
//         prependAvatar: "mdi-phone-in-talk",
//         subtitle: "0120-4200 462, 4001 002"
//     },
//     {
//         prependAvatar: "mdi-email-fast",
//         subtitle: "eauction[dot]feedback[at]gmail[dot]com / eauction[dot]feedback[at]gmail[dot]com"
//     }
// ]);
const ContactList = ref({})
ContactList.value = FooterContent.value?.contactUs?.contactList;
const splitResourceList = computed(() => {
    let textFooterLink = FooterContent.value?.resourceLink?.menuList || [];
    if(textFooterLink.length){
        const midpoint = Math.ceil(textFooterLink.length / 2);
        return [
        textFooterLink.slice(0, midpoint),  // Left column
        textFooterLink.slice(midpoint)      // Right column
        ];
    }
});

const redirect = (path,isExternal) => {
    if(isExternal){
        const a = document.createElement('a');
        a.href = path;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
    }else{
        proxy.$router.push({
            path: path ? path : ''
        })
    }
    
}
const portalInfo = () =>{ 
    proxy.$router.push( '/PortalPolicies')
}
const getContact = () =>{
    proxy.$router.push( '/ContactUs')
}
</script>

<style lang="scss" scoped>
#v-footer {
    background: rgb(var(--v-theme-footer-primary)) !important;
    color: #fff !important;

    .v-list-item--density-compact.v-list-item--one-line {
        min-height: 10px !important;
    }

    .v-list-item-title {
        font-size: calc(0.9rem * var(--fontZoomInOutValue)) !important;
    }

    .v-list {
        background: transparent !important;
        color: #cbcfd8 !important;
    }

    .v-divider--vertical {
        max-height: 280px !important;
        margin-top: 15px !important;
    }

    .f-12 {

        font-size: calc(12px * var(--fontZoomInOutValue)) !important;
    }

    .text-subtitle-2 {
        font-size: calc(00.875rem * var(--fontZoomInOutValue)) !important;
    }
}
</style>
