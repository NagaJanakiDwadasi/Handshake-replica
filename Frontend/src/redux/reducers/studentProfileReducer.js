import { GET_STUDENT_PROFILE,GET_STUDENT_EXPERIENCE,GET_STUDENT_EDUCATION,GET_STUDENT_SKILLSET,GET_STUDENT_CONTACTINFO,GET_STUDENT_ADDRESS,GET_STUDENT_OBJECTIVE,GET_STUDENT_PICTURE,UPDATE_STUDENT_OBJECTIVE,UPDATE_STUDENT_SKILLSET,UPDATE_STUDENT_EDUCATION,UPDATE_STUDENT_EXPERIENCE, GET_STUDENT_EVENTS, GET_EVENT_DETAILS, GET_REGISTERED_EVENTS,STUDENT_REGISTER_EVENT, UPDATE_STUDENT_CITY, UPDATE_STUDENT_STATE, UPDATE_STUDENT_COUNTRY} from '../actions/actionConstants';

function getStudentProfileReducer (state = {}, action)  {
    switch(action.type){
        case GET_STUDENT_PROFILE:
            return  {
                ...state,
                student: action.payload
            }
        case GET_STUDENT_EDUCATION:
            return  {
                ...state,
                education: action.payload
            }
        case GET_STUDENT_EXPERIENCE:
            alert(JSON.stringify(action.payload));
            return {
                ...state,
                studentExperience: action.payload,
                isLoading : true
        }
        case GET_STUDENT_ADDRESS:
            return {
                ...state,
                studentAddress: action.payload
        }
        case GET_STUDENT_CONTACTINFO:
            return {
                ...state,
                contactInfo: action.payload
        }
        case GET_STUDENT_OBJECTIVE:
            return {
                ...state,
                objective: action.payload
        }
        case GET_STUDENT_SKILLSET:
            return {
                ...state,
                student: action.payload,
                isLoading : true
        }
        case GET_STUDENT_PICTURE:
            return {
                ...state,
                picture: action.payload
        }
        case UPDATE_STUDENT_OBJECTIVE:
            alert("updatestudentobjective reducer::"+JSON.stringify(action.payload));
            return {
                ...state,
                student: action.payload,
                isLoading: true
        }
        case UPDATE_STUDENT_CITY:
            return {
                ...state,
                student: action.payload
        }
        case UPDATE_STUDENT_STATE:
            return {
                ...state,
                state: action.payload
        }
        case UPDATE_STUDENT_COUNTRY:
            return {
                ...state,
                country: action.payload
        }
        case UPDATE_STUDENT_SKILLSET:
            return {
                ...state,
                result: action.payload
        }
        case UPDATE_STUDENT_EXPERIENCE:
            alert("payload::"+JSON.stringify(action.payload));
            return {
                ...state,
                updateExperience: action.payload.experience,
                updateFlag: action.payload.isSuccess,
                isLoading : true
        }
        case GET_STUDENT_EVENTS:
            return {
                ...state,
                studentEvents: action.payload
        }
        case GET_EVENT_DETAILS:
            return {
                ...state,
                eventDetails: action.payload
        }
        case GET_REGISTERED_EVENTS:
            return {
                ...state,
                registeredEvents: action.payload
        }
        case STUDENT_REGISTER_EVENT:
            return {
                ...state,
                studentEventRegistered: action.payload
        }
        case UPDATE_STUDENT_EDUCATION:
            alert("status::"+action.payload.isSuccess);
            return  {
                ...state,
                updateEducation: action.payload,
                updateEduFlag:action.payload.isSuccess

            }
        default:
             return state;   
    }    
  }
  
export default getStudentProfileReducer;