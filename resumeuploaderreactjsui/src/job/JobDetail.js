import React, { useState, PropTypes } from 'react'
import { useGetJobApplyFormMutation, useGetSingleJobProfileQuery } from '../services/CandidateProfileAPI';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';
import { Navigate } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { format } from 'date-fns'
import { useSaveProfileMutation } from '../services/CandidateProfileAPI';
import Navbar from './Navbar';




const indianStates = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep',
    'Delhi',
    'Puducherry',
];






const JobDetail = () => {
    const [jobinfo, setjobinfo] = useState(null);
    const { id } = useParams()
    const { data, isSuccess } = useGetSingleJobProfileQuery(id)
    const [shouldRedirect, setShouldRedirect] = useState(false);



    useEffect(() => {
        if (data && isSuccess) {
            setjobinfo(data)
        }
    }, [data, isSuccess])

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [dob, setdob] = useState()
    const [st, setSt] = useState()
    const [pjl, setPjl] = useState([])
    const [gender, setgender] = useState()
    const [pimage, setPimage] = useState('')
    const [resume, setresume] = useState('')
    const [error, setError] = useState({
        status: false,
        msg: "",
        type: ""
    })
    const [getJobApplyForm] = useGetJobApplyFormMutation()

    const getPjl = (e) => {
        const { value, checked } = e.target
        console.log(`${value} is ${checked}`)
        if (checked) {
            setPjl([...pjl, value])
        } else {
            setPjl(pjl.filter((e) => e !== value))
        }

    }
    const resetForm = () => {
        document.getElementById('resume-form').reset()
    }

    if (shouldRedirect) {
        return <Navigate to="/jobcandidate" />;
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('name1', name)
        data.append('job', jobinfo.id)
        data.append('email1', email)
        data.append('date_of_birth1', dob == null ? null : format(dob, 'yyyy-MM-dd'))

        data.append('state1', st)
        data.append('gender1', gender)
        data.append('location1', pjl)
        data.append('profile_image1', pimage)
        data.append('resume_pdf1', resume)


        if (name && email && dob && st && gender && pjl && pimage && resume != null) {
            console.log("data1", data)



            const res = await getJobApplyForm(data)
            console.log(res)






            if (res.error) {
                console.log(error)
                setError({
                    status: true, msg: "All Fields are required", type: 'error'
                })

            }

            if (res.data.status === "sucesss") {
                setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
                resetForm()
                setShouldRedirect(true);
            }


        }
        else {
            setError({
                status: true, msg: "All Fields are required", type: 'error'
            })

        }
    }








    return (
        <>
        <Navbar />
            <div>JobDetail</div>
            <div>
                {jobinfo ? (
                    <div>
                        <h1 className="job-title">{jobinfo.title}</h1>
                        <p className="job-description">{jobinfo.description}</p>
                        <p>
                            <strong>Company:</strong> {jobinfo.company}
                        </p>
                        <p>
                            <strong>Location:</strong> {jobinfo.location}
                        </p>
                        <p>
                            <strong>Salary:</strong> {jobinfo.salary}
                        </p>
                        <p>
                            <strong>Remote:</strong> {jobinfo.is_remote ? 'Yes' : 'No'}
                        </p>
                        <p>
                            <strong>Experience(Years):</strong> {jobinfo.experience}
                        </p>
                        <p>
                            <strong>Posted at:</strong> {jobinfo.posted_at}
                        </p>
                        <Link to="/job_info">Back to Job List</Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {/* Start of the form  */}


            <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2, fontWeight: 'bold' }} >

                <Typography sx={{ fontWeight: 'bold', color: 'blue' }} variant='h2' component='div'>Resume Uploader</Typography>

            </Box>
            <Grid container justifyContent="content" >
                <li>
                    <span>please click here for</span>
                    <Link to="/jobcandidate">CandidateInfo</Link>
                </li>
                <Grid justifyContent="center">
                    <h1>Fill the form</h1>
                    <Box component="form" noValidate id="resume-form" sx={{ p: 3 }} onSubmit={handleSubmit}>
                        <TextField id="name" name="name" required fullWidth margin='normal' label="Name" onChange={(e) => { setName(e.target.value) }} />
                        <TextField id="email" name="email" required fullWidth margin='normal' label="Email" onChange={(e) => { setEmail(e.target.value) }} />

                        <Box mt={2}>
                            <FormLabel id="dob-select-label">Date of Birth</FormLabel>
                            <br />
                            <DatePicker label="Date of Birth" name='dob' id='dob' dateFormat="yyyy/MM/dd" selected={dob} onChange={(date) => setdob(date)} />
                        </Box>






                        <FormControl fullWidth margin='normal'>
                            <FormLabel id="state-select-label">State</FormLabel>
                            <Select labelId='state-select-label' id='state-select' value={st} label='st' onChange={(e) => { setSt(e.target.value) }}>
                                <MenuItem value='Jharkhand'>Other</MenuItem>
                                {indianStates.map((state) => (
                                    <MenuItem key={state} value={state}>
                                        {state}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel id="demo-radio-gender">Gender</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="Female" control={<Radio />} label="Female" onChange={(e) => setgender(e.target.value)} />
                                <FormControlLabel value="Male" control={<Radio />} label="Male" onChange={(e) => setgender(e.target.value)} />
                                <FormControlLabel value="Other" control={<Radio />} label="Other" onChange={(e) => setgender(e.target.value)} />
                            </RadioGroup>
                        </FormControl>

                        <FormControl component='fieldset' fullWidth margin='normal'>
                            <FormLabel component='legend'>Preferred Job Location:</FormLabel>
                            <FormGroup row>
                                <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi" onChange={(e) => getPjl(e)} />
                                <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" onChange={(e) => getPjl(e)} />
                                <FormControlLabel control={<Checkbox />} label="Banglore" value="Banglore" onChange={(e) => getPjl(e)} />
                                <FormControlLabel control={<Checkbox />} label="Ranchi" value="Ranchi" onChange={(e) => getPjl(e)} />
                                <FormControlLabel control={<Checkbox />} label="Kolkata" value="Kolkata" onChange={(e) => getPjl(e)} />
                            </FormGroup>
                        </FormControl>

                        <Alert severity='info'>Dont upload a file with large name</Alert>
                        <br />
                        <Stack direction='row' alignItems="center" spacing={4} >
                            <label htmlFor='profile-photo'>
                                <Input accept="image/*" id="profile-photo" type="file" onChange={(e) => { setPimage(e.target.files[0]) }} />
                                <Button variant='contained' component='span'  >Upload Profil Pic</Button>
                            </label>

                            <label htmlFor="resume-file">
                                <Input accept="doc/*" id="resume-file" type="file" onChange={(e) => { setresume(e.target.files[0]) }} />
                                <Button variant="contained" component="span">Upload Resume</Button>
                            </label>
                        </Stack>
                        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
                        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color='error' >Submit</Button>

                    </Box>

                </Grid>
            </Grid>









        </>
    )
}

export default JobDetail