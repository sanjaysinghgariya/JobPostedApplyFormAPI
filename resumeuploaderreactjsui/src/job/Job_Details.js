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

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { format } from 'date-fns'
import { useSaveProfileMutation } from '../services/CandidateProfileAPI';
import Navbar from './Navbar';




const Job_Details = () => {
    const [jobinfo, setjobinfo] = useState(null);
    const { id } = useParams()
    const { data, isSuccess } = useGetSingleJobProfileQuery(id)



    useEffect(() => {
        if (data && isSuccess) {
            setjobinfo(data)
        }
    }, [data, isSuccess])



  return (
    <>
    <Navbar />
    <div> Job details</div>
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





    
    
    
    </>
  )
}

export default Job_Details