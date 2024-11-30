import { createTheme } from "@mui/material";



const theme = createTheme({
    typography: {
        fontFamily: 'Inter'
    },
    palette: {
        darkGreen: {
            main: '#3E572E',
            light: '#577842',
            dark: '253719',
            contrastText: '#FFFFFF'
        },
        lightPaleGreen: {
            main: '#A3C37F',
            light: '#CDECAA',
            dark: '71904D',
            contrastText: '#FFFFFF'
        }
    }
});

export default theme