import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {logout} from './../../redux/actions/logoutAction';
//import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';


class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout=this.handleLogout.bind(this)
    }
    handleLogout = () => {
        //cookie.remove('cookie', { path: '/' })
        localStorage.removeItem('email');
        localStorage.removeItem('profile');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('major');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        this.props.logout("logout") 
    }
    render(){
        let navbar = null;
        navbar=(
            <ul className="nav navbar-nav">
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/signup">SignUp</NavLink></li>
            </ul>
        )
        if(localStorage.getItem('email') && localStorage.getItem('profile')==='student')
        {
            navbar=(
                <ul className="nav navbar-nav">
                    <li><NavLink to="/logout" onClick = {this.handleLogout}>Logout</NavLink></li>
                    <li><NavLink to="/home" >Home</NavLink></li>
                    <li><NavLink to="/studentApplications" >Applications</NavLink></li> 
                    <li><NavLink to="/studentEvents" >Events</NavLink></li>
                    <li><NavLink to="/students" >Students</NavLink></li>
                    <li><NavLink to="/student" >My Profile</NavLink></li>
                    <li><NavLink to="/messages" >Messages</NavLink></li>
                </ul>
            )
            
        }
        else if(localStorage.getItem('email')){
            navbar=(
                <ul className="nav navbar-nav">
                    <li><NavLink to="/logout" onClick = {this.handleLogout}>Logout</NavLink></li>
                    <li><NavLink to="/home" >Home</NavLink></li>
                    <li><NavLink to="/company" >My Profile</NavLink></li>
                    <li><NavLink to="/students" >Students</NavLink></li>
                    <li><NavLink to="/companyEvents" >Events</NavLink></li>
                    <li><NavLink to="/messages" >Messages</NavLink></li>
                </ul>
            )
        }
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">HandShake</a>
                        </div>
                        {navbar}
                    </div>
                </nav>
            </div>
  
        );
    }
}

//export default Navbar;
export default connect(null, {logout})(Navbar);