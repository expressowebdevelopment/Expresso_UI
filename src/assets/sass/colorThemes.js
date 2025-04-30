const defaultTheme = {
    dark: false,
    colors: {
        primary: '#fafafa',
        secondary: '#fafafa',
        tertiary: '#fafafa'
    },
    variables:{
        primaryGradient: 'linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-tertiary)) 50%, rgb(var(--v-theme-secondary)) 100%)',
        secondaryGradient: 'linear-gradient(150deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 10%)'
    }
}

const yellowTheme = {
    dark: false,
    colors: {
        primary: '#fbd858',
        secondary: '#f6bf27',
        tertiary: '#f7e285'
    },
    variables:{
        primaryGradient: 'linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-tertiary)) 50%, rgb(var(--v-theme-secondary)) 100%)',
        secondaryGradient: 'linear-gradient(150deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 10%)'
    }
}

const blackTheme = {
    dark: false,
    colors: {
        primary: '#313639',
        secondary: '#2c3437',
        tertiary: '#6d6d6d'
    },
    variables:{
        primaryGradient: 'linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-tertiary)) 50%, rgb(var(--v-theme-secondary)) 100%)',
        secondaryGradient: 'linear-gradient(150deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 10%)'
    }
}

export { defaultTheme, yellowTheme, blackTheme }