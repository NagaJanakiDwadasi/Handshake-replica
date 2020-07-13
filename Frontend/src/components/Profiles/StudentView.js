import React,{Component} from 'react';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './Student.css';
import EdiText from 'react-editext';
import {getStudentExperienceDetails,getStudentEducationDetails,getStudentObjectiveDetails,getStudentPicture,getStudentAddressDetails,getStudentSkillSetDetails,getContactInfo,getStudentProfile} from './../../redux/actions/StudentViewAction';
import {postMessages} from './../../redux/actions/messagesAction';
import MyModal from './PopUpForm';
import axios from 'axios';


class StudentView extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            user: {
                name: null,
                email: null,
                password: null,
                college: null,
                profile: 'student'
            },
            skillSet : null,
            experience : {
                company_name : '', title: null, location: null, work_description: null, start_date: null, end_date: null
            },
            education: {
                college_name: null, degree: null, location: null, major: null, year_of_passing: null, cgpa: null
            }, 
            address : {
                city : null,
                state : null,
                country : null
            },
            profilePic: null,
            objective: null,
            contactInfo : {
                student_name : '',
                email_id: ''
            },
            student : {
                skillSet : null,
                careerObjectives : null,
                name : null,
                email : null,
                password : null,
                collegeName : null,
                experience : [{}],
                education : [{}],
                address : [{}]

            },
            enteredMessage : ''

        };
        this.fetchStudentEducation = this.fetchStudentEducation.bind(this);
        this.fetchStudentExperience = this.fetchStudentExperience.bind(this);
        this.fetchStudentObjective = this.fetchStudentObjective.bind(this);
        this.fetchStudentSkillSet = this.fetchStudentSkillSet.bind(this);
        this.fetchStudentPicture = this.fetchStudentPicture.bind(this);
        this.fetchStudentAddress = this.fetchStudentAddress.bind(this);
        this.fetchContactInfo = this.fetchContactInfo.bind(this);
        this.fetchStudentProfile = this.fetchStudentProfile.bind(this);
        this.postMessage=this.postMessage.bind(this);
    }

      fetchStudentEducation = () => {
          this.props.getStudentEducationDetails(this.props.match.params.student)
      }
      fetchStudentPicture = () => {
        this.props.getStudentPicture(this.props.match.params.student)
      }

      fetchStudentExperience = () => {
          this.props.getStudentExperienceDetails(this.props.match.params.student);
      }

      fetchStudentObjective = () => {
          this.props.getStudentObjectiveDetails(this.props.match.params.student);
      }

      fetchStudentSkillSet = () => {
        this.props.getStudentSkillSetDetails(this.props.match.params.student);
      }

      fetchStudentAddress = () => {
        this.props.getStudentAddressDetails(this.props.match.params.student);
      }

      fetchContactInfo = () => {
          this.props.getContactInfo(this.props.match.params.student);
      }

      fetchStudentProfile = () => {
        alert("fetchStudentProfile");
        let email = this.props.match.params.student;
      let data = {"email" : email }
      this.props.getStudentProfile(data);
    }

    postMessage(){
        // alert("messageObject::"+JSON.stringify(messageObject[0]));
        // alert("enteredMessage::"+JSON.stringify(this.state.enteredMessage));
         let payload = {
             "user1" : {
                 "id" : localStorage.getItem('id'),
                 "name" : localStorage.getItem('name')
             },
             "user2" : {
                 "id" : this.state.student._id,
                 "name" : this.state.student.name
             },
             "messages": [{
                 "from" : localStorage.getItem('name'),
                 "message" : this.state.enteredMessage
             }]
         };
         alert("payload"+JSON.stringify(payload));
        this.setState({
         ...this.state,
          enteredMessage: '' 
        });
         this.props.postMessages(payload);
         //this.fetchMessages();
     }

     handleChange = event => {
        this.setState({ enteredMessage: event.target.value });
    };
      
      componentDidMount(){
          this.fetchStudentProfile();
          /*this.fetchStudentEducation();
          this.fetchStudentObjective();
          this.fetchStudentPicture();
          this.fetchStudentExperience();
          this.fetchStudentSkillSet();
          this.fetchStudentAddress();
          this.fetchContactInfo(); */
      }
      componentWillReceiveProps(nextProps){
          //alert(JSON.stringify(nextProps.student));
        this.setState({
          ...this.state,
          experience : !nextProps.studentExperience? this.state.experience:nextProps.studentExperience,
          objective: !nextProps.objective ? this.state.objective:nextProps.objective,
          skillSet: !nextProps.skillSet ? this.state.skillSet:nextProps.skillSet,
          education : !nextProps.education?this.state.education:nextProps.education,
          address : !nextProps.studentAddress?this.state.address:nextProps.studentAddress,
          updateExpFlag : !nextProps.updateExpFlag? this.state.updateExpFlag:nextProps.updateExpFlag,
          profilePic: nextProps.pictureData,
          contactInfo : !nextProps.contactInfo? this.state.contactInfo : nextProps.contactInfo,
          student : !nextProps.student?this.state.student:nextProps.student
        }
       );	
      }

    render(){
        const {enteredMessage} = this.state;
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="row profile">
                        <div className="col-md-3">
                            <div className="profile-sidebar">
                                <div className="profile-userpic">
                                    <img src={`${this.state.profilePic}`} 
                                    className="img-responsive" alt="" width={500} height={300}/>
                                </div>
                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {this.state.student.name}
                                    </div>
                                    <div className="profile-usertitle-job">
                                       
                                        <i className="glyphicon glyphicon-home"></i> {' '}
        {this.state.address.city}<br/>
        {this.state.address.state}, {this.state.address.country}
                                    </div>
                                </div>
                                
                                <div className="profile-usermenu">
                                    <ul className="nav">
                                        <li>
                                            <a href="#">
                                            <i className="glyphicon glyphicon-user"></i>
                                           Contact INFO<br/> <br/> email : {this.state.student.email} <br/> </a>
                                        </li>
                                    </ul>
                                    <textarea placeholder="Enter your message" rows="4" cols="20" onChange={this.handleChange} value={enteredMessage}></textarea>
                                <button class="btn btn-primary" onClick={this.postMessage}>Send</button> 
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="profile-content">
                                    <div className="panel">
                                        <div className="panel-body">
                                            <h4>Career Objective: </h4><br/>{this.state.student.careerObjectives}
                                        </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                                <h4>Skillset: </h4><br/>{this.state.student.skillSet}
                                            </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                                <h4>Education</h4>
                                                <div class="row">
                                                    <div className="col-sm-6" >College Name: {this.state.education.college_name}</div>
                                                    <div className="col-sm-6" >Degree: {this.state.education.degree}</div>
                                                </div><br/>
                                                <div class="row">
                                                    <div className="col-sm-6" >Major: {this.state.education.major}</div>
                                                    <div className="col-sm-6" >CGPA: {this.state.education.cgpa}</div>
                                                </div><br/>
                                                <div class="row">
                                                    <div className="col-sm-6" >location: {this.state.education.location}</div>
                                                    <div className="col-sm-6" >YOP: {this.state.education.year_of_passing}</div>
        
                                                </div>
                                            </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                                <h4>Experience</h4>
                                                <div>
                                                <div class="row">
                                                    <div className="col-sm-6" >Company: {this.state.experience.company_name}</div>
                                                    <div className="col-sm-6" >Title: {this.state.experience.title}</div>
                                                    </div><br/>
                                                    <div class="row">
                                                        <div className="col-sm-6" >Location: {this.state.experience.location}</div>
                                                        <div className="col-sm-6" >Description : {this.state.experience.work_description}</div>
                                                    </div><br/>
                                                    <div class="row">
                                                        <div className="col-sm-6" >start-date : {this.state.experience.start_date}</div>
                                                        <div className="col-sm-6" >end-date : {this.state.experience.end_date}</div>
                                                    </div>
                                                </div>
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
       profile: state.loginReducer.profile,
       userName: state.loginReducer.userName,
       education: state.studentProfileReducer.education,
       pictureData: state.studentProfileReducer.picture,
       objective: state.studentProfileReducer.objective,
       skillSet : state.studentProfileReducer.studentSkillSet,
       studentAddress: state.studentProfileReducer.studentAddress,
       studentExperience : state.studentProfileReducer.studentExperience,
       contactInfo : state.studentProfileReducer.contactInfo,
       student : state.studentProfileReducer.student
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getStudentEducationDetails: data => dispatch(getStudentEducationDetails(data)),
        getStudentPicture: data => dispatch(getStudentPicture(data)),
        getStudentObjectiveDetails: data => dispatch(getStudentObjectiveDetails(data)),
        getStudentExperienceDetails: data => dispatch(getStudentExperienceDetails(data)),
        getStudentSkillSetDetails: data => dispatch(getStudentSkillSetDetails(data)),
        getStudentAddressDetails: data => dispatch(getStudentAddressDetails(data)),
        getContactInfo: data => dispatch(getContactInfo(data)),
        getStudentProfile: data => dispatch(getStudentProfile(data)),
        postMessages: data => dispatch(postMessages(data))
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentView);