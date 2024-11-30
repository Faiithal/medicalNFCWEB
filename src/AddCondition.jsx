import { AppBar, Box, Button, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material"
import theme from "./themes"
import './App.css'
import { useState } from "react"
import { store } from "./api/conditions"

function AddCondition() {

    const [condition, setCondition] = useState('')

    const onSubmit = (name) => {
        
        store(name).then((response) =>
            {
                console.log(response)
            }
        )
    }

    return (
        <>
            <AppBar sx={{ backgroundColor: '#1b1b1b', display: 'flex' }} position='static'>
                <Toolbar>
                    <Button variant='text' sx={{ width: '120px', fontFamily: 'Inter', color: 'white' }}>Add Disease</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'linear-gradient(to top,#F1FF70, #CAD0AA)' }}>
                <Box sx={{
                    margin: '20px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '35px',
                    padding: '46px 27px',
                    minWidth: '100px',
                    maxWidth: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '25px'
                }}>
                    <ThemeProvider theme={theme}>
                        <Box>
                            <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Add Condition Entry</Typography>
                            <Typography variant='h6'>Condition</Typography>
                            <TextField value={condition} onChange={(e) => setCondition(e.target.value)} id="filled-basic"></TextField>
                        </Box>
                        <Button onClick={() => {onSubmit(condition)}} color='darkGreen' variant='contained' sx={{ padding: '13px 50px', borderRadius: '100px', backgroundColor: '#3E572E' }}>Submit</Button>
                    </ThemeProvider>
                </Box>
            </Box>
        </>
    )
}

export default AddCondition