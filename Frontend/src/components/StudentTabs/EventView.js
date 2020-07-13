import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import './../Profiles/Student.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {getEventDetails,registerEvents} from './../../redux/actions/studentProfileAction';

class EventView extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventDetails : {},
            studentEventRegistered : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchEventDetails = this.fetchEventDetails.bind(this);
    }


    handleChange = e => {
        this.setState({ ...this.state, [e.target.name] : e.target.value} );
    }

    fetchEventDetails(){
        this.props.getEventDetails(this.props.match.params.event);
    }


    componentDidMount(){
        this.fetchEventDetails();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            event_id : this.props.match.params.event,
            student_id : localStorage.getItem("userId"),
            company_id : this.state.eventDetails.company_id

        }
        this.props.registerEvents(data);     
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          eventDetails : !nextProps.eventDetails? this.state.eventDetails : nextProps.eventDetails
        }
        
       );
    
      }

     
        
    


    render(){   
        return (
            <div>
                <Navbar/>
        
                <h1>Welcome {this.props.userName}!</h1>
                <div className="container" style = {{backgroundColor: "orange"}}>
                    <div className="row profile" style = {{backgroundColor: "white"}}>
                        <div className="col-md-12">
                                <div className="panel">
                                        <div className="panel-body">
                                            <h3>Event Name : {this.state.eventDetails.event_name}</h3><br/>
                                            <h3>Description : {this.state.eventDetails.event_description}</h3><br/>
                                            <h3>Start Time : {this.state.eventDetails.event_starttime}</h3><br/>
                                            <h3>End Time : {this.state.eventDetails.event_endtime}</h3><br/>
                                            <h3>Event Date : {this.state.eventDetails.event_date}</h3><br/>
                                            <h3>Event Location : {this.state.eventDetails.event_location}</h3><br/>
                                        </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-body">
                                       {(this.state.eventDetails.event_eligibility === "All" || this.state.eventDetails.event_eligibility === localStorage.getItem("major")) && <button class="btn btn-success" onClick={this.handleSubmit}>Register</button>}  
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

function mapStateToProps (state) {
    return {
        eventDetails : state.studentProfileReducer.eventDetails,
        studentEventRegistered : state.studentProfileReducer.studentEventRegistered
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getEventDetails: data => dispatch(getEventDetails(data)),
        registerEvents: data => dispatch(registerEvents(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventView);