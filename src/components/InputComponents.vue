<template>
<v-row id="inputComponent" class="padNone" no-gutters>
    <v-col v-for="(input, index) in inputArylist" :key="index" v-bind="getColProps(input)">
            <div class="d-flex align-center">
                <v-label class="wrap-text">{{ t(input.label) }}</v-label>
                <v-icon v-if="input.isMandatory" icon="mdi-asterisk" size="9" color="error"></v-icon>
                <v-tooltip v-if="input?.rules" max-width="500">
                    <template v-slot:activator="{ props }">
                        <v-btn icon v-bind="props" size="11" class="mx-2 cursor-pointer">
                            <v-icon icon="mdi-information" size="13" color="rgb(var(--v-theme-tertiary))" ></v-icon>
                        </v-btn>
                    </template>
                    <v-list class="px-0">
                        <v-list-item min-height="20" v-for="(rule, index) in input?.rules || []" :key="index" class="py-0 px-0">
                            <v-list-item-title class="wrap-text f-13 text-justify">
                                <v-icon class="circle-icon">mdi-circle-small</v-icon>
                                {{ rule.msg }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-tooltip>
            </div>
        <component :is="getComponentType(input.type)" v-model.trim="modelValue[index]" v-bind="inputProps(input)" @blur="errorBlur(index)" @input="v$.value.modelValue[index]?.$touch()" @update:modelValue="(e) => input.change ? handleChange(input, e, index) : ''" @focus="input.onFocus" @click="input.click" @click:clear="clearDate(index)" :error-messages="getErrorMessages(index)">
            <span v-if="input.htmlText" v-html="input.htmlText"></span>
            <v-radio v-for="(item, i) in input.props?.items" :key="i" :label="item.stringValue" :value="item.id"> {{ item.text }} </v-radio>
            <template v-if="input.chips" v-slot:selection="{ item }">
                <v-chip label variant="tonal" color="#4f398d" class="border-purple orgchip" size="small" density="defualt">
                    {{ item.title }}
                </v-chip>
            </template>
        </component>

        <template v-if="input.valueRange">
            <div class="d-flex w-100 valueRange">
                <div class="text-black text-rightfont-weight-bold rangeSelector">
                    <v-select v-model.trim="modelValue[index][0]" :flat="true" density="compact" :items="input.items" item-title="name" item-value="name" variant="outlined" class="font-weight-bold" placeholder="Select" @update:modelValue="changeRange(modelValue[index])" clearable> {{ item.title }}</v-select>
                </div>
                <div class="d-flex w-100 rangeInput">
                    <v-text-field density="compact" v-model.trim="modelValue[index][1]" type="number"  min="0" max="30" onkeypress='return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))' :placeholder="RangeSymbol ? 'Min Value' : 'Enter Value'" prepend-inner-icon="mdi-currency-inr" variant="outlined" class="text-black fromValue" @drop="onDrop" @paste="onDrop"></v-text-field>
                    <p v-if="RangeSymbol" class="mx-2 my-2 text-black font-weight-bold">{{modelValue[index][0]}}</p>
                    <v-text-field v-if="RangeSymbol" density="compact" v-model.trim="modelValue[index][2]" type="number" min="0" max="30" onkeypress='return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))'  placeholder="Max Value" prepend-inner-icon="mdi-currency-inr" variant="outlined" class="text-black toValue" @drop="onDrop" @paste="onDrop"></v-text-field>
                </div>
            </div>
        </template>
    </v-col>
    <v-col xl="3" lg="3" md="4" sm="6" cols="12">
        <slot name="orgChainComponent"></slot>
    </v-col>
</v-row>
</template>

<script setup>
/* eslint-disable */
import { ref, watch, onBeforeMount, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { commonValidation } from "../assets/CommonJs/Validation";
import { onBeforeRouteLeave } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const inputArylist = ref([]);
const modelValue = ref([]);
let v$ = ref(null);
const emit = defineEmits(["callList"]);
const RangeSymbol = ref(false);
const Rangevalue = ref([]);
const value = ref([]);
const orgChainPopup = ref(null);
const onDrop = (e) => {
    e.preventDefault();  // required
};
function changeRange(newValue) {
    RangeSymbol.value = newValue[0] == "Between" ? true : false;
    newValue[2] = null;
}

// Props definition
const props = defineProps({
    inputAry: Array
});

// Vuelidate setup
const getValidatorFunction = (type, params) => {
    switch (type) {
        case "required":
            return required;
        case "notRequired":
            return commonValidation.notRequired.$validator;
        case "minLength":
            return minLength(params?.min || 0);
        case "isAlphaNumericSpace":
            return commonValidation.isAlphaNumericSpace.$validator;
        case "isSpecialChar":
            return commonValidation.isSpecialChar.$validator;
        case "noRepeatedChars":
            return commonValidation.noRepeatedChars.$validator;
        case "maxThirtyCharacters":
            return commonValidation.maxThirtyCharacters.$validator;
        case "isValidEmail":
            return commonValidation.isValidEmail.$validator;
        case "isValidPAN":
            return commonValidation.isValidPAN.$validator;
        default:
            return null;
    }
};

// Default messages for each validator type
const defaultMessages = {
    required: "This field is required",
    minLength: "This field must have at least {min} characters"
};

const rulesList = rules => {
    if (!rules || !Array.isArray(rules)) return {};
    const validation = {};
    rules.forEach(({
        type,
        msg,
        params
    }) => {
        const validatorFn = getValidatorFunction(type, params);
        if (validatorFn) {
            const message = "Invalid Input"
                // msg || defaultMessages[type]?.replace("{min}", params?.min);
            validation[type] = helpers.withMessage(message, validatorFn);
        }
    });
    return validation;
};

const validationRules = ref({
	modelValue: props.inputAry.map(({ rules }) => rulesList(rules))
});

const updateVuelidate = () => {
    v$.value = useVuelidate(validationRules.value, {
        modelValue,
        inputArylist
    });
};

watch(
    () => props.inputAry,
    newInputAry => {
        inputArylist.value = newInputAry;
        // modelValue.value = props.inputAry.map(x => x.modelValue || null);
        // Re-initialize vuelidate
        updateVuelidate();
    }, {
        immediate: true,
        deep: true
    }
);

// Component type map
const componentMap = {
    text: "v-text-field",
    datePicker: "v-date-input",
    textArea: "v-textarea",
    dropDown: "v-select",
    radio: "v-radio-group",
    checkbox: "v-checkbox",
    image: "v-img"
};

// Get the component type based on input type
const getComponentType = type => componentMap[type] || "div";

const inputProps = input => ({
    variant: input.variant || "outlined",
    density: input.density || "compact",
    disabled: input.disabled || false,
    autocomplete: "off",
    ...input.props
});

// Column properties with default breakpoints
const getColProps = input => ({
    cols: input.cols || 12,
    xl: input.xl || 3,
    lg: input.lg || 3,
    md: input.md || 4,
    sm: input.sm || 6
});

const handleChange = ({ condition, newField, props, isDisabled, functionCall, isCallFun }, value) => {
    if (isDisabled && Array.isArray(isDisabled)) {
        isFieldDisabled(isDisabled, value);
    } else {
        if (!functionCall && condition == value) {
            addNewFields(newField)
        } else if (!functionCall && condition != value) {
            removeNewFields(newField);
        }
        isCallFun ? emit(isCallFun, value, modelValue.value) : ''
    }
    updateVuelidate();
};

// Disable the Fields
const isFieldDisabled = (isDisabledArray, value) => {
    isDisabledArray.forEach(({ id, mValue }) => {
        if(mValue == value){
            const disableFieldIndex = inputArylist.value.findIndex(field => field.props.id === id);
            if (disableFieldIndex !== -1) {
                inputArylist.value[disableFieldIndex].disabled = (mValue === value);
                modelValue.value[disableFieldIndex] = null;
            }
        }
    });
};

const addNewFields = addField => {
    // Add New Fields    
    addField.forEach((field, i) => {
        const insertIndex = inputArylist.value.length; // Use idx if provided, otherwise append
        inputArylist.value.splice(insertIndex, 0, {
            newFields: true,
            ...field
        });
        modelValue.value.splice(insertIndex, 0, null); // Add default empty value
        validationRules.value.modelValue.splice(
            insertIndex,
            0,
            rulesList(field.rules)
        );
    });
    emit("updateFieldVal");

};

const removeNewFields = removeField => {
    let rfields = removeField
    // Remove the fields from the main input array
    rfields.map(field => inputArylist.value.findIndex(f => f.label === field.label))
        .sort((a, b) => b - a) // Sort in descending order to avoid index shifting
        .forEach(index => {
            if (index !== -1) {
                // Ensure valid index
                inputArylist.value.splice(index, 1);
                modelValue.value.splice(index, 1);
                validationRules.value.modelValue.splice(index, 1);
            }
        });
};

const clearAll = () => {
    // Filter out fields with `newFields = true`
    const fieldsToRemove = inputArylist.value
        .map((field, index) => ({ field, index }))
        .filter(({ field }) => field.newFields);

    // Sort the indices in descending order to avoid shifting
    fieldsToRemove
        .map(({ index }) => index)
        .sort((a, b) => b - a)
        .forEach((index) => {
            inputArylist.value.splice(index, 1);
            modelValue.value.splice(index, 1);
            validationRules.value.modelValue.splice(index, 1);
        });
    // Enable the (Disable) Fields
    inputArylist.value.map(field => field.disabled = false)
};

// Submit Button
const submitBtn = (input, event) => {
    v$.value.value.$validate();
    emit("callCaptcha");
    if (!v$.value.value.$invalid) {
        emit("sendData", modelValue.value);
    }
};

const customErrors = ref({});

const errorBlur = (index) => {
  customErrors.value[index] = "";
};

const setCustomError = (index, message) => {
  customErrors.value[index] = message;
};

const getErrorMessages = (index) => {
  const vuelidateErrors = v$.value.value.modelValue[index]?.$errors?.map(e => e.$message) || [];
  const customError = customErrors.value[index] ? [customErrors.value[index]] : [];
  return [...vuelidateErrors, ...customError];
};

// Cancel Button
const cancelBtn = (serviceCall = false) => {
    clearAll();
    v$.value.value.$reset();
    modelValue.value = props.inputAry.map(x => Array.isArray(x.modelValue) ? x.modelValue.map(x => x || null) : x.modelValue || null);
    emit("clearData", serviceCall);
};

const resetForm = () => {
    modelValue.value = props.inputAry.map(x => Array.isArray(x.modelValue) ? x.modelValue.map(x => x || null) : x.modelValue = null);
}

const setForm = (index, value) => {
    modelValue.value[index] = value //props.inputAry.map(x => x.modelValue = data);
}

const rulesListMsg = (inputs) => {
    let a = inputs?.rules?.map(x => x.msg).join('<br>');
    return a;
}

const clearDate = (index) => {
    modelValue.value[index] = null;
    v$.value.value.modelValue[index].$reset();
    customErrors.value[index] = null;
}

defineExpose({
    submitBtn,
    cancelBtn,
    modelValue,
    resetForm,
    setForm,
    handleChange,
    addNewFields,
    removeNewFields,
    changeRange,
    orgChainPopup,
    setCustomError
});

onBeforeMount(() => {
    updateVuelidate();
    modelValue.value = props.inputAry.map(x => Array.isArray(x.modelValue) ? x.modelValue.map(x => x || null) : x.modelValue || null);
});

// Initialize inputs and validation when mounted
onMounted(() => {
    inputArylist.value = props.inputAry;
    
});

onBeforeRouteLeave((to, from) => {
    cancelBtn();
})
</script>

<style lang="scss" scoped>
.v-list {
    background: transparent !important;
    color: #fff !important;

    .wrap-text {
        white-space: normal; /* Allows text to wrap */
        word-break: break-word; /* Ensures long words break correctly */
    }
}
</style>