import { helpers } from '@vuelidate/validators';
/* eslint-disable */
export const commonValidation = {
    isAlphaNumericSpace: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; // If value is not required, return true
            const regex = /^(?!.*[.,()_]{2})(?!^[.,()_])[\w\s.,()_]+(?<![.,()_])$/;
            return regex.test(value);
        }
    },

    /**
     * All spl. chars are not allowed except .,#/_-@( )$
     * Special charcaters are not allowed for start but ending allowed.
     * Two instances of .,#/_-@( )$ are allowed i.e combination of these three are not allowed.
     */
    isSpecialChar: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; 
              const regex = /^(?!.*[-_,.#/@()]{3})(?!^[-_,.#/@()])[\w\s-_,.#/@()]+$/;
            return regex.test(value);
        } 
    },

    /**
     *  To prevent repeating characters more than four times consecutively
     */
    noRepeatedChars: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; 
            const regex = /(.)\1{4,}/; 
            return !regex.test(value); 
        }
    },

    /**
     *  To prevent consecutively cannot exceed 30 characters .
     */ 
    maxThirtyCharacters: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; 
            
            // if (value.length > 50) {
            //     return false;  
            // }
            var trimmedInput  = value.trim();
            var inputGiving = trimmedInput .split(" ");

            for (var m = 0; m < inputGiving.length; m++) {
                if (inputGiving[m].length > 30) {
                    return false;  
                }
            }
            return true;  
        }
    },

    /**
    *  Validation for for Email.
    */
    isValidEmail: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; 
            const regex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(value); 
        }
    },

    /**
    *  Validation for for PAN.
    */
    isValidPAN: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; // Allow empty values (optional)
            const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
            return regex.test(value);
        }
    },

    /**
    *  Validation for for Number.
    */
    isNumeric: {
        $validator: (value) => {
            if (!helpers.req(value)) return true; 
            // const regex = /^[+-]?\d+(\.\d+)?$/;   // All number
            const regex = /^\d+(\.\d+)?$/;     // postive number
            return regex.test(value);
        }
    },
};

