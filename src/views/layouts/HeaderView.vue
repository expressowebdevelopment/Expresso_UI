<template>
<header>
    <v-row no-gutters class="flex-md-row-reverse bg-primary" style="height: 80px !important;">
        <v-col xl="12" lg="12" md="12" sm="12" cols="12" class="d-flex h-100">
            <v-row no-gutters class="w-100 d-flex align-center h-100">
                <v-col xl="12" lg="12" md="12" sm="12" cols="12" class="d-flex justify-center align-center w-100 h-100">
                    <header-logo class="d-flex justify-center align-center h-100">
                        <div class="d-flex align-center w-100 h-100">
                            <v-img v-if="mainLogo" :src="mainLogo" class="my-1 mx-3 cursor-pointer" @click="redirect('/')"></v-img>
                            <div class="text-white d-flex flex-column cursor-pointer" @click="redirect('/')">
                                <span class="font-weight-bold text-h5 text-uppercase text-black">{{ PortalTitle }}</span>
                                <span class="text-lg-caption f-12 font-weight-light">{{ PortalSubTitle }}</span>
                            </div>
                        </div>
                    </header-logo>
                    <!-- <v-btn v-if="!smAndDown && mdAndDown" class="text-capitalize text-white f-13 px-2 hover-menu-line" min-width="3%" density="comfortable" variant="text"  @click="redirect('/')">Home</v-btn> -->
                    <div v-if="!smAndDown && mdAndDown" class="text-capitalize text-white px-0 mx-2 white-border-bottom-gradient f-13" min-width="5%" density="compact" variant="text"  @click="redirect('/')">Home</div>
                    <v-btn v-if="!smAndDown && mdAndDown" class="text-capitalize text-white px-2 bg-primary-gradient rounded-xl f-13" min-width="5%" density="compact" variant="outlined"  @click="redirect('/')">Login</v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</header>
<BreadcrumbView v-show="false" ref="Breadcrumb"/>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, onMounted, getCurrentInstance, computed, nextTick, onUnmounted } from 'vue';
const { proxy } = getCurrentInstance();
import { $global } from '@/main';
import { useTheme, useDisplay } from 'vuetify';
const { xlAndUp, xlAndDown, lgAndUp, lgAndDown, mdAndDown, smAndDown, xs } = useDisplay();
import BreadcrumbView from "@/components/BreadcrumbView";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
let drawer = ref(false);
const languages = ref([]);
const HeaderContent = ref({});
const announcementContent = ref({});
let ColorTheme = ref($global.$commonstore.currentTheme);
let selectedLanguage = ref($global.$commonstore.currentLanguage);
let fontSize = ref(1);
let topMenu = ref([]);
const vuetify = useTheme();

const Breadcrumb = ref("");
let PortalTitle = ref('');
let PortalTitleLength = ref(0);
let PortalSubTitle = ref('');
let PaginationFilterList = ref([]);
let mainLogo = ref('');
let colorThemeList = ref([]);
let serverTime = ref();
let date = ref();
let time = ref();
const service = proxy.service;
const toggleColorTheme = () => {
    $global.$commonstore.currentTheme = ColorTheme.value;
    vuetify.global.name.value = $global.$commonstore.currentTheme;
}

// Props definition
const props = defineProps({
  homePageHeader: {
    type: Object,
    required: true,
  }
});

watch(
    () => [props.homePageHeader],
    ([headerDetails, announcement]) => {
      HeaderContent.value = headerDetails;
    }, {
        immediate: true,
        deep: true
    }
);

const changeLanguage = () => {
    locale.value = selectedLanguage.value;
    $global.$commonstore.currentLanguage = locale.value;
    document.body.setAttribute("data-theme", $global.$commonstore.currentLanguage);
    Breadcrumb.value.call();
}

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

const fontZoomInOut = (data) => {
    fontSize.value += data; // add
    fontSize.value = data == 0 ? 1 : fontSize.value; //Actual size  0
    fontSize.value = fontSize.value > 1.30 ? 1.30 : fontSize.value; //step +3
    fontSize.value = fontSize.value < 0.70 ? 0.70 : fontSize.value; //step -3
    let root = document.documentElement;
    root.style.setProperty('--fontZoomInOutValue', fontSize.value);
}

function zeroPadding(num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
 function updateTime() {
            var offset = +5.5; // India Time Zone + 05:30
            var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            serverTime.value = serverTime.value + 1000;
            var serverDate = new Date(serverTime.value);
            var utcFormat = serverDate.getTime() + (serverDate.getTimezoneOffset() * 60000); 
            var   dates = new Date(utcFormat + (3600000 * offset)); 
            // var amOrPm = (date.getHours() < 12) ? "AM" : "PM";
            var hour = dates.getHours();
            time.value = zeroPadding(hour, 2) + ':' + zeroPadding(dates.getMinutes(), 2) + ':' + zeroPadding(dates.getSeconds(), 2); 
            date.value = week[dates.getDay()] + ' ' + zeroPadding(dates.getDate(), 2) + '-' + months[dates.getMonth()] + '-' + zeroPadding(dates.getFullYear(), 4);
        } 
  const getServerDateTime = () => {
            service.get(proxy.$getCurrentDateTimeInMillis).then(res => {
                serverTime.value = res.data; 
				updateTime();
    });
  }
onMounted(() => {
    toggleColorTheme();
    changeLanguage();
    // getServerDateTime();
    // setInterval(updateTime, 1000);
    mainLogo.value = '';
    PortalTitle.value = 'Expresso' //HeaderContent.value?.portalTitle;
    PortalTitleLength.value = PortalTitle.value.length;
    PortalSubTitle.value = HeaderContent.value?.portalSubTitle;
    PaginationFilterList.value = [5,10] //HeaderContent.value?.paginationFilterList;
    $global.$commonstore.paginationFilterList = PaginationFilterList.value;
    $global.$commonstore.paginationPerItem = PaginationFilterList.value[0];
    colorThemeList.value = HeaderContent.value?.colorThemeList;
    languages.value = HeaderContent.value?.languages;
    topMenu.value = HeaderContent.value?.topMenu?.menuList;
});

</script>

<style lang="scss" scoped>
.colorThemeBtn {
    height: 20px;
    min-height: 15px;
    max-height: 15px;
    width: 16px;
    min-width: 16px;
    max-width: 16px;
    padding: 0px 0px 1px 0px !important;
    margin: 1px 4px !important;
    font-size: 11px !important;
}

.top-bar-container {
    position: relative;
    z-index: 1;
    height: fit-content;
    padding: 3px 0;

    &::before {
        content: "";
        z-index: -1;
        position: absolute;
        height: 100%;
        width: 80%;
        top: 0;
        left: -20px;
        background: inherit;
        -webkit-transform: skewX(230deg);
        transform: skewX(230deg);
        display: block;
    }
}

.announcement-bar-container {
    position: relative;
    z-index: 1;
    height: fit-content;
    padding: 0;

    &::before {
        content: "";
        z-index: -1;
        position: absolute;
        height: 100%;
        width: 80%;
        top: 0;
        left: -1.5rem;
        background: inherit;
        -webkit-transform: skewX(320deg);
        transform: skewX(320deg);
        display: block;
    }

    .v-btn {
        &:hover {
            background-color: rgb(var(--v-theme-primary)) !important;
            color: rgb(var(--v-theme-on-primary)) !important;
            transition: 0.75s background-color;
        }
    }
}
.menuhead{
    border :1px solid white !important;
}
.menuhead:hover {
    background: rgb(var(--v-theme-primary)) !important;
    background: linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-tertiary)) 50%, rgb(var(--v-theme-secondary)) 100%) !important;
}
.toplogin:hover{
  background: rgb(var(--v-theme-primary)) !important;
  background: linear-gradient(150deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 10%) !important;
}
</style>
