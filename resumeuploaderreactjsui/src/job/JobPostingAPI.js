import React, { useEffect } from 'react'
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState , PropTypes } from 'react';
import styled from '@emotion/styled';
import { Link } from "react-router-dom"; 


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetJobProfileQuery } from '../services/CandidateProfileAPI';
import Navbar from './Navbar';



const JobPostingAPI = () => {
    const [job, setJob] = useState([]);
    const { data, isSuccess } = useGetJobProfileQuery()
    console.log("data", data)

    useEffect(() => {
        if (data && isSuccess) {
            setJob(data.job_post)
        }
    }, [data, isSuccess])

    console.log("job", job)


    return (
        <>

<Navbar />
            <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2, fontWeight: 'bold' }} >

                <Typography sx={{ fontWeight: 'bold', color: 'white' }} variant='h2' component='div'>Job Posted</Typography>

            </Box>
            <Grid item xs={7}>
                <Box display='flex' justifyContent='center' sx={{ backgroundColor: 'info.light', padding: 1 }}>
                    <Typography variant='h5' component="div" sx={{ fontWeight: 'bold', color: 'white' }}>jobs Available for you</Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow >
                                <TableCell align='center'>Title</TableCell>
                                <TableCell align='center'>Description</TableCell>
                                <TableCell align='center'>Company</TableCell>
                                <TableCell align='center'>Location</TableCell>
                                <TableCell align='center'>Salary</TableCell>
                                <TableCell align='center'>Is_remote</TableCell>
                                <TableCell align='center'>Experience(Years)</TableCell>
                                <TableCell align='center'>Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {job.map((job, i) => {
                                return (

                                    <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}>
                                        <TableCell align='center'>{job.title}</TableCell>
                                        <TableCell align='center'>{job.description}</TableCell>
                                        <TableCell align='center'>{job.company}</TableCell>
                                        <TableCell align='center'>{job.location}</TableCell>
                                        <TableCell align='center'>{job.salary}</TableCell>
                                        <TableCell align='center'>{job.is_remote ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align='center'>{job.experience}</TableCell>
                                        <TableCell align='center'><Link to={`/jobinfo/${job.id}`} >Info</Link> </TableCell>
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

export default JobPostingAPI;
