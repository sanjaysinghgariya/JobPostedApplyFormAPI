import React, { useEffect, useState } from 'react'
import { useGetJobProfileQuery } from '../services/CandidateProfileAPI';




const JobPosting = () => {
    const [job, setJob] = useState(null);
    const {data, isSuccess} = useGetJobProfileQuery()
    console.log(data)

    useEffect(()=>{
        if (data &&  isSuccess){
            setJob(data.job_post)
        }
    },[data, isSuccess])

    console.log(job)

  return (
    <>
    <h1>Hello</h1>
    </>
  )
}

export default JobPosting
