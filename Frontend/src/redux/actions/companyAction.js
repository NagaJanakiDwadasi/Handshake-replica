import {GET_COMPANY_DETAILS, GET_ALL_STUDENTS,UPDATE_APPLICATION_STATUS, UPDATE_COMPANY_LOCATION, UPDATE_COMPANY_NAME, UPDATE_COMPANY_CONTACT, UPDATE_COMPANY_DESCRIPTION, CREATE_EVENT, GET_COMPANY_EVENTS, GET_REGISTRATIONS, BACKEND_URL} from './actionConstants';
import axios from 'axios';

export function getCompanyDetails(payload) {
    return (dispatch) => {
      let url = BACKEND_URL+'company/detailsKafka/'+payload;
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {}
    axios.get(url)
        .then(response => {
            dispatch({type: GET_COMPANY_DETAILS, payload: response.data});
        }).catch(err => {
          dispatch({type: GET_COMPANY_DETAILS, payload: {}});
    });
   }  
  }

  export function getAllStudents(payload) {
    alert("inside getAllStudents");
    return (dispatch) => {
      let url = BACKEND_URL+'students/getAllStudentsKafka';
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.get(url)
        .then(response => {
            alert("getAllStudentsKafka::"+JSON.stringify(response.data));
            dispatch({type: GET_ALL_STUDENTS, payload: response.data});
        }).catch(err => {
          dispatch({type: GET_ALL_STUDENTS, payload: {}});
    });
   }  
  }


  export function updateApplicationStatus(payload) {
    //alert("inside updateApplicationStatus");
    return (dispatch) => {
      let url = BACKEND_URL+'company/updateApplicationStatusKafka';
      axios.defaults.withCredentials = true;
      var data={}
      axios.put(url,payload, {headers : {"Content-Type": "application/json"}})
          .then(response => {
              data = { ...payload, isSuccess: true}
              dispatch({type: UPDATE_APPLICATION_STATUS, payload: response.data.jobApplication});
          }).catch(err => {
              data = { ...payload, isSuccess: false}
            dispatch({type: UPDATE_APPLICATION_STATUS, payload: data});
      });
    }  
  }

  export function updateCompanyName(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'company/updateCompanyName/'+id;
      axios.defaults.withCredentials = true;
      var data={}
      axios.put(url,{data: payload}, {headers : {"Content-Type": "application/json"}})
          .then(response => {
              data = { ...payload, isSuccess: true}
              dispatch({type: UPDATE_COMPANY_NAME, payload: data});
          }).catch(err => {
              data = { ...payload, isSuccess: false}
            dispatch({type: UPDATE_COMPANY_NAME, payload: data});
      });
    }  
  }

  export function updateCompanyContact(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'company/updateCompanyContact/'+id;
      axios.defaults.withCredentials = true;
      var data={}
      axios.put(url,{data: payload}, {headers : {"Content-Type": "application/json"}})
          .then(response => {
              data = { ...payload, isSuccess: true}
              dispatch({type: UPDATE_COMPANY_CONTACT, payload: data});
          }).catch(err => {
              data = { ...payload, isSuccess: false}
            dispatch({type: UPDATE_COMPANY_CONTACT, payload: data});
      });
    }  
  }

  export function updateCompanyLocation(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'company/updateCompanyLocation/'+id;
      axios.defaults.withCredentials = true;
      var data={}
      axios.put(url,{data: payload}, {headers : {"Content-Type": "application/json"}})
          .then(response => {
              data = { ...payload, isSuccess: true}
              dispatch({type: UPDATE_COMPANY_LOCATION, payload: data});
          }).catch(err => {
            data = { ...payload, isSuccess: false}
            dispatch({type: UPDATE_COMPANY_LOCATION, payload: data});
      });
    }  
  }

  export function updateCompanyDescription(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'company/updateCompanyDescription/'+id;
      axios.defaults.withCredentials = true;
      var data={}
      axios.put(url,{data: payload}, {headers : {"Content-Type": "application/json"}})
          .then(response => {
              data = { ...payload, isSuccess: true}
              dispatch({type: UPDATE_COMPANY_DESCRIPTION, payload: data});
          }).catch(err => {
              data = { ...payload, isSuccess: false}
            dispatch({type: UPDATE_COMPANY_DESCRIPTION, payload: data});
      });
    }  
  }

  export function createEvent(payload) {
    let id = localStorage.getItem('userId');
    return (dispatch) => {
      let url = BACKEND_URL+'company/createEvent/'+id;
      axios.defaults.withCredentials = true;
      axios.post(url,payload)
          .then(response => {
              dispatch({type: CREATE_EVENT, payload: response.data});
          }).catch(err => {
            dispatch({type: CREATE_EVENT, payload: {}});
      });
     }  
    }
  
    export function getEvents(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'company/getEvents/'+payload;
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.get(url)
          .then(response => {
              dispatch({type: GET_COMPANY_EVENTS, payload: response.data});
          }).catch(err => {
            dispatch({type: GET_COMPANY_EVENTS, payload: {}});
      });
     }  
    }

    export function getRegistrations(payload) {
      return (dispatch) => {
        let url = BACKEND_URL+'company/getRegistrations/'+payload;
        axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.get(url)
          .then(response => {
            dispatch({type: GET_REGISTRATIONS, payload: response.data});
          }).catch(err => {
            dispatch({type: GET_REGISTRATIONS, payload: {}});
      });
     }  
    }