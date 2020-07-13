import { GET_COMPANY_DETAILS, GET_ALL_STUDENTS,UPDATE_APPLICATION_STATUS, UPDATE_COMPANY_NAME, UPDATE_COMPANY_CONTACT, UPDATE_COMPANY_LOCATION, UPDATE_COMPANY_DESCRIPTION, CREATE_EVENT, GET_COMPANY_EVENTS, GET_REGISTRATIONS} from './../actions/actionConstants';

function companyReducer (state = {}, action)  {
    switch(action.type){
        case GET_COMPANY_DETAILS:
            return  {
                ...state,
                companyDetails: action.payload
        }
        case GET_ALL_STUDENTS:
            return  {
                ...state,
                allStudents: action.payload
        }
        case UPDATE_APPLICATION_STATUS:
            return  {
                ...state,
                applicationStatus: action.payload,
                updatedApplStatusFlag : action.payload.isSuccess
        }
        case UPDATE_COMPANY_NAME:
            return  {
                ...state,
                name: action.payload,
                updatedNameFlag : action.payload.isSuccess
        }
        case UPDATE_COMPANY_CONTACT:
            return  {
                ...state,
                contact: action.payload,
                updatedContactFlag : action.payload.isSuccess
        }
        case UPDATE_COMPANY_LOCATION:
            return  {
                ...state,
                location: action.payload,
                updatedLocationFlag : action.payload.isSuccess
        }
        case UPDATE_COMPANY_DESCRIPTION:
            return  {
                ...state,
                description: action.payload,
                updatedDescriptionFlag : action.payload.isSuccess
        }
        case CREATE_EVENT:
            return  {
                ...state,
                events: action.payload
        }
        case GET_COMPANY_EVENTS:
            return  {
                ...state,
                events: action.payload
        }
        case GET_REGISTRATIONS:
            return  {
                ...state,
                registrations: action.payload
        }
        default:
             return state;   
    }       
}
  
export default companyReducer;