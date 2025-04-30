<template>
<div class="floaty-container" :class="{ sticky: isSticky }">
    <div class="floaty" :class="{ expanded: isMenuExpanded }">
        <div class="d-flex align-center rounded-ts-xl bg-primary-toggle cursor-pointer" @click="toggleMenu">
            <div class="floaty-links-icon py-3">
                <v-icon :icon=" isMenuExpanded ? 'mdi-chevron-right-circle-outline' : 'mdi-chevron-left-circle-outline'" size="25"></v-icon>
            </div>
            <div class="floaty-links-text font-weight-bold f-15">Quick Menu</div>
        </div>
        <v-divider></v-divider>
        <div class="gradient-background rounded-bs-xl pb-4" :class="{ 'cursor-pointer': isMenuExpanded }" >
            <template v-for="link in FloatyMenu?.stickyMenu?.menuList" :key="link.title">
                <div class="d-flex" :class="{ 'menu-hover': isMenuExpanded }" @click="isMenuExpanded ? redirect(link.path, link.isExternal) : null">
                    <div class="floaty-links-icon py-3">
                        <v-icon :icon="rightFloatIcons.find(icon => icon.title === link.name)?.iconClass"></v-icon>
                    </div>
                    <div class="floaty-links-text">{{ link.name }}</div>
                </div>
            </template>
        </div>
    </div>
</div>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, getCurrentInstance, onMounted, onUnmounted } from "vue";
const { proxy } = getCurrentInstance();

const FloatyMenu = ref({});

// Props definition
const props = defineProps({
    floatyMenuLinks: Object
});

watch(
    () => props.floatyMenuLinks,
    menuLinks => {
        FloatyMenu.value = menuLinks;
    }, {
        immediate: true,
        deep: true
    }
);

const rightFloatIcons = ref([
  { title: "Search", iconClass: "mdi-magnify" }
]);

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
    toggleMenu();
}

const isMenuExpanded = ref(false);
const isSticky = ref(false);

const toggleMenu = () => {
    isMenuExpanded.value = !isMenuExpanded.value;
};

const handleScroll = () => {
    isSticky.value = window.scrollY > 120;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.gradient-background {
    background: linear-gradient(to bottom, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
}

.bg-primary-toggle {
    background-color: rgb(var(--v-theme-primary)) !important;
}

#home-enternal-logo + .floaty-container {
    height: 80%;
    width: 50%;
    position: absolute;
    right: calc(-50% + 55px);
    z-index: 9999;
    top: 540px;
    transition: top 0.3s ease-in-out;

    &.sticky {
        position: fixed;
        top: 0;
    }
}

.floaty-container {
    height: 80%;
    width: 50%;
    position: absolute;
    right: calc(-50% + 55px);
    z-index: 9999;
    top: 120px;
    transition: top 0.3s ease-in-out;

    &.sticky {
        position: fixed;
        top: 0;
    }
}

.menu-hover{
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
}

.floaty {
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    color: white;
    z-index: 1;
    pointer-events: none;
    transition: all 0.3s ease-in-out;
    transform: translateX(0);
}

.floaty.expanded {
    transform: translateX(-210px);
}

.floaty * {
    pointer-events: all;
    transition: all 0.2s ease-in;
}

.floaty .floaty-links-icon {
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
}

.floaty .floaty-links-text {
    flex-grow: 2;
    line-height: 30px;
    color: #ffffff;
    width: 210px;
    padding: 5px;
    font-size: 13px;
}
</style>
