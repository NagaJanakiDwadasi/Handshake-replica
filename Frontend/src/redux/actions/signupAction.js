import { STUDENT_SIGNUP, COMPANY_SIGNUP, BACKEND_URL } from './actionConstants';
import axios from 'axios';

export function signup(payload) {
  return (dispatch) => {
    let url = payload.profile==='student' ? BACKEND_URL+'signUp/student' : BACKEND_URL+'signUp/company';
    axios.defaults.withCredentials = true;
    let profileType = payload.profile==='company' ? COMPANY_SIGNUP : STUDENT_SIGNUP;
    //make a post request with the user data
    axios.post(url, payload)
        .then(response => {
              dispatch({type: profileType, payload: true});
        }).catch(err => {
          dispatch({type: profileType, payload: false});
    });
  }  
}