import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from './../../redux/actions/loginAction';

class StudentLogin extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {
                email: null,
                password: null,
                profile: 'student'
            },
            auth: false
        };
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    passwordChangeHandler = (event) => {
        this.setState(
            {
                user  : {...this.state.user, password : event.target.value},
            }
        )
    }
    emailChangeHandler = (event) => {
        this.setState(
            {
                user: {...this.state.user, email : event.target.value},
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            auth: true
        })
        this.props.login(this.state.user)     
    }

    render(){
        const { user } = this.state;
        let redirectVar = null;
        if (this.props.loginStatus) {
             redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="signup-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Student Login</h2>
                            </div>  
                            <form onSubmit={this.handleSubmit}>                      
                                <div class="form-group">
                                    <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email Id" value={user.email}/>
                                </div>
                                <div class="form-group">
                                    <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" value={user.password}/>
                                </div>
                                <button class="btn btn-primary">Login</button>        
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
       loginStatus : state.loginReducer.result
    }
}

export default connect(mapStateToProps, {login})(StudentLogin);