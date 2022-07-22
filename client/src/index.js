import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from "@mui/material"
import { LightTheme, DarkTheme } from './theme'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={LightTheme}>
            <App /> 
        </ThemeProvider>
    </React.StrictMode>
);