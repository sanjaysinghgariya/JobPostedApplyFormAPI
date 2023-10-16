import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom'



import React from 'react'
import { Link } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            MyJobPortal.com
                        </Typography>

                        <Button component={NavLink} to='/jobcandidate' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white' }}>CandidateInfo</Button>
                        <Button component={NavLink} to='/job_info' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white' }}>JobInfo</Button>


                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default Navbar