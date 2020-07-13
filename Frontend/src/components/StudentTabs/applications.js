import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar';
import './../Profiles/Student.css';
import {getAppliedJobs} from './../../redux/actions/jobAction';
import {connect} from 'react-redux';

class StudentApplications extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            appliedJobs: [],
            filter : ''
        }
        this.fetchAppliedJobs = this.fetchAppliedJobs.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    fetchAppliedJobs = () => {
        this.props.getAppliedJobs(localStorage.getItem('userId'));
    }

    componentDidMount(){
        this.fetchAppliedJobs();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          appliedJobs : !nextProps.appliedJobs? this.state.appliedJobs : nextProps.appliedJobs,          
        }
       );	
      }

    render() {  

        const jobsApplied =  this.state.appliedJobs.map((item,key)=>
            <div className="panel">
                <div className="panel-body">
                    <h3>{item.title} : {item.location}</h3>
                    <h4>{item.company_name}</h4>
                    <h7><span class="glyphicon glyphicon-info-sign"></span>Status: {item.status}</h7><br/>
                    <h7><span class="glyphicon glyphicon-ok"></span> Applied: {item.date}</h7>
                </div>
            </div>
        );

        const { filter, appliedJobs } = this.state;
          const filteredData = appliedJobs
          .filter(item => 
          Object.keys(item).some(key => typeof item[key] === 'string'  && key === 'status' && item[key].toLowerCase().includes(filter.toLowerCase())))
          .map((item,key)=>
          <div className="panel">
                <div className="panel-body">
                    <h3>{item.title} : {item.location}</h3>
                    <h4>{item.company_name}</h4>
                    <h7><span class="glyphicon glyphicon-info-sign"></span>Status: {item.status}</h7><br/>
                    <h7><span class="glyphicon glyphicon-ok"></span> Applied: {item.date}</h7>
                </div>
            </div>
        );


        return (  
        <div>
            <Navbar/>
            <div className="container">
                <div className="row profile" style={{backgroundColor: "white"}}>
                    <div className="panel">
                        <div className="panel-body" style={{backgroundColor: "skyblue"}}>
                            <span class="glyphicon glyphicon-search"></span> &nbsp;
                            <input value={filter} onChange={this.handleChange} placeholder="application status" style={{width: 200, height: 30}}/>
                        </div>
                    </div>
                    {this.state.appliedJobs.length === 0 && jobsApplied}
                    {this.state.appliedJobs.length !== 0 && filteredData}
                </div>
            </div>
        </div>  
        );  
        }  

}


function mapStateToProps (state) {
    return {
        appliedJobs :state.jobReducer.appliedJobs
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getAppliedJobs: data => dispatch(getAppliedJobs(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentApplications);