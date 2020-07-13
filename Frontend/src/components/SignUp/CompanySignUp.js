import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {signup} from './../../redux/actions/signupAction';

//regex for form validations
const nameRegex = RegExp('^[a-zA-Z \s]*$');
const passwordRegex = RegExp('^[a-zA-Z0-9@!#$%^&*\s]*$');
const emailRegex = RegExp('');
const locationRegex = RegExp('^[a-zA-Z0-9 ,-\s]*$');

class CompanySignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {
                name: null,
                email: null,
                password: null,
                location: null,
                profile: 'company'
            },
            nameerror: "",
            emailerror:"",
            passworderror:"",
            weakpassworderror: "",
            locationerror:""
        };
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.locationChangeHandler = this.locationChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    nameChangeHandler = (event) => {
        this.setState(
            {
                user : {...this.state.user, name : event.target.value},
                nameerror : nameRegex.test(event.target.value) ? "" : "Company Name can only contain letters and spaces!"
            }
        )
    }
    passwordChangeHandler = (event) => {
        this.setState(
            {
                user  : {...this.state.user, password : event.target.value},
                passworderror : passwordRegex.test(event.target.value) ? "" : "Password can only contain letters, numbers and !@#$%^&*",
                weakpassworderror: event.target.value.length < 6 ? "Password is weak!" : ""
            }
        )
    }
    emailChangeHandler = (event) => {
        this.setState(
            {
                user: {...this.state.user, email : event.target.value},
                emailerror : emailRegex.test(event.target.value) ? "" : "Email is invalid!"
            }
        )
    }
    locationChangeHandler = (event) => {
        this.setState(
            {
                user  : {...this.state.user, location : event.target.value},
                locationerror : locationRegex.test(event.target.value) ? "" : "Location can only contain letters, numbers, spaces and ,-!"
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signup(this.state.user)     
    }

    render(){
       const { user } = this.state;
       let redirectVar = null;
       if (this.props.signupStatus) {
            redirectVar = <Redirect to="/login" />
        }
        return (
        <div>
            {redirectVar}
            <div class="container">
                <div class="signup-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Company SignUp</h2>
                        </div> 
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="company" placeholder="Company Name" value={user.name} />
                                <p style={{ color: "red" }}>{this.state.nameerror}</p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email Id" value={user.email}/>
                                <p style={{ color: "red" }}>{this.state.emailerror}</p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" value={user.password}/>
                                <p style={{ color: "red" }}>{this.state.weakpassworderror}</p>
                                <p style={{ color: "red" }}>{this.state.passworderror}</p>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.locationChangeHandler} type="text" class="form-control" name="location" placeholder="Location" value={user.location}/>
                                <p style={{ color: "red" }}>{this.state.locationerror}</p>
                            </div>
                            <button class="btn btn-primary">SignUp</button>   
                        </form>  
                    </div>
                </div>
            </div>  
        </div>
        );
    }
}

function mapStateToProps (state) {
     return {
        signupStatus : state.signupReducer.result
     }
}
// function mapDispatchToProps(dispatch) {
//     return {
//         signup: data => dispatch(signup(data))
//     };
// }

export default connect(mapStateToProps, {signup})(CompanySignUp);