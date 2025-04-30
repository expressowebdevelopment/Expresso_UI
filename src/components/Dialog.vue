<template>
<v-dialog v-model="dialog" max-width="520" persistent>
    <v-card class="rounded-lg" max-width="520">
        <v-card-item class="pa-0">
            <v-card-title :class="dialogClassTitle" class="d-flex justify-space-between align-center rounded-te-lg">
                <p class="pt-2 pb-1 px-3 font-weight-bold text-subtitle-1 d-flex align-center text-tertiary">
                    <v-avatar color="white" size="small" class="mx-2">
                        <v-icon :icon="icon" :class="iconClass" class="mx-2"></v-icon>
                    </v-avatar>
                    <span :class="textClass">{{ msgType }}</span>
                </p>
                <v-spacer></v-spacer>
                <v-btn variant="flat" class="mx-2 my-auto dialog-close" size="18" @click="closeDialog">
                    <template v-slot>
                        <v-icon icon="mdi-close" size="14"></v-icon>
                    </template>
                </v-btn>
            </v-card-title>
            <v-divider :class="dialogDividerClass" :thickness="5" class="border-opacity-100"></v-divider>
            <v-card-text class="rounded-bs-lg rounded-be-lg">
                <!-- <strong :id="'msg_'+msgTitle" class="msgText f-14">{{ title }}</strong> -->
                <p :id="'msg_'+msgTitle" class="mt-2 msgText f-14">{{ subTitle }}</p>
                <v-divider :class="dialogDividerClass" :thickness="1" class="border-opacity-100 my-4"></v-divider>
                <v-row>
                    <v-col class="text-right py-2">
                        <v-btn :id="'btn_'+msgTitle+'_'+buttons[1]" v-if="buttons[1]" variant="outlined" size="small" width="18%" :class="iconClass" class="rounded-pill text-button font-weight-bold text-capitalize mx-1" @click="cancelBtn">
                            {{ buttons[1] }}
                        </v-btn>
                        <v-btn :id="'btn_'+msgTitle+'_'+buttons[0]" v-if="buttons[0]" variant="tonal" size="small" width="18%" :class="btnClass" class="rounded-pill text-button font-weight-bold text-capitalize mx-1" @click="okBtn">
                            {{ buttons[0] }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card-item>
    </v-card>
</v-dialog>
</template>

<script setup>
 /* eslint-disable */
import { ref, computed, onMounted } from "vue";

// Reactive states
const dialog = ref(false);
const msgType = ref("");
const msgTitle = ref("");
const title = ref("");
const subTitle = ref("");
const buttons = ref([]);
const okRedirect = ref("");
const cancelRedirect = ref("");
const emitData = ref("");
const okBtnResolve = ref(null);
const cancelBtnResolve = ref(null);

const emit = defineEmits(["okButton"]);

// Utility to map message types to classes and icons
const messageSettings = {
    Success: {
        msgTitle: "Success",
        icon: "mdi-check-circle",
        class: "success"
    },
    Failure: {
        msgTitle: "Failure",
        icon: "mdi-close-circle",
        class: "failure"
    },
    Info: {
        msgTitle: "Information",
        icon: "mdi-information",
        class: "info"
    },
    Warning: {
        msgTitle: "Warning",
        icon: "mdi-alert-circle",
        class: "warning"
    },
    Confirm: {
        msgTitle: "Confirmation",
        icon: "mdi-help-circle",
        class: "confirm"
    },
     Error: {
        msgTitle: "Error",
        icon: "mdi-close-circle",
        class: "failure"
    }
};

const getMessageSetting = (type) => messageSettings[type] || messageSettings["Info"];

// Computed properties
const dialogClassTitle = computed(() => `dialog-msgTitle ${getMessageSetting(msgType.value).class}`);
const dialogDividerClass = computed(() => `divider ${getMessageSetting(msgType.value).class}`);
const icon = computed(() => getMessageSetting(msgType.value).icon);
const iconClass = computed(() => `icon ${getMessageSetting(msgType.value).class}`);
const textClass = computed(() => `text ${getMessageSetting(msgType.value).class}`);
const btnClass = computed(() => `dialog-btn ${getMessageSetting(msgType.value).class}`);

// Open dialog function
const openDialog = () => {
    dialog.value = true;
};

// Close dialog function
const closeDialog = () => {
    dialog.value = false;
    // clearDialog();
};

// Button actions
const okBtn = () => {
    okBtnResolve.value?.(true);
    closeDialog();
};

const cancelBtn = () => {
    closeDialog();
    cancelBtnResolve.value?.(false);
};

// Dialog handler
const dialogFunc = (type, message, pathObj = {}, emitValue = "") => {
    clearDialog();
    const settings = getMessageSetting(type);

    msgType.value = type;
    msgTitle.value = settings.msgTitle;
    title.value = message.title || "";
    subTitle.value = message.subtext || "";
    buttons.value = type === "Confirm" ? ["Yes", "No"] : ["OK"];
    okRedirect.value = pathObj.okRedirect || "";
    cancelRedirect.value = pathObj.cancelRedirect || "";
    emitData.value = emitValue;

    openDialog();
    return new Promise((resolve) => {
        okBtnResolve.value = resolve;
        cancelBtnResolve.value = resolve;
    });
};

// Clear dialog state
const clearDialog = () => {
    msgType.value = "";
    msgTitle.value = "";
    subTitle.value = "";
    buttons.value = [];
    okRedirect.value = "";
    cancelRedirect.value = "";
    emitData.value = "";
    okBtnResolve.value = null;
    cancelBtnResolve.value = null;
};

onMounted(() => {
  window.dialogFunc = dialogFunc; // Expose function globally
});

defineExpose({
    dialogFunc
});
</script>

<style lang="scss" scoped>
/* Define primary and light colors as maps for reusability */
$dialog-colors: (success: (primary: #2d6e42, light: #d4eddc),
    failure: (primary: #702a32, light: #f7d9da),
    info: (primary: #2f5a84, light: #cfe6fe),
    warning: (primary: #a37104, light: #fff0cf),
    confirm: (primary: #464496, light: #eeeef6));

/* Mixins for gradients, borders, and color handling */
@mixin dialog-msgTitle-bg($type) {
    background: linear-gradient(50deg,
            map-get(map-get($dialog-colors, $type), light) 50%,
            #fff 50%) !important;
}

@mixin dialog-border-color($type) {
    border-color: map-get(map-get($dialog-colors, $type), light) !important;
}

@mixin element-color($type, $property) {
    #{$property}: map-get(map-get($dialog-colors, $type), primary) !important;
}

@mixin element-bg($type) {
    background-color: map-get(map-get($dialog-colors, $type), light);
    color: map-get(map-get($dialog-colors, $type), primary);
}

/* General styling using mixins */
.dialog-msgTitle {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include dialog-msgTitle-bg($type);

            @if $type==warning {
                color: map-get(map-get($dialog-colors, warning), primary);
            }
        }
    }
}

.divider {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include dialog-border-color($type);
        }
    }
}

.icon {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include element-color($type, color);

            @if $type==confirm {
                border-color: map-get(map-get($dialog-colors, confirm), primary) !important;
            }
        }
    }
}

.dialog-btn {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include element-bg($type);
        }
    }
}

.text {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include element-color($type, color);
        }
    }
}

.dialog-close {
    color: #b5434a;
    border: 1px solid #b5434a;
    border-radius: 50%;
    background: #ffdede;
}

.msgText{
    letter-spacing: normal;
    text-align: justify;
}
</style>
