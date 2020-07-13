import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllEvents} from '../../redux/actions/studentProfileAction';

class StudentEvents extends Component{

    constructor(props){
        super(props);
        this.state = {
            all_events : [],
            filter : ''
            
        };
        this.fetchAllEvents=this.fetchAllEvents.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    fetchAllEvents(){
        this.props.getAllEvents();
    }

    componentDidMount(){
        this.fetchAllEvents();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          all_events : !nextProps.studentEvents? this.state.all_events : nextProps.studentEvents,          
        }
       );	
      }

    render() {  

        const allEvents =  this.state.all_events.map((item,key)=>
            <div className="panel">
                <div className="panel-body">
                    <br/><h1>
                        <Link to={{pathname: "/viewEventDetails/"+item.event_id}} class="btn btn-primary" >{item.event_name}</Link>
                    </h1><br/>
                    Location : {item.event_location}<br/>
                    Event Date : {item.event_date}<br/>
                </div>
            </div>
          );

          const { filter, all_events } = this.state;
          const filteredData = all_events
          .filter(item => 
          Object.keys(item).some(key => typeof item[key] === 'string' && item[key].toLowerCase().includes(filter.toLowerCase())))
          .map((item,key)=>
            <div className="panel">
                <div className="panel-body">
                    <br/><h1>
                        <Link to={{pathname: "/viewEventDetails/"+item.event_id}} class="btn btn-primary" >{item.event_name}</Link>
                    </h1><br/> 
                    Location : {item.event_location}<br/>
                   Event Date : {item.event_date}<br/>
                </div>
            </div>
            );

        return (  
        <div>
            <Navbar/>
            <div className="container">
                <div className="row profile" style={{backgroundColor: "white"}}>
                    <div className="panel">
                        <div className="panel-body" style={{backgroundColor: "orange"}}>
                        <div className="col-md-9">
                            <span class="glyphicon glyphicon-search"></span> &nbsp;
                            <input value={filter} onChange={this.handleChange} placeholder="event name" style={{width: 300, height: 30}}/> 
                        </div>
                        <div className="col-md-3">
                            <Link to={{pathname: "/viewRegisteredEvents/"+localStorage.getItem("userId")}} class="btn btn-success" >Registered Events</Link>
                        </div>
                        </div>
                    </div>
                    {this.state.all_events.length === 0 && allEvents}
                    {this.state.all_events.length !== 0 &&filteredData}
                    <br/><br/><br/><br/><br/>
                </div>
            </div>
        </div>  
        );  
        }  

}

function mapStateToProps (state) {
    return {
        studentEvents : state.studentProfileReducer.studentEvents
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getAllEvents: data => dispatch(getAllEvents(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentEvents);