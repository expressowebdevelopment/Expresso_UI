<template>
    <v-container fluid class="pa-0">
        <v-row v-if="!isLogin" no-gutters style="height: 100vh;">
            <v-col xl="6" lg="6" md="6" cols="12" class="text-center d-flex flex-column align-center justify-space-evenly">
                <div>
                    <v-img :src="logoPath" class="text-center"></v-img>
                    <div class="text-h5 font-weight-bold text-uppercase text-black pb-4">ULTRA HYGENIC LAUNDRY SERVICE </div>
                </div>
                <v-btn rounded="xl" size="large" class="font-weight-bold elevation-0 bg-tertiary"  @click="isLogin = !isLogin">Login Hear</v-btn>
                <v-img id="flower" :src="flowerPath" class="text-center"></v-img>
            </v-col>
            <v-col xl="6" lg="6" md="6" cols="12">
                <div id="franchiseImgPath"></div>
            </v-col>
        </v-row>
        <v-row v-else no-gutters style="height: 100vh;">
            <v-col cols="12" class="text-center d-flex justify-center align-center">
                <v-form class="w-33 text-left">
                    <v-row no-gutters class="pb-4">
                        <v-col cols="12" class="text-left">
                            <v-label class="text-h4 font-weight-bold">Login</v-label>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" class="text-left">
                            <v-label>Login ID</v-label>
                            <v-text-field ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" class="text-left">
                            <v-label>Password</v-label>
                            <v-text-field v-model="password" type="password"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-btn class="font-weight-bold elevation-0 bg-tertiary" @click="isLogin = !isLogin">Login</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { $global } from '@/main';
const vuetify = useTheme();

const logoPath = ref('');
const franchiseImgPath = ref('');
const flowerPath = ref('');

const loginId = ref('');
const password = ref('');

const isLogin = ref(false);

onMounted(() => {
    logoPath.value = require('@/assets/image/expresso_logo.png');
    franchiseImgPath.value = require('@/assets/image/franchise_img.png');
    flowerPath.value = require('@/assets/image/flowers.png');
    vuetify.global.name.value = $global.$commonstore.currentTheme;
});

</script>

<style lang="scss" scoped>
#franchiseImgPath {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/image/franchise_img.png');
    background-size: cover;
    background-position: center;
}

#mainLogo {
    width: 65%;
    max-height: max-content;
}

#flower {
    width: 25%;
    max-height: max-content;
}

</style>