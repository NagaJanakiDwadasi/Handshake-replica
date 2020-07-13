import { Redirect } from "react-router-dom";
import axios from 'axios';
import { STUDENT_LOGIN, COMPANY_LOGIN } from './../actions/actionConstants';

function loginReducer (state = {}, action)  {
   if(action.type===STUDENT_LOGIN || action.type===COMPANY_LOGIN){
        return {
            ...state,
            result: action.payload.isSuccess,
            userName: action.payload.userName,
            profile: action.type
        }
   }
   return state;    
  }
  
export default loginReducer;