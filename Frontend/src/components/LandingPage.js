import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from './Navbar/Navbar';
import StudentHome from './Home/StudentHome';
import './LandingPage.css';

class LandingPage extends Component {
    render(){
        return (
        
        <div><Navbar/><h2>Find your dream job!</h2></div>
        );
    }
}

export default LandingPage;