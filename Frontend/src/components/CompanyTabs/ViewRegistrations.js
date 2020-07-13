import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getRegistrations} from './../../redux/actions/companyAction';

class ViewRegistrations extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            students: []
        }
        this.fetchRegistrations = this.fetchRegistrations.bind(this);
    }

    fetchRegistrations = () => {
        this.props.getRegistrations(this.props.match.params.event);
    }

    componentDidMount(){
        this.fetchRegistrations();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          students : !nextProps.students? this.state.students : nextProps.students,          
        }
       );	
      }

    render() {  

        const allStudents =  this.state.students.map((item,key)=>
                <div className="panel">
                    <div className="panel-body">
                    <h3><Link to={'/studentView/'+item.student_id}>{item.student_name}</Link></h3>
                    </div>
                </div>
        );

        return (  
        <div>
            <Navbar/>
            <div className="container" style={{backgroundColor: "green"}}>
                <div className="row profile" style={{backgroundColor: "white"}}>
                    <div className="panel">
                        <div className="panel-body" style={{backgroundColor: "orange"}}>
                           <h1>Event Name : {this.props.match.params.eventName}</h1>
                        </div>
                    </div>
                    {this.state.students.length !== 0 && allStudents}
                </div>
            </div>
        </div>  
        );  
        }  

}

function mapStateToProps (state) {
    return {
        students : state.companyReducer.registrations
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getRegistrations: data => dispatch(getRegistrations(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewRegistrations);