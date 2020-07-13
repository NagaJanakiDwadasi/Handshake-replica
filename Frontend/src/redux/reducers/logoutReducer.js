import {LOGOUT} from './../actions/actionConstants';

function logoutReducer (state = {}, action)  {
   if(action.type===LOGOUT){
        return {};    
    }
    return state; 
}
export default logoutReducer;