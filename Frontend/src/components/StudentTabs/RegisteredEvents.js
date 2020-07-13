import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getRegisteredEvents} from '../../redux/actions/studentProfileAction';

class StudentRegisteredEvents extends Component{

    constructor(props){
        super(props);
        this.state = {
            registeredEvents : []
        };
        this.fetchRegisteredEvents=this.fetchRegisteredEvents.bind(this);
    }

    fetchRegisteredEvents(){
        this.props.getRegisteredEvents(this.props.match.params.id);
    }

    componentDidMount(){
        this.fetchRegisteredEvents();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          registeredEvents : !nextProps.registeredEvents? this.state.registeredEvents : nextProps.registeredEvents,          
        }
       );	
      }

    render() {  

        const allRegisteredEvents =  this.state.registeredEvents.map((item,key)=>
            <div className="panel">
                <div className="panel-body">
                <br/><h3>
                    {item.event_name}
                </h3>
                <h5>
                    Location: {item.event_location}
                </h5><br/> 
                </div>
            </div>
          );

        return (  
        <div>
            <Navbar/>
            <div className="container" style={{backgroundColor: "orange"}}>
                <div className="row profile">
                    <div className="panel">
                        <div className="panel-body">
                            <h1 style={{color: "Green"}}>Registered Events</h1>
                        </div>
                    </div>
                    {allRegisteredEvents}
                    <br/><br/><br/><br/><br/>
                </div>
            </div>
        </div>  
        );  
        }  

}

function mapStateToProps (state) {
    return {
        registeredEvents : state.studentProfileReducer.registeredEvents
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getRegisteredEvents: data => dispatch(getRegisteredEvents(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentRegisteredEvents);