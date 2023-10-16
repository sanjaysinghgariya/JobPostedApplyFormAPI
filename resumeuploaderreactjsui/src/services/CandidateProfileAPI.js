import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CandidateProfileAPI = createApi({
  
  reducerPath: 'CandidateProfileAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),
  endpoints: (builder) => ({
    saveProfile: builder.mutation({
      query: (candidate) => {
        return {
          url: 'resume_info/',
          method: 'POST',
          body: candidate,
        }
      }
    }),

    getResumeProfile: builder.query({
      query: () => {
        return {
          url: 'resume_info/',
          method: 'GET',
        }
      }
    }),

    getJobProfile: builder.query({
      query: () => {
        return {
          url: 'job_info/',
          method: 'GET',
        }
      }
    }),

    getSingleJobProfile: builder.query({
      query: (id) => {
        return {
          url: `jobinfo/${id}`,
          method: 'GET',
          headers:{
            'Content-type':'application/json',
        }
        }
      }
    }),


    getJobApplyForm: builder.mutation({
      query: (data) => {
        return {
          url: 'resume_info1/',
          method: 'POST',
          body: data,
        }
      }
    }),

    getCandidateInfo: builder.query({
      query: () => {
        return {
          url: 'resume_info1/',
          method: 'GET',
        }
      }
    }),




  }),
})


export const { useSaveProfileMutation, useGetResumeProfileQuery, useGetJobProfileQuery, useGetSingleJobProfileQuery, useGetJobApplyFormMutation, useGetCandidateInfoQuery} = CandidateProfileAPI