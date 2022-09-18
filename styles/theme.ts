import {
    extendTheme,withDefaultColorScheme,withDefaultProps, type ThemeConfig
} from "@chakra-ui/react";

const colors = {
    brand: {
        50: "#E6FFFA",
        100: "#B2F5EA",
        200: "#2FA8AF",
        300: "#4FD1C5",
        400: "#EE7FAB",
        500: "#2FA8AF",
        600: "#2C7A7B",
        700: "#285E61",
        800: "#234E52",
        900: "#1D4044",
    },
    green:{
        main:"#00FF00"
    },
    pink:{
        main:"#EE7FAB",
        200:"#FACFE0"
    },
    black:{
        main: "#212529"
    },
    gray: {
        main: "#6C757D"
    }
};

export const customTheme: any = extendTheme(
    {
        colors,
        breakpoints: {
            base: "0em",
            sm: "599px",
            md: "48em",
            lg: "62em",
            xl: "80em",
            "2xl": "96em",
        },
        config: {
            useSystemColorMode: false,
            initialColorMode: "dark",
        },
        semanticTokens: {
            colors: {
                Light: {
                    default: "#FFFFFF",
                },
                Text_Main: {
                    default: "#FEFEFE",
                },
                Text_Sec: {
                    default: "#6C757D",
                },
                Text_Ter: {
                    default: "#ACB2B5",
                    _dark: "#766A6A",
                },
                Base_Canvas: {
                    default: "#F0F1F5",
                    _dark: "#1D1D1D",
                },
                Base_Card: {
                    default: "#FFFFFF",
                    _dark: "#2B2B2B",
                },
                Base_Divider: {
                    default: "#454545",
                },
                Base_Divider_Inverse: {
                    default: "#424242",
                    _dark: "#EEEFF4",
                },
                Base_Overlay: {
                    default: "rgba(48, 51, 71, 0.8)",
                    _dark: "rgba(0, 0, 0, 0.8)",
                },
                Base_Disabled_Bg: {
                    default: "#EEEFF4",
                    _dark: "#1D1D1D",
                },
                Base_Disabled_Color: {
                    default: "#ACB2B5",
                    _dark: "#766A6A",
                },
                Success_Main: {
                    default: "#38A169",
                    _dark: "rgba(37, 133, 90, 0.5)",
                },
                Success_Main_1: {
                    default: "#F0FFF4",
                    _dark: "#9AE6B4",
                },
                Error_Main: {
                    default: "#E53E3E",
                    _dark: "rgba(197, 48, 48, 0.5)",
                },
                Error_Main_1: {
                    default: "#FFF5F5",
                    _dark: "#FEB2B2",
                },
                Warning_Main: {
                    default: "#ECC94B",
                    _dark: "rgba(236, 201, 75, 0.6)",
                },
                Warning_Main_1: {
                    default: "#FFFFF0",
                    _dark: "#FBD38D",
                },
                Notificaton_Main: {
                    default: "#3182CE",
                    _dark: "rgba(49, 130, 206, 0.5)",
                },
                Notificaton_Main_1: {
                    default: "#F0FFF4",
                    _dark: "#9AE6B4",
                },
                Background: {
                    default: "#1E1E1E",
                }
            },
        },
    },
);
