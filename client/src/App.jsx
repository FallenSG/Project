import { Button, Stack, styled, ThemeProvider } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import {LightTheme, DarkTheme} from './theme'
import Home from "./pages/Home";

export default function App(){
    return (
        <ThemeProvider theme={LightTheme}>
            <Home/>
        </ThemeProvider>
    )
}
