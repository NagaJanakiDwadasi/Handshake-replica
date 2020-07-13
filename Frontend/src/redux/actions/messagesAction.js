import {BACKEND_URL,GET_MESSAGES,POST_MESSAGE} from './actionConstants';
import axios from 'axios';


export function getAllMessages(payload) {
    return (dispatch) => {
      let url = BACKEND_URL+'student/postKafka/';
      axios.defaults.withCredentials = true;
    //make a post request with the user data
    let data = {
        "user1" : {
          "id" : localStorage.getItem('id'),
          "name" : localStorage.getItem('name')
        }
    }
    axios.post(url,data)
        .then(response => {
            dispatch({type: GET_MESSAGES, payload: response.data.messages});
        }).catch(err => {
          dispatch({type: GET_MESSAGES, payload: {}});
    });
   }  
  }


  export function postMessages(payload) {
    return (dispatch) => {
      let url = BACKEND_URL+'messages/postMessages/';
      axios.defaults.withCredentials = true;
    //make a post request with the message data
    axios.post(url,payload)
        .then(response => {
            alert("post messages response::"+JSON.stringify(response.data));
            dispatch({type: POST_MESSAGE, payload: response.data});
        }).catch(err => {
          dispatch({type: POST_MESSAGE, payload: {}});
    });
   }  
  }  