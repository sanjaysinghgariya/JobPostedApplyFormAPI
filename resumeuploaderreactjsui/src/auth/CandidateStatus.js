import React, { useEffect } from 'react'
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState , PropTypes } from 'react';
import styled from '@emotion/styled';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



import { format } from 'date-fns'
import { useGetResumeProfileQuery, useSaveProfileMutation } from '../services/CandidateProfileAPI';


const CandidateStatus = () => {

    const [candidate, setCandidate] = useState([])
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const [saveProfile] = useSaveProfileMutation()
    const {data, isSuccess} = useGetResumeProfileQuery()
    console.log("data", data)
    
    useEffect(()=>{
        if (data &&  isSuccess){
            setCandidate(data.candidates)
        }
    },[data, isSuccess])


    
    return (
        <><Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2, fontWeight: 'bold' }} >

        <Typography sx={{ fontWeight: 'bold', color: 'blue' }} variant='h2' component='div'>Resume Uploader</Typography>

    </Box>
                <Grid item xs={7}>
                    <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'info.light', padding: 1 }}>
                        <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>List Of Candidates(Please Check you Email If Interview is Schelded)</Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                            <TableHead>
                                <TableRow >
                                    <TableCell align='center'>Name</TableCell>
                                    <TableCell align='center'>Email</TableCell>
                                    <TableCell align='center'>DateofBirth</TableCell>
                                    <TableCell align='center'>State</TableCell>
                                    <TableCell align='center'>Gender</TableCell>
                                    <TableCell align='center'>Location</TableCell>
                                    <TableCell align='center'>Avatar</TableCell>
                                    <TableCell align='center'>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { candidate.map((candidate, i)=>{
                                    return (

                                        <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}>
                                    <TableCell align='center'>{candidate.name}</TableCell>
                                    <TableCell align='center'>{candidate.email}</TableCell>
                                    <TableCell align='center'>{candidate.date_of_birth}</TableCell>
                                    <TableCell align='center'>{candidate.state}</TableCell>
                                    <TableCell align='center'>{candidate.gender}</TableCell>
                                    <TableCell align='center'>{candidate.location}</TableCell>
                                    <TableCell align='center'><Avatar src={`http://127.0.0.1:8000/${candidate.profile_image}`} /></TableCell>
                                    <TableCell align='center'>{candidate.status}</TableCell>
                                </TableRow>

                                    )
                                })}
                                
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Grid>
        </>
    )
}

export default CandidateStatus



