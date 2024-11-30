import { useState, useEffect } from 'react'
import * as React from 'react'
import { AppBar, Autocomplete, Box, Button, Container, createTheme, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { show, update } from './api/patients'
import { index } from './api/conditions'
import { useParams } from 'react-router-dom'
import theme from './themes'


function Patients() {
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [patient, setPatient] = useState(null)
    const [conditionsList, setConditionsList] = useState(null)
    const [newPatientConditions, setNewPatientConditions] = useState(null)
    const [error, setError] = useState(false)
    const [newPatientInfo, setNewPatientInfo] = useState({
        first_name: null,
        middle_name: null,
        last_name: null,
        age: null,
        status: null,
    })

    const { id } = useParams()

    const onSubmit = () => {
        console.log(newPatientConditions)
        console.log(newPatientInfo)
        const tempPatientInfo = { ...newPatientInfo }
        tempPatientInfo.conditions = newPatientConditions.map(x => x.id)
        update(patient.id, tempPatientInfo)
            .then(res => {
                console.log(res)
            })
    }

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    useEffect(() => {
        show(id).then(res => {
            setPatient(res?.data)
            setError(!res?.ok)
            setNewPatientInfo(res?.data)
        }
        ).finally(
            setLoading(false)
        )
        index().then(res => {
            setConditionsList(res?.data)
        })
    }, [])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <AppBar sx={{ backgroundColor: '#1b1b1b', display: 'flex' }} position='static'>
                    <Toolbar>
                        <Button href="/addCondition" variant='text' sx={{ width: '120px', fontFamily: 'Inter', color: 'white' }}>Add Disease</Button>
                    </Toolbar>
                </AppBar>
                {loading ? (<Typography>Loading</Typography>) :
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', maxHeight: '150vh', background: 'linear-gradient(to top,#F1FF70, #CAD0AA)' }}>
                        {error ? (<Typography variant='h3'>No ID Found</Typography>) :
                            <Box sx={{ margin: '20px', backgroundColor: 'white', border: '1px solid black', borderRadius: '35px', padding: '46px 27px', minWidth: '100px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {editMode ?
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Medical Profile</Typography>
                                        <ThemeProvider theme={theme}>
                                            <Typography variant='h6'>First Name</Typography>
                                            <TextField onChange={e => setNewPatientInfo({ ...newPatientInfo, first_name: e.target.value })} defaultValue={patient?.first_name} id="filled-basic" sx={{ borderRadius: '35px' }} />
                                            <Typography variant='h6'>Middle Name</Typography>
                                            <TextField onChange={e => setNewPatientInfo({ ...newPatientInfo, middle_name: e.target.value })} defaultValue={patient?.middle_name} id="filled-basic" sx={{ borderRadius: '35px' }} />
                                            <Typography variant='h6'>Last Name</Typography>
                                            <TextField onChange={e => setNewPatientInfo({ ...newPatientInfo, last_name: e.target.value })} defaultValue={patient?.last_name} id="filled-basic" sx={{ borderRadius: '35px' }} />
                                            <Typography variant='h6'>Age</Typography>
                                            <TextField onChange={e => setNewPatientInfo({ ...newPatientInfo, age: e.target.value })} defaultValue={patient?.age} id="filled-basic" />
                                            <Typography variant='h6'>Status</Typography>
                                            <TextField onChange={e => setNewPatientInfo({ ...newPatientInfo, status: e.target.value })} defaultValue={patient?.status} id="filled-basic" />
                                            <Typography variant='h6'>Condition/s</Typography>
                                        </ThemeProvider>
                                        <Box component='ul'>
                                            <Autocomplete onChange={(event, value) => setNewPatientConditions(value)} label="Conditions" multiple isOptionEqualToValue={(o, v) => o.id === v.id} options={conditionsList} getOptionLabel={option => option.condition} getOptionKey={option => option.id} renderInput={(params) => <TextField {...params} />} />
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'right', gap: '5px' }}>
                                            <ThemeProvider theme={theme}>
                                                <Button onClick={onSubmit} color='darkGreen' variant='contained' sx={{ minWidth: '50px' }}>Submit</Button>
                                                <Button onClick={toggleEdit} color='lightPaleGreen' variant='contained' sx={{ minWidth: '40px', padding: "6px" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg></Button>
                                            </ThemeProvider>
                                        </Box>
                                    </Box> :
                                    <Box>
                                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Medical Profile</Typography>
                                        <ThemeProvider theme={theme}>
                                            <Typography variant='h6'>Name</Typography>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#A2AF62' }}>{patient?.first_name} {patient?.middle_name} {patient?.last_name}</Typography>
                                            <Typography variant='h6'>Age</Typography>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#A2AF62' }}>{patient?.age}</Typography>
                                            <Typography variant='h6'>Status</Typography>
                                            <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#A2AF62' }}>{patient?.status}</Typography>
                                            <Typography variant='h6'>Condition/s</Typography>
                                        </ThemeProvider>
                                        <Box component='ul'>
                                            <ThemeProvider theme={theme}>
                                                {patient?.conditions?.map(conditions =>
                                                    <Typography variant='h6' key={conditions.id} component='li' sx={{ fontWeight: 'bold', color: '#A2AF62' }}>{conditions.condition}</Typography>
                                                )}
                                            </ThemeProvider>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                                            <ThemeProvider theme={theme}>
                                                <Button onClick={toggleEdit} color='lightPaleGreen' variant='contained' sx={{ minWidth: '40px', padding: "6px" }}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z" /></svg></Button>
                                            </ThemeProvider>
                                        </Box>
                                    </Box>
                                }
                            </Box>
                        }
                    </Box>
                }
            </Box>
        </>
    )
}

export default Patients
