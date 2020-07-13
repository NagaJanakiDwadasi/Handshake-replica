import {combineReducers} from 'redux';
import signupReducer from './signupReducer';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import studentProfileReducer from './studentProfileReducer';
import jobReducer from './jobReducer';
import companyReducer from './companyReducer';
import messagesReducer from './messagesReducer';

const allReducers = combineReducers(
    {
        signupReducer : signupReducer,
        loginReducer : loginReducer,
        logoutReducer : logoutReducer,
        studentProfileReducer: studentProfileReducer,
        jobReducer : jobReducer,
        companyReducer : companyReducer,
        messagesReducer : messagesReducer
    }
);

export default allReducers;