import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import Navbar from '../Navbar/Navbar';
import "./../LandingPage.css";
import StudentSignUp from './StudentSignUp';
import CompanySignUp from './CompanySignUp';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showCompanySignUp: false,
          showStudentSignUp: false,
          displayForm: false
        };
        this.onStudentButtonClick = this.onStudentButtonClick.bind(this);
        this.onCompanyButtonClick = this.onCompanyButtonClick.bind(this);
    }
    onStudentButtonClick() {
        this.setState({
            showStudentSignUp: true,
            displayForm : true
        });
    }
    onCompanyButtonClick() {
        this.setState({
            showCompanySignUp: true,
            displayForm : true
        });
    }
    render(){
        return (
            <div>
                <Navbar/>
                <div className='split left'>
                    <div className="centered">
                    {!this.state.displayForm && !this.state.showCompanySignUp && <h3>Company SignUp</h3>}
                    {!this.state.displayForm && !this.state.showCompanySignUp && <button onClick={this.onCompanyButtonClick} class="btn btn-success">Company SignUp</button>}
                    </div>
                </div>
                <div className='split right'>
                    <div className="centered">
                    {!this.state.displayForm && !this.state.showStudentSignUp && <h3>Student SignUp</h3>}
                    {!this.state.displayForm && !this.state.showStudentSignUp && <button onClick={this.onStudentButtonClick} class="btn btn-success">Student SignUp</button>}    
                </div>
                </div>  
                {this.state.showCompanySignUp &&  <div className="centered"><CompanySignUp/></div>}
                {this.state.showStudentSignUp &&  <div className="centered"><StudentSignUp/></div>}     
            </div>
            
        );
    }
}

export default SignUp;