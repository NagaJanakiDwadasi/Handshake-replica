import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './LandingPage';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Logout from './Logout/Logout';
import StudentHome from './Home/StudentHome';
import CompanyHome from './Home/CompanyHome';
import StudentProfile from './Profiles/Student';
import CompanyProfile from './Profiles/Company';
import StudentApplications from './StudentTabs/applications';
import StudentEvents from './StudentTabs/events';
import Students from './students';
import JobApplication from './StudentTabs/JobApplications';
import CompanyView from './Profiles/CompanyView';
import StudentView from './Profiles/StudentView';
import CompanyEvents from './CompanyTabs/CompanyEvents';
import ViewRegistrations from './CompanyTabs/ViewRegistrations';
import EventView from './StudentTabs/EventView';
import RegisteredEvents from './StudentTabs/RegisteredEvents';
import Messages from './Messages/messages';

class Main extends Component {
    render(){
        return (
                <div className="bgimg"> 
                    <Route exact path="/" component={LandingPage}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>    
                    <Route path="/logout" component={Logout}/>   
                    <Route path="/studentHome" component={StudentHome}/> 
                    <Route path="/companyHome" component={CompanyHome}/> 
                    <Route path="/student" component={StudentProfile}/> 
                    <Route path="/company" component={CompanyProfile}/> 
                    <Route path="/studentApplications" component={StudentApplications}/> 
                    <Route path="/studentEvents" component={StudentEvents}/> 
                    <Route path="/students" component={Students}/> 
                    <Route path="/viewJobApplications/:job/:jobName" component={JobApplication}/> 
                    <Route path="/companyView/:company" component={CompanyView}/> 
                    <Route path="/studentView/:student" component={StudentView}/> 
                    <Route path="/companyEvents" component={CompanyEvents}/> 
                    <Route path="/viewRegistrations/:event/:eventName" component={ViewRegistrations}/> 
                    <Route path="/viewEventDetails/:event" component={EventView}/> 
                    <Route path="/viewRegisteredEvents/:id" component={RegisteredEvents}/> 
                    <Route path="/messages" component={Messages}/> 
                </div>
        )
    }
}

export default Main;