import { Redirect } from "react-router-dom";
import { STUDENT_SIGNUP, COMPANY_SIGNUP} from './../actions/actionConstants';
import axios from 'axios';

function signupReducer (state = {}, action)  {
   if(action.type===STUDENT_SIGNUP || action.type===COMPANY_SIGNUP){
        return {
            ...state,
            result: action.payload,
            profile: action.type
        }
   }
   return state;    
  }
  
export default signupReducer;