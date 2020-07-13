import { GET_STUDENT_PROFILE,GET_STUDENT_EXPERIENCE,GET_STUDENT_EDUCATION,GET_STUDENT_SKILLSET,GET_STUDENT_CONTACTINFO,GET_STUDENT_ADDRESS,GET_STUDENT_OBJECTIVE,GET_STUDENT_PICTURE,UPDATE_STUDENT_OBJECTIVE,UPDATE_STUDENT_SKILLSET,UPDATE_STUDENT_EDUCATION,UPDATE_STUDENT_EXPERIENCE, GET_STUDENT_EVENTS, GET_EVENT_DETAILS, GET_REGISTERED_EVENTS,STUDENT_REGISTER_EVENT, BACKEND_URL, UPDATE_STUDENT_CITY, UPDATE_STUDENT_STATE, UPDATE_STUDENT_COUNTRY} from './actionConstants';
import axios from 'axios';

export function getStudentExperienceDetails(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'student/fetchStudentExperienceDetails/'+id;
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
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetEducation/'+id;
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
    let url = BACKEND_URL+'student/profileGetStudentAddress/'+id;
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
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileGetObjective/'+id;
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
    let url = BACKEND_URL+'student/profileGetSkillSet/'+id;
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
    let url = BACKEND_URL+'student/profilePicture/'+id;
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

export function updateStudentExperience(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateExperience/'+id;
    url = BACKEND_URL+'student/updateKafka';
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  var data={}
  axios.put(url, payload)
      .then(response => {
        alert("action data::"+JSON.stringify(response));
          data = { ...response, isSuccess: true}
          dispatch({type: UPDATE_STUDENT_EXPERIENCE, payload: data});
      }).catch(err => {
          data = { ...payload, isSuccess: false}
        dispatch({type: UPDATE_STUDENT_EXPERIENCE, payload: data});
  });
 }  
}



export function updateStudentEducation(payload) {
  alert("updateStudentEducation:"+JSON.stringify(payload));
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateEducation/'+id;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  var data={}
  axios.put(url, payload)
      .then(response => {
        alert(JSON.stringify(response));
          data = { ...payload, isSuccess: true}
          dispatch({type: UPDATE_STUDENT_EDUCATION, payload: data});
      }).catch(err => {
          data = { ...payload, isSuccess: false}
        dispatch({type: UPDATE_STUDENT_EDUCATION, payload: data});
  });
 }  
}



export function updateStudentObjective(payload) {
  alert("updateStudentObjective::"+JSON.stringify(payload));
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateObjective';
    alert("url::"+url);
    axios.defaults.withCredentials = true;
    var data={}
    axios.put(url,{objective: payload}, {headers : {"Content-Type": "application/json"}})
        .then(response => {
          alert("updateStudentObjective success::"+JSON.stringify(response));
            data = { ...response, isSuccess: true}
            dispatch({type: UPDATE_STUDENT_OBJECTIVE, payload: data});
        }).catch(err => {
          alert("updateStudentObjective failure::"+err);
            data = { ...payload, isSuccess: false}
          dispatch({type: UPDATE_STUDENT_OBJECTIVE, payload: data});
    });
  }  
}

export function updateStudentCity(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateCity';
    axios.defaults.withCredentials = true;
    var data={}
    axios.put(url,{city: payload}, {headers : {"Content-Type": "application/json"}})
        .then(response => {
            data = { ...payload, isSuccess: true}
            dispatch({type: UPDATE_STUDENT_CITY, payload: data});
        }).catch(err => {
            data = { ...payload, isSuccess: false}
          dispatch({type: UPDATE_STUDENT_CITY, payload: data});
    });
  }  
}

export function updateStudentState(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateState/'+id;
    axios.defaults.withCredentials = true;
    var data={}
    axios.put(url,{state: payload}, {headers : {"Content-Type": "application/json"}})
        .then(response => {
            data = { ...payload, isSuccess: true}
            dispatch({type: UPDATE_STUDENT_STATE, payload: data});
        }).catch(err => {
            data = { ...payload, isSuccess: false}
          dispatch({type: UPDATE_STUDENT_STATE, payload: data});
    });
  }  
}

export function updateStudentCountry(payload) {
  let id = localStorage.getItem('userId');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateCountry/'+id;
    axios.defaults.withCredentials = true;
    var data={}
    axios.put(url,{country: payload}, {headers : {"Content-Type": "application/json"}})
        .then(response => {
            data = { ...payload, isSuccess: true}
            dispatch({type: UPDATE_STUDENT_COUNTRY, payload: data});
        }).catch(err => {
            data = { ...payload, isSuccess: false}
          dispatch({type: UPDATE_STUDENT_COUNTRY, payload: data});
    });
  }  
}


export function updateStudentSkillSet(payload) {
  let email = localStorage.getItem('email');
  return (dispatch) => {
    let url = BACKEND_URL+'student/profileUpdateSkillSet';
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    var data={}
    axios.put(url,{skillSet: payload}, {headers : {"Content-Type": "application/json"}})
        .then(response => {
            data = { ...payload, isSuccess: true}
            dispatch({type: UPDATE_STUDENT_SKILLSET, payload: data});
        }).catch(err => {
            data = { ...payload, isSuccess: false}
          dispatch({type: UPDATE_STUDENT_SKILLSET, payload: data});
    });
  }  
}

export function getAllEvents(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'students/getAllEvents';
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url)
      .then(response => {
          dispatch({type: GET_STUDENT_EVENTS, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_STUDENT_EVENTS, payload: {}});
  });
 }  
}

export function getEventDetails(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'students/getEventDetails/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url)
      .then(response => {
          dispatch({type: GET_EVENT_DETAILS, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_EVENT_DETAILS, payload: {}});
  });
 }  
}

export function getRegisteredEvents(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'students/getRegisteredEvents/'+payload;
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  axios.get(url)
      .then(response => {
        dispatch({type: GET_REGISTERED_EVENTS, payload: response.data});
      }).catch(err => {
        dispatch({type: GET_REGISTERED_EVENTS, payload: {}});
  });
 }  
}


export function registerEvents(payload) {
  return (dispatch) => {
    let url = BACKEND_URL+'students/registerEvent';
    axios.defaults.withCredentials = true;
  //make a post request with the user data
  let data = {}
  axios.post(url,payload)
      .then(response => {
        if(response.status == 201){	
                  alert("Already applied!");
                  //studentEventRegistered = '';
             }
             else if(response.status == 200){
                 alert("Applied successfully!")
             }
          dispatch({type: STUDENT_REGISTER_EVENT, payload: response.status});
      }).catch(err => {
        dispatch({type: STUDENT_REGISTER_EVENT, payload: {}});
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
