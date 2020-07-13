import { GET_MESSAGES,POST_MESSAGE} from './../actions/actionConstants';

function messagesReducer (state = {}, action)  {
  switch(action.type){
    case GET_MESSAGES:
        return  {
            ...state,
            result: action.payload,
            isLoading : true
        }
    case POST_MESSAGE:
        return  {
            ...state,
            result: action.payload,
            isLoading : true
        }
    default:
         return state;   
  }
}
  
export default messagesReducer;