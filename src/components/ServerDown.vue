<template>
<v-container fluid class="pa-0 h-100">
    <v-row no-gutters class="h-8">
        <v-col cols="12" class="bg-primary d-flex align-center justify-center">
            <h3>{{headerTitle}}</h3>
        </v-col>
    </v-row>
    <v-row no-gutters class="d-flex align-center justify-center text-center h-84">
        <v-col cols="12">
            <v-card class="mx-auto py-8 px-8 elevation-5 rounded-lg d-flex align-center justify-center" max-width="550">
                <v-icon color="red" size="40" class="">mdi-alert</v-icon>
                <div>
                    <h3 class="pb-2">{{ title }}</h3>
                    <p v-html="subtitle"></p>
                </div>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Alert - Server Busy / Under Maintenance activity. Please try again.');
const subtitle = ref('Please <a ref="test" title="Click to go Home" id="goHomeLink" href="/">click here</a> to visit home page');

const headerTitle = ref(window.location.host);

</script>

<style lang="scss">
@import "@/assets/sass";

/*--- Color Theme Start ---*/
.bg-primary {
  background: rgb(243, 112, 34, 100%) !important;
  background: linear-gradient(90deg, rgb(243, 112, 34, 80%) 0%, rgb(243, 112, 34, 75%) 50%, rgb(243, 112, 34, 65%) 100%) !important;
}

.h-8{
    height: 8% !important;
}

.h-84{
    height: 84% !important;
}
</style>
