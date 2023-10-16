
import { BrowserRouter as Router,Routes, Route, Link, Navigate } from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom';


import { useSelector } from 'react-redux';
import CandidateProfile from './auth/CandidateProfile';
import CandidateStatus from './auth/CandidateStatus';
import CandidateForm from './auth/CandidateForm';
import JobPosting from './job/JobPosting';
import JobPostingAPI from './job/JobPostingAPI';
import JobDetail from './job/JobDetail';
import JobCandidateInfo from './job/JobCandidateInfo';
import Job_Details from './job/Job_Details';
import Navbar from './job/Navbar';




function App() {
  return (
    <>
      
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobPostingAPI />} >
        </Route>
        <Route path="/candidate_info" element={<CandidateStatus />} >
        </Route>
        <Route path="/job_info" element={<JobPostingAPI />} > 
        </Route>
        <Route path="/jobinfo/:id" element={<JobDetail />} > 
        </Route>
        <Route path="/jobcandidate" element={<JobCandidateInfo />} > 
        </Route>

        <Route path="/job_info/:id" element={<Job_Details />} > 
        </Route>


        <Route path="/navbar" element={<Navbar />} > 
        </Route>

     


      </Routes>
      </BrowserRouter>

       

    </>
  );
}

export default App;
