import { STUDENT_LOGIN, COMPANY_LOGIN, BACKEND_URL } from './actionConstants';
import axios from 'axios';

export function login(payload) {
  return (dispatch) => {
    let url = payload.profile===STUDENT_LOGIN ? BACKEND_URL+'login/student' : BACKEND_URL+'login/company';
    axios.defaults.withCredentials = true;
    let profileType = payload.profile===COMPANY_LOGIN ? COMPANY_LOGIN : STUDENT_LOGIN;
    let data = {}
    //make a post request with the user data
    axios.post(url, payload)
        .then(response => {
            let data = {
              email : payload.email
            };
            if(payload.profile===STUDENT_LOGIN){
            let url = BACKEND_URL+'student/getStudentProfile';
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(url,data)
            .then(response => {
              localStorage.setItem("name",response.data.student.name);
              localStorage.setItem("id",response.data.student._id);
              alert("getStudentProfile response:"+JSON.stringify(response.data.student));
            }).catch(err => {
              alert("inside error getStudentProfile");
            });
          }
          else{
            let url = BACKEND_URL+'company/getCompanyProfileKafka';
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post(url,data)
            .then(response => {
              localStorage.setItem("name",response.data.company.name);
              localStorage.setItem("id",response.data.company._id);
              alert("getCompanyProfileKafka response:"+JSON.stringify(response.data.company));
            }).catch(err => {
              alert("inside error getStudentProfile");
            });
          }
            localStorage.setItem("profile",payload.profile)
            localStorage.setItem("email",payload.email)
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("user",response.data.userName)
            localStorage.setItem("userId",response.data.userId)
            localStorage.setItem("major",response.data.major)
            
            data.userName = response.data.userName
            data.isSuccess = true
            dispatch({type: profileType, payload: data});
        }).catch(err => {
          data.isSuccess = false
          dispatch({type: profileType, payload: data});
    });
  }  
}