import { GET_STUDENT_EXPERIENCE,GET_STUDENT_EDUCATION,GET_STUDENT_SKILLSET,GET_STUDENT_CONTACTINFO,GET_STUDENT_ADDRESS,GET_STUDENT_OBJECTIVE,GET_STUDENT_PICTURE,GET_STUDENT_PROFILE, BACKEND_URL} from './actionConstants';
import axios from 'axios';

export function getStudentExperienceDetails(payload) {
    return (dispatch) => {
      let url = BACKEND_URL+'student/fetchStudentExperienceDetails/'+payload;
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    var data={}
    axios.get(url, payload)
        .then(response => {
            dispatch({type: GET_STUDENT_EXPERIENCE, payload: response.data});
        }).catch(err => {
          dispatch({type: GET_STUDENT_EXPERIENCE, payload: {}});
    });
  }  
}

export function getStudentEducationDetails(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetEducation/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  let data = {}
  axios.get(url)
      .then(response => {
          dispatch({type: GET_STUDENT_EDUCATION, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_EDUCATION, payload: {}});
  });
 }  
}

export function getStudentAddressDetails(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetStudentAddress/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  let data = {}
  axios.get(url)
      .then(response => {
          dispatch({type: GET_STUDENT_ADDRESS, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_ADDRESS, payload: {}});
  });
 }  
}

export function getStudentObjectiveDetails(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetObjective/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
    axios.get(url, payload)
      .then(response => {
          dispatch({type: GET_STUDENT_OBJECTIVE, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_OBJECTIVE, payload: {}});
  });
 }  
}


export function getStudentSkillSetDetails(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetSkillSet/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url, payload)
      .then(response => {
          dispatch({type: GET_STUDENT_SKILLSET, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_SKILLSET, payload: {}});
  });
 }  
}

export function getStudentPicture(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profilePicture/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url)
      .then(response => {
          var imageURL = 'data:image/png;base64,' + response.data;
          dispatch({type: GET_STUDENT_PICTURE, payload: imageURL});
      }).catch(err => {
        dispatch({type: GET_STUDENT_PICTURE, payload: {}});
  });
 }  
}

export function getContactInfo(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'student/getContactInfo/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url)
      .then(response => {
          dispatch({type: GET_STUDENT_CONTACTINFO, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_CONTACTINFO, payload: {}});
  });
 }  
}


export function getStudentProfile(payload) {
  alert("inside getStudentProfile::"+JSON.stringify(payload));
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/getStudentProfile';
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.post(url,payload)
      .then(response => {
         alert("getStudentProfile response:"+JSON.stringify(response.data.student));
          dispatch({type: GET_STUDENT_PROFILE, payload: response.data.student});
      }).catch(err => {
        dispatch({type: GET_STUDENT_PROFILE, payload: {}});
  });
 }  
}
