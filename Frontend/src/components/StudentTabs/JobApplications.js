import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import './../Profiles/Student.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {getJobApplications} from './../../redux/actions/jobAction';
import {updateApplicationStatus} from './../../redux/actions/companyAction';
import ResumeView from '../CompanyTabs/ResumeView';
import {ReactPDF} from 'react-pdf';

class JobApplication extends Component {
   
    constructor(props)
    {
        super(props);
        this.state = {
            applications: [],
            filter : '',
            showPopup: '',
            resume : '',
            applicationStatus : '',
            student_id : '',
            updatedApplStatusFlag : false,
            clickedObject: null
        }
        this.fetchJobApplications = this.fetchJobApplications.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    fetchJobApplications = () => {
        this.props.getJobApplications(this.props.match.params.job);
    }

    togglePopup(param) { 
        //alert("inside togglePopup::"+JSON.stringify(param._id));
        this.setState({  
             showPopup: !this.state.showPopup,
             resume: !param ? this.state.resume : param.resume,
             student_id : !param? this.state.student_id : param.studentId,
             updatedApplStatusFlag : !this.state.updatedApplStatusFlag,
             clickedObject : param
        });  
        this.fetchJobApplications();
    } 

    updateApplicationStatus = (val,param) => {
        let data = {
            jobStatus : val,
            id : param._id
        };
        //alert(JSON.stringify(data));
        this.props.updateApplicationStatus(data)
    }

    applicationReviewed(param){
        this.updateApplicationStatus("Reviewed",param);
    }
    applicationDeclined(param){
        this.updateApplicationStatus("Declined",param);
    }

    componentDidMount(){
        this.fetchJobApplications();
    }

    
    componentWillReceiveProps(nextProps){
        //alert("jobApplications::"+JSON.stringify(nextProps.jobApplications));
        this.setState({
          ...this.state,
          applications : !nextProps.jobApplications? this.state.applications : nextProps.jobApplications, 
          updatedApplStatusFlag : !nextProps.updatedApplStatusFlag ? this.state.updatedApplStatusFlag : nextProps.updatedApplStatusFlag          
        }
       );	
      }


    render(){

        const allApplications =  this.state.applications.map((item,key)=>
        <div class="row">
            <div className="col-sm-4" ><Link to={'/studentView/'+item.studentId}>{item.studentName}</Link></div>
            <div className="col-sm-4" >{item.jobStatus}</div>
            <div className="col-sm-4" ><button class="btn btn-primary" onClick={this.togglePopup.bind(this,item)}>View Resume</button></div>
            <br/><br/><br/>
        </div>
        );


        let convertedResume= new Buffer(this.state.resume).toString('base64');

        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row profile">
                        <div className="col-md-12">
                            <div className="profile-content">
                                    <div className="panel">
                                        <div className="panel-body">
                                           <h4>{this.props.match.params.jobName} Applications</h4> 
                                        </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                                {allApplications}
                                            </div>
                                            {this.state.showPopup ?  
                                        <ResumeView  
                                                resume={convertedResume}
                                                closePopup={this.togglePopup.bind(this,this.state.clickedObject)}  
                                                review={this.applicationReviewed.bind(this,this.state.clickedObject)}
                                                decline={this.applicationDeclined.bind(this,this.state.clickedObject)}
                                                updateFlag={this.state.updatedApplStatusFlag}

                                        />  
                                        : null  
                                    } 
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
       jobApplications: state.jobReducer.jobApplications,
       applicationStatus : state.companyReducer.applicationStatus,
       updatedApplStatusFlag : state.companyReducer.updatedApplStatusFlag
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getJobApplications: data => dispatch(getJobApplications(data)),
        updateApplicationStatus: data => dispatch(updateApplicationStatus(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobApplication);