import {POST_JOB_APPLICATION,JOB_POSTING, GET_JOB_OPENINGS,GET_ALL_JOB_OPENINGS, GET_APPLIED_JOBS, GET_JOB_APPLICATIONS, BACKEND_URL} from './actionConstants';
import axios from 'axios';


export function jobPosting(payload) {
    return (dispatch) => {
      let url = BACKEND_URL+'job/openingKafka';
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {}
    axios.post(url,payload)
        .then(response => {
          alert(JSON.stringify(response));
            dispatch({type: GET_JOB_OPENINGS, payload: response.data.job});
        }).catch(err => {
          dispatch({type: GET_JOB_OPENINGS, payload: {}});
    });
   }  
  }

  export function applyJob(payload) {
    alert("inside applyJob");
    return (dispatch) => {
      let url = BACKEND_URL+'job/ApplyJobKafka';
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {}
    axios.post(url,  payload ,{
              headers: { 'content-type': 'multipart/form-data' }
              }).then((result) => {
                alert("result::"+JSON.stringify(result));
               if(result.status === 200){   
                  alert("Upload successful!");
               }else {
                alert("Already applied!");                
               }
               dispatch({type: POST_JOB_APPLICATION, payload: true});
          }).catch((err) => {
              alert("upload failed!")
              dispatch({type: POST_JOB_APPLICATION, payload: false});
          });
    
   }  
  }

  export function getJobOpenings(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'job/allJobOpeningsKafka/'+localStorage.getItem('id');
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.get(url)
          .then(response => {
            alert(JSON.stringify(response));
              dispatch({type: GET_JOB_OPENINGS, payload: response.data.job});
          }).catch(err => {
            dispatch({type: GET_JOB_OPENINGS, payload: {}});
      });
     }  
    }


    export function getAllJobOpenings(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'job/allJobOpeningsKafka';
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      let data = {}
      axios.get(url)
          .then(response => {
              dispatch({type: GET_ALL_JOB_OPENINGS, payload: response.data.job});
          }).catch(err => {
            dispatch({type: GET_ALL_JOB_OPENINGS, payload: {}});
      });
     }  
    }

    export function getAppliedJobs(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'job/getAppliedJobs/'+localStorage.getItem("userId");
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      let data = {}
      axios.get(url)
          .then(response => {
            dispatch({type: GET_APPLIED_JOBS, payload: response.data});
          }).catch(err => {
            dispatch({type: GET_APPLIED_JOBS, payload: {}});
      });
     }  
    }

    export function getJobApplications(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'job/jobOpeningsKafka/'+payload;
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      let data = {}
      axios.get(url)
          .then(response => {
            dispatch({type: GET_JOB_APPLICATIONS, payload: response.data.jobApplication});
          }).catch(err => {
            dispatch({type: GET_JOB_APPLICATIONS, payload: {}});
      });
     }  
    }
  