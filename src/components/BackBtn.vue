<template>
<v-row no-gutters>
        <v-col class="text-right py-3">
            <!-- <v-hover>
                <template v-slot:default="{ isHovering, props }"> -->
                    <v-btn v-bind="props" variant="outlined" size="large" density="compact" rounded class="text-button font-weight-bold text-capitalize bg-primary-gradient border-opacity-0 text-white px-2 backBtn" @click="backToPage()"> <v-icon icon="mdi-chevron-left-circle" size="17" color="#fff" class="pr-2"></v-icon>Back</v-btn>
                <!-- </template>
            </v-hover> -->
        </v-col>
    </v-row>
</template>

<script setup>
 /* eslint-disable */

const emit = defineEmits();

const backToPage = () => {
  emit('backToPage')
}
</script>

<style lang="scss" scoped>
/* Define primary and light colors as maps for reusability */
$dialog-colors: (success: (primary: #2d6e42, light: #d4eddc),
    failure: (primary: #702a32, light: #f7d9da),
    info: (primary: #2f5a84, light: #cfe6fe),
    warning: (primary: #a37104, light: #fff0cf),
    confirm: (primary: #464496, light: #eeeef6));

/* Mixins for gradients, borders, and color handling */
@mixin dialog-title-bg($type) {
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
.dialog-title {
    @each $type in map-keys($dialog-colors) {
        &.#{$type} {
            @include dialog-title-bg($type);

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
</style>
