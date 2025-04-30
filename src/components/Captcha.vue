<template>
<div id="inputComponent">
    <!-- <v-text-field type="text" class="text-black captcha" density="compact" placeholder="Enter Captcha" variant="outlined" rounded="xl" autocomplete="off" id="captcha" v-model="state.captcha" :error-messages="vrule$.captcha.$errors.map((e) => e.$message)" @blur="vrule$.captcha.$touch" @input="vrule$.captcha.$touch" :maxlength="6">
        <img :src="captchaValue" width="100" class="text-left" />
        <v-icon class="cursor-pointer" icon="mdi-refresh pr-1" @click="generateCaptcha"></v-icon>
        <v-divider vertical></v-divider>
        <span class="pr-1"></span>
    </v-text-field> -->
    <Dialog ref="dialog" />
</div>
</template>

<script setup>
/* eslint-disable */
import { reactive, ref, getCurrentInstance, onMounted,defineExpose } from "vue";
import Dialog from '@/components/Dialog.vue'
import { useVuelidate } from "@vuelidate/core";
import { required,helpers } from "@vuelidate/validators";
import aesUtil from '@/assets/CommonJs/aesUtil.js';
const  sha512 = require("js-sha512");

const capt = { captcha: "" };
const state = reactive({
	...capt
});
let captchaValue = ref('');
let saltValue = ref('');
let ip = ref('');
let encCaptcha = ref('');
const dialog = ref(null);

const rules = {
    captcha: {
        captchaempty: helpers.withMessage("Please enter Captcha", required),
        containsCaptchaRequirement: helpers.withMessage(
            () =>
            `Entered Captcha is invalid`,
            value =>
            value.length == 6
        ),
        containspecial: helpers.withMessage(
            () => 'Entered Captcha is invalid',
            value => /^[a-zA-Z0-9]+$/.test(value)
        )
    }
};

const { proxy } = getCurrentInstance();
const service = proxy.service;
const vrule$ = useVuelidate(rules, state);

function convertBase64ToBlob(base64String) { 
      const mimeType = base64String.split(';')[0].split(':')[1];
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
      }
      const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
}

function generateCaptcha() {
    service.get(proxy.$getCaptcha).then(res => {
        let base64StringValue = aesUtil.methods.decrypt('eAuction', atob(res.data));
        let hashJsonString = JSON.parse(atob(base64StringValue));
        captchaValue.value = convertBase64ToBlob(hashJsonString.objectOne.objectOne)
        saltValue.value = hashJsonString.objectOne.objectTwo;
        encCaptcha.value = hashJsonString.objectTwo.objectOne;
        ip.value = hashJsonString.objectTwo.objectTwo;
    });
}

function getvalidCaptcha() {
    // saltValue,ip,captchaEnteredValue
    return encCaptcha.value == sha512(saltValue.value + ip.value + state.captcha);
}

function validateCaptcha() {
    return [true]
    if(!vrule$.value.$invalid){
        if (getvalidCaptcha()) {
                return [true, state.captcha, saltValue.value, encCaptcha.value];
        } else {
            dialog.value.dialogFunc('Failure', { title: 'Error', subtext: 'Entered Captcha is invalid' });
            vrule$.value.$reset();
            state.captcha = '';
            generateCaptcha();
            return [false, ''];
            
        }
    } 
    else {
        return [false, ''];
    }
}

onMounted(() => {
    generateCaptcha();
});
defineExpose({
    captchaValue,
    state,
    vrule$,
    generateCaptcha,
    validateCaptcha
});
</script>
