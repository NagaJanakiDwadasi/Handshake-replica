import { JOB_POSTING,GET_JOB_OPENINGS,GET_ALL_JOB_OPENINGS, GET_APPLIED_JOBS, GET_JOB_APPLICATIONS,POST_JOB_APPLICATION} from './../actions/actionConstants';

function jobReducer (state = {}, action)  {
    switch(action.type){
        case GET_JOB_OPENINGS:
            return  {
                ...state,
                jobOpenings: action.payload
            }
        case JOB_POSTING:
            return {
                ...state,
                jobPosting: action.payload
        }
        case GET_ALL_JOB_OPENINGS:
            return {
                ...state,
                allJobOpenings: action.payload
        }
        case GET_APPLIED_JOBS:
            return {
                ...state,
                appliedJobs: action.payload
        }
        case GET_JOB_APPLICATIONS:
            return {
                ...state,
                jobApplications: action.payload
        }
        case POST_JOB_APPLICATION:
            return {
                ...state,
                isApplied: action.payload
        }
        default:
             return state;   
    }       
}
  
export default jobReducer;