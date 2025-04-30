import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { VDateInput } from 'vuetify/labs/VDateInput';
import '@mdi/font/css/materialdesignicons.css'
import "@/assets/sass/variables.scss";
import "@/assets/sass/fontSize.scss";
import { defaultTheme, yellowTheme, blackTheme } from "@/assets/sass/colorThemes";

const vuetify = createVuetify({
    locale: {
        locale: 'en',
    },
    date: {
        locale: {
          en: 'en-GB',
        }
    },
    theme: {
        defaultTheme: 'defaultTheme',
        variations: {
            colors: ['primary', 'secondary', 'tertiary'],
            lighten: 10,
            darken: 10,
        },
        themes: {
            defaultTheme,
            yellowTheme,
            blackTheme
        }
    },
    components: {
        VDateInput,
        ...components
    },
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})

export default vuetify