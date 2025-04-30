<template>
  <v-expansion-panels v-model="ExpansionPanel">
      <v-expansion-panel class="mb-2 rounded-lg border-thin" v-for="(item, index) in expansionPanelData" :key="index" >
      <v-expansion-panel-title class="v-expansion-panel-top font-weight-bold">
          {{ item.title }}
          <template v-slot:actions="{ expanded }">
            <ExpandIcon :expanded="expanded" />
          </template>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="text-justify">
          {{ item.content }}
      </v-expansion-panel-text>
      </v-expansion-panel>
  </v-expansion-panels>

  <!-- Outer Expansion Panels for Categories -->
  <v-expansion-panels v-model="outerExpansionPanel" multiple>
    <v-expansion-panel v-for="(faq, i) in faqList" :key="i" class="mb-2 rounded-lg border-thin" :value="outerExpansionPanel.includes.i">
      <v-expansion-panel-title class="font-weight-bold text-tertiary text-subtitle-1">
        {{ faq.title }} 
        <template v-slot:actions="{ expanded }">
          <ExpandIcon :expanded="expanded" />
        </template>
      </v-expansion-panel-title>

      <v-expansion-panel-text class="text-justify">
        <!-- Inner Expansion Panels for Questions in this Category -->
        <v-expansion-panels v-model="innerExpansionPanel" multiple id="innerPanel" class="rounded-lg innerPanel">
          <v-expansion-panel v-for="(item, j) in faq.faq" :key="j" class="mb-2 rounded-lg border-thin">
            <v-expansion-panel-title class="font-weight-bold" min-height="35">
              {{ j + 1 }}. {{ item.question }} 
              <template v-slot:actions="{ expanded }">
                <ExpandIcon :expanded="expanded" />
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text  class="text-justify ml-6" v-html="item.answer"></v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
/* eslint-disable */ 
import { ref ,watch} from 'vue';
const ExpansionPanel = ref(0);
const outerExpansionPanel = ref([]);
const innerExpansionPanel = ref([]);
import ExpandIcon from '@/components/ExpandIcon.vue';
const props = defineProps({
  expansionPanelData: {
    type: Array,
    required: true,
  },
  faqList: {
    type: Array,
    required: true,
  },
  outerExpansionPanel: {
    type: Array,
    required: true,
  },
  innerExpansionPanel: {
    type: Array,
    required: true,
  }
});

watch(
    () => [props.outerExpansionPanel, props.innerExpansionPanel],
    ([outerExp, innerExp]) => {
      outerExpansionPanel.value = outerExp;
      innerExpansionPanel.value = innerExp;
    }, {
        immediate: true,
        deep: true
    }
);
</script>


  
  