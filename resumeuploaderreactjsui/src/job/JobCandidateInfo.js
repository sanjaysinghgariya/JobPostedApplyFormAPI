import React, { useEffect } from 'react'
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState , PropTypes } from 'react';
import styled from '@emotion/styled';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './Navbar';


import { format } from 'date-fns'
import { useGetCandidateInfoQuery, useGetResumeProfileQuery, useSaveProfileMutation } from '../services/CandidateProfileAPI';
import { Link } from 'react-router-dom';


const JobCandidateInfo = () => {

    const [candidate, setCandidate] = useState([])
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const {data, isSuccess} = useGetCandidateInfoQuery()
    console.log("data", data)
    
    useEffect(()=>{
        if (data &&  isSuccess){
            setCandidate(data.candidates)
        }
    },[data, isSuccess])


    
    return (
        <>
        <Navbar />
        
        <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2, fontWeight: 'bold' }} >

        <Typography sx={{ fontWeight: 'bold', color: 'white' }} variant='h2' component='div'>Resume Uploader</Typography>

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
                                    <TableCell align='center'>Company</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { candidate.map((candidate, i)=>{
                                    return (

                                        <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}>
                                    <TableCell align='center'>{candidate.name1}</TableCell>
                                    <TableCell align='center'>{candidate.email1}</TableCell>
                                    <TableCell align='center'>{candidate.date_of_birth1}</TableCell>
                                    <TableCell align='center'>{candidate.state1}</TableCell>
                                    <TableCell align='center'>{candidate.gender1}</TableCell>
                                    <TableCell align='center'>{candidate.location1}</TableCell>
                                    <TableCell align='center'><Avatar src={`http://127.0.0.1:8000/${candidate.profile_image1}`} /></TableCell>
                                    <TableCell align='center'>{candidate.status1}</TableCell>

                                    <TableCell align='center'><Link to={`/job_info/${candidate.job}`} >CompanyInfo</Link></TableCell>
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

export default JobCandidateInfo



