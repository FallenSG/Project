import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: "#ff3366",
        },
        navbar: {
            main: "#28282a"
        }
    }
});

export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff'
        }
    }
});
