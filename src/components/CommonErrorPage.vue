<template>
<v-container class="h-100">
    <v-row class="d-flex align-center justify-center text-center h-100">
        <v-col cols="12">
            <v-card class="mx-auto pa-5" max-width="500">
                <template v-slot:prepend>
                    <v-icon color="red">mdi-alert-circle</v-icon>
                </template>
                <template v-slot:title>
                    <span style="white-space: normal;">{{ title }}</span>
                </template>
                <template v-slot:subtitle>
                    <span v-html="subtitle"></span>
                </template>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Alert - Server Busy / Under Maintenance activity. Please try again.');
const subtitle = ref('Please <a ref="test" title="Click to go Home" id="goHomeLink" href="/">click here</a> to visit home page');
</script>
