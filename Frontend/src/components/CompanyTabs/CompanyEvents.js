import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import './../Profiles/Student.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {createEvent, getEvents} from './../../redux/actions/companyAction';

class CompanyEvents extends Component {

    constructor(props){
        super(props);
        this.state = {
            eventName : '',
            description : '',
            eventStartTime: '',
            eventDate : '',
            eventLocation : '',
            eventEligibility : '',
            eventEndTime: '',
            events : []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchEvents = this.fetchEvents.bind(this);
    }


    handleChange = e => {
        this.setState({ ...this.state, [e.target.name] : e.target.value} );
    }

    handleSubmit = e => {
        
        e.preventDefault();
        let data = {
            eventName: this.state.eventName,
            eventDate: this.state.eventDate,
            description : this.state.description,
            eventLocation : this.state.eventLocation,
            eventStartTime : this.state.eventStartTime,
            eventEndTime : this.state.eventEndTime,
            eventEligibility : this.state.eventEligibility,
            company_id : localStorage.getItem("userId")
        };
        this.props.createEvent(data)
    }
    
    fetchEvents(){
        this.props.getEvents(localStorage.getItem("userId"));
    }


    componentDidMount(){
        this.fetchEvents();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          events : !nextProps.events? this.state.events : nextProps.events,
          
        }
       );	
      }


    render(){   

        const allEvents = this.state.events.map((item,key)=>
        <div class="row">
          <div className="col-sm-6" >{item.event_name}</div>
          <div className="col-sm-6" ><Link to={{pathname: "/viewRegistrations/"+item.event_id+"/"+item.event_name}} class="btn btn-primary" >View Registrations</Link></div>
          <br/>
          <br/>
          <br/>
        </div> 
        );
        
        return (
            <div>
                <Navbar/>
        
                <h1>Welcome {this.props.userName}!</h1>
                <div className="container" style = {{backgroundColor: "orange"}}>
                    <div className="row profile">
                        <div className="col-md-12">
                            <div className="profile-content">
                                    <div className="panel">
                                        <div className="panel-body">
                                           <form onSubmit={this.handleSubmit}>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="eventName" placeholder="Event Name" />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="description" placeholder="Description"  />
												</div>
                                                <div class="form-group">
													<input type="time" onChange={this.handleChange} class="form-control" name="eventStartTime" placeholder="Start Time"  />
												</div>
                                                <div class="form-group">
													<input type="time" onChange={this.handleChange} class="form-control" name="eventEndTime" placeholder="End Time"  />
												</div>
												<div class="form-group">
													<input type="date" onChange={this.handleChange} class="form-control" name="eventDate" placeholder="Event Date"  />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="eventLocation" placeholder="Event Location"  />
												</div>
												<div class="form-group">
													Eligibility :  &nbsp;
                                                    <select id="lang" onChange={this.handleChange} value={this.state.value} name="eventEligibility">
                                                        <option value="All">All</option>
                                                        <option value="CMPE">CMPE</option>
                                                        <option value="SE">SE</option>
                                                        <option value="EE">EE</option>
                                                    </select>
												</div>
												<button class="btn btn-success">Post Event</button>   
											</form>  
                                        </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                            <span class="glyphicon glyphicon-search"></span> &nbsp;
                            <input placeholder="student name or college name or skillset" style={{width: 300, height: 30}}/>
                            <br/><br/><br/>
                            {allEvents}
                                            </div>
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
        events : state.companyReducer.events
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        createEvent: data => dispatch(createEvent(data)),
        getEvents: data => dispatch(getEvents(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEvents);