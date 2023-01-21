import { createTheme, responsiveFontSizes } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        primary: {
            main: "#ff3366",
        },
        navbar: {
            main: "#28282a"
        },
        highlight: {
            main: "#f5f6fc"
        }
    }
});

export const LightTheme = responsiveFontSizes(lightTheme); 

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff'
        }
    }
});

export const DarkTheme = responsiveFontSizes(darkTheme);