import { defineStore } from 'pinia';
export const useCommonStore = defineStore("commonstore", {
    state: () => ({
        currentTheme: 'yellowTheme'
    }),
    persist: {
        storage: sessionStorage, // data in sessionStorage is cleared when the page session ends.
    }
})