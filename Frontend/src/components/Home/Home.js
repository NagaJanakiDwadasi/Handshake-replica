import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import Navbar from '../Navbar/Navbar';
import "./../LandingPage.css";
import StudentHome from './StudentHome';
import CompanyHome from './CompanyHome';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//import {browserHistory} from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
    }


    render(){
        let redirectPage = null;
        if(localStorage.getItem('profile')==='student'){
            redirectPage = <Redirect to="/studentHome" />
        }
        else{
            redirectPage = <Redirect to="/companyHome" />
        }
        return (
            <div>
                {redirectPage}
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
       profile: state.loginReducer.profile,
       userName: state.loginReducer.userName
    }
}

export default connect(mapStateToProps, null)(Home);