import React,{Component} from 'react';
import Navbar from '../Navbar/Navbar';
import "./../LandingPage.css";
import {connect} from 'react-redux';

class Logout extends Component {
    render(){
        return (
            <div>
                <Navbar/>
                <h1>Logout Successful</h1>
                <a href="/">Login again </a>
            </div>
        );
    }
}

export default Logout;