import React, { useEffect } from 'react'
import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Input } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState , PropTypes } from 'react';
import styled from '@emotion/styled';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom"; 



import { format } from 'date-fns'
import { useGetResumeProfileQuery, useSaveProfileMutation } from '../services/CandidateProfileAPI';


const CandidateForm = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [dob, setdob] = useState()
    const [st, setSt] = useState()
    const [pjl, setPjl] = useState([])
    const [gender, setgender] = useState()
    const [pimage, setPimage] = useState('')
    const [resume, setresume] = useState('')
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






    console.log(pjl)
    const getPjl = (e) => {
        const { value, checked } = e.target
        console.log(`${value} is ${checked}`)
        if (checked) {
            setPjl([...pjl, value])
        } else {
            setPjl(pjl.filter((e) => e !== value))
        }

    }
    console.log(pjl)
    const resetForm = () => {
        document.getElementById('resume-form').reset()
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('date_of_birth', dob == null ? null : format(dob, 'yyyy-MM-dd'))

        data.append('state', st)
        data.append('gender', gender)
        data.append('location', pjl)
        data.append('profile_image', pimage)
        data.append('resume_pdf', resume)

        console.log(data.get('dob'))
        if (name && email && dob && st && gender && pjl && pimage && resume != null) {
            console.log(data)
            console.log(data.get('name'))
            console.log(data.get('email'))
            console.log(data.get('date_of_birth'))
            console.log(data.get('state'))
            console.log(data.get('gender'))
            console.log(data.get('location'))
            console.log(data.get('profile_image'))
            console.log(data.get('resume_pdf'))
            const res = await saveProfile(data)
            console.log(res)
            

            if (res.status === "success") {
                setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
                resetForm()
            }


        } else {
            setError({
                status: true, msg: "All Fields are required", type: 'error'
            })

        }
    }
    return (
        <>

            <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'error.light', padding: 2, fontWeight: 'bold' }} >

                <Typography sx={{ fontWeight: 'bold', color: 'blue' }} variant='h2' component='div'>Resume Uploader</Typography>

            </Box>
            <Grid container justifyContent="content" >
                    <li> 
                <span>please click here for</span> 
                <Link to="/candidate_info">CandidateInfo</Link> 
                </li> 
                <Grid justifyContent="center">
                    <h1>Form</h1>
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
                                <MenuItem value='Jharkhand'>Jharkhand</MenuItem>
                                <MenuItem value='BIHAR'>BIHAR</MenuItem>
                                <MenuItem value='JOKER'>JOKER</MenuItem>
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

export default CandidateForm

