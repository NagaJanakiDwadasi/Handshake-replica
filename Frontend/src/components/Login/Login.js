import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../Navbar/Navbar';
import "./../LandingPage.css";
import StudentLogin from './StudentLogin';
import CompanyLogin from './CompanyLogin';
import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showCompanyLogin: false,
          showStudentLogin: false,
          displayForm: false
        };
        this.onStudentButtonClick = this.onStudentButtonClick.bind(this);
        this.onCompanyButtonClick = this.onCompanyButtonClick.bind(this);
    }
    onStudentButtonClick() {
        this.setState({
            showStudentLogin: true,
            displayForm : true
        });
    }
    onCompanyButtonClick() {
        this.setState({
            showCompanyLogin: true,
            displayForm: true
        });
    }
    render(){
        return (
            
            <div>
                <Navbar/>
                <div className='split left'>
                    <div className="centered">
                        {this.props.signupStatus && this.props.profile==='company' && !this.state.displayForm && <p style={{ color: "green", fontSize: 20 }}>Registration Successful! Please login.</p>}
                        {!this.state.displayForm && !this.state.showCompanyLogin && <h3>Company Login</h3>}
                        {!this.state.displayForm && !this.state.showCompanyLogin && <button onClick={this.onCompanyButtonClick} class="btn btn-success">Company Login</button>} 
                    </div>
                </div>
                <div className='split right'>
                    <div className="centered">
                        {this.props.signupStatus && this.props.profile==='student' && !this.state.displayForm &&  <p style={{ color: "green", fontSize: 20 }}>Registration Successful! Please login.</p>}
                        {!this.state.displayForm && !this.state.showStudentLogin && <h3>Student Login</h3>}
                        {!this.state.displayForm && !this.state.showStudentLogin && <button onClick={this.onStudentButtonClick} class="btn btn-success">Student Login</button>}  
                    </div>
                </div> 
                {this.state.showCompanyLogin &&  <div className="centered"><CompanyLogin/></div>}
                {this.state.showStudentLogin &&  <div className="centered"><StudentLogin/></div>}      
            </div>
            
        );
    }
}

function mapStateToProps (state) {
    return {
       signupStatus : state.signupReducer.result,
       profile: state.signupReducer.profile
    }
}

export default connect(mapStateToProps, null)(Login);
//export default Login;