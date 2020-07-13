import React,{Component} from 'react';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import './Student.css';
import EdiText from 'react-editext';
import {getStudentExperienceDetails,getStudentEducationDetails,getStudentObjectiveDetails,getStudentPicture,getStudentAddressDetails,getStudentSkillSetDetails,updateStudentExperience,updateStudentObjective,updateStudentSkillSet,updateStudentEducation,updateStudentCity, updateStudentCountry,updateStudentState,getStudentProfile} from './../../redux/actions/studentProfileAction';
import MyModal from './PopUpForm';
import EducationModal from './../Profiles/Education';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MODAL_A = 'modal_a';
const MODAL_B = 'modal_b';
const DEFAULT_TITLE = 'Default title';

class Student extends Component {
    
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
            nameerror: "",
            emailerror:"",
            passworderror:"",
            weakpassworderror: "",
            collegeerror:"",
            title1: DEFAULT_TITLE,
            currentModal: null,
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
            selectedFile: null,
            profilePic: null,
            objective: null,
            updateExpFlag : false,
            updateEduFlag : false,
            isLoading : false,
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

            }
            
        };
        this.onSaveObjective = this.onSaveObjective.bind(this);
        this.onSaveSkillset = this.onSaveSkillset.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleExperienceSubmit = this.handleExperienceSubmit.bind(this);
        this.fetchStudentEducation = this.fetchStudentEducation.bind(this);
        this.fetchStudentExperience = this.fetchStudentExperience.bind(this);
        this.fetchStudentObjective = this.fetchStudentObjective.bind(this);
        this.fetchStudentSkillSet = this.fetchStudentSkillSet.bind(this);
        this.fetchStudentPicture = this.fetchStudentPicture.bind(this);
        this.fetchStudentAddress = this.fetchStudentAddress.bind(this);
        this.validate=this.validate.bind(this);
        this.handleCollegeInputChange=this.handleCollegeInputChange.bind(this);
        this.handleDegreeInputChange=this.handleDegreeInputChange.bind(this);
        this.handleMajorInputChange = this.handleMajorInputChange.bind(this);
        this.handleCGPAInputChange = this.handleCGPAInputChange.bind(this);
        this.handleEduLocationInputChange = this.handleEduLocationInputChange.bind(this);
        this.handleYOPInputChange=this.handleYOPInputChange.bind(this);
        this.educationValidate=this.educationValidate.bind(this);
        this.fetchStudentProfile = this.fetchStudentProfile.bind(this);
    }

    onSaveObjective = (val) => {
        let data = {
            email: localStorage.getItem('email'),
            objective : val
        }
        this.props.updateStudentObjective(data)
    }

    onSaveSkillset = (val) => {
        let data = {
            email: localStorage.getItem('email'),
            skillSet : val
        }
        this.props.updateStudentSkillSet(data)
    }

    onSaveCity = (val) => {

        let data = {
            email: localStorage.getItem('email'),
            address : {
                city : val,
                state : this.state.address.state,
                county : this.state.address.country

            }
        }
        this.props.updateStudentCity(data)
    }

    onSaveState = (val) => {
        this.props.updateStudentState(val)
    }

    onSaveCountry = (val) => {
        this.props.updateStudentCountry(val)
    }


    toggleModal = key => event => {
        event.preventDefault();
        if (this.state.currentModal) {
          this.handleModalCloseRequest();
          return;
        }
        this.setState({
            ...this.state,
            currentModal: key,
            title1: DEFAULT_TITLE,
            updateExpFlag:false,
            updateEduFlag:false
          });
    }

    handleModalCloseRequest = () => {
        this.setState({
          ...this.state,
          currentModal: null,
          updateExpFlag:false,
          updateEduFlag:false
        });
      }
    

    handleCollegeInputChange = e => {
        //alert("inside change input");
        this.setState({ ...this.state, education: {
            college_name: e.target.value, 
            degree: this.state.education.degree, 
            location: this.state.education.location, 
            major: this.state.education.major, 
            year_of_passing: this.state.education.year_of_passing, 
            cgpa: this.state.education.cgpa
        }} );
      }
      
    handleDegreeInputChange = e => {
        this.setState({ ...this.state, education: {
            college_name: this.state.education.college_name, 
            degree: e.target.value, 
            location: this.state.education.location, 
            major: this.state.education.major, 
            year_of_passing: this.state.education.year_of_passing, 
            cgpa: this.state.education.cgpa
        }} );
    }
    
    
    handleEduLocationInputChange = e => {
        this.setState({ ...this.state, education: {
            college_name: this.state.education.college_name, 
            degree: this.state.education.degree, 
            location: e.target.value, 
            major: this.state.education.major, 
            year_of_passing: this.state.education.year_of_passing, 
            cgpa: this.state.education.cgpa
        }} );
    }

    handleMajorInputChange = e => {
        this.setState({ ...this.state, education: {
            college_name: this.state.education.college_name, 
            degree: this.state.education.degree, 
            location: this.state.education.location, 
            major: e.target.value, 
            year_of_passing: this.state.education.year_of_passing, 
            cgpa: this.state.education.cgpa
        }} );
    }


    handleYOPInputChange = e => {
        this.setState({ ...this.state, education: {
            college_name: this.state.education.college_name, 
            degree: this.state.education.degree, 
            location: this.state.education.location, 
            major: this.state.education.major, 
            year_of_passing: e.target.value, 
            cgpa: this.state.education.cgpa
        }} );
    }

    handleCGPAInputChange = e => {
        this.setState({ ...this.state, education: {
            college_name: this.state.education.college_name, 
            degree: this.state.education.degree, 
            location: this.state.education.location, 
            major: this.state.education.major, 
            year_of_passing: this.state.education.year_of_passing, 
            cgpa: e.target.value
        }} );
    }



    handleCompnayInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:e.target.value,
            title:this.state.experience.title,
            location:this.state.experience.location,
            work_description:this.state.experience.work_description,
            start_date:this.state.experience.start_date,
            end_date:this.state.experience.end_date
        }} );
      }

      handleTitleInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:this.state.experience.company_name,
            title:e.target.value,
            location:this.state.experience.location,
            work_description:this.state.experience.work_description,
            start_date:this.state.experience.start_date,
            end_date:this.state.experience.end_date
        }} );
      }


      handleLocationInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:this.state.experience.company_name,
            title:this.state.experience.title,
            location:e.target.value,
            work_description:this.state.experience.work_description,
            start_date:this.state.experience.start_date,
            end_date:this.state.experience.end_date
        }} );
      }

      handleDescriptionInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:this.state.experience.company_name,
            title:this.state.experience.title,
            location:this.state.experience.location,
            work_description:e.target.value,
            start_date:this.state.experience.start_date,
            end_date:this.state.experience.end_date
        }} );
      }

      handleStartDateInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:this.state.experience.company_name,
            title:this.state.experience.title,
            location:this.state.experience.location,
            work_description:this.state.experience.work_description,
            start_date:e.target.value,
            end_date:this.state.experience.end_date
        }} );
      }

      handleEndDateInputChange = e => {
        this.setState({ ...this.state, experience :{
            company_name:this.state.experience.company_name,
            title:this.state.experience.title,
            location:this.state.experience.location,
            work_description:this.state.experience.work_description,
            start_date:this.state.experience.start_date,
            end_date:e.target.value
        }} );
      }

      validate = () => {
            if(this.state.experience.company_name || this.state.experience.title || this.state.experience.location || this.state.experience.work_description || this.state.experience.start_date || this.state.experience.end_date)
            {
                this.props.updateStudentExperience(this.state.experience)
            
            }
            else{
                alert("Please fill atleast one field to update")
            }
            
      }

      handleExperienceSubmit = e => {
        e.preventDefault();
        this.validate()
      }

      handleEducationSubmit = e => {
        e.preventDefault();
        this.educationValidate();
      }

      educationValidate(){
        if(this.state.education.college_name || this.state.education.degree || this.state.education.location || this.state.education.major || this.state.education.year_of_passing || this.state.education.cgpa)
        {
            let data = {
                college_name : this.state.education.college_name,
                degree : this.state.education.degree,
                major : this.state.education.major,
                year_of_passing : this.state.education.year_of_passing,
                location : this.state.education.location,
                cgpa : this.state.education.cgpa
            }
            alert("input:"+JSON.stringify(data));
            this.props.updateStudentEducation(data)
            
        }
        else{
            alert("Please fill atleast one field to update")
        }
      }

      handleOnAfterOpenModal = () => {
        // when ready, we can access the available refs.
        this.heading && (this.heading.style.color = '#F00');
      }

      fetchStudentEducation = () => {
          this.props.getStudentEducationDetails()
      }
      fetchStudentPicture = () => {
        this.props.getStudentPicture()
      }

      fetchStudentExperience = () => {
          this.props.getStudentExperienceDetails();
      }

      fetchStudentObjective = () => {
          this.props.getStudentObjectiveDetails();
      }

      fetchStudentSkillSet = () => {
        this.props.getStudentSkillSetDetails();
      }

      fetchStudentAddress = () => {
        this.props.getStudentAddressDetails();
      }

      fetchStudentProfile = () => {
          alert("fetchStudentProfile");
          let email = localStorage.getItem('email');
        let data = {"email" : email }
        this.props.getStudentProfile(data);
      }

      handleChange(data) {
        this.setState(data);
      }
      
      componentDidMount(){
          this.fetchStudentProfile();
          this.fetchStudentEducation();
          this.fetchStudentPicture();
          this.fetchStudentExperience();
          this.fetchStudentAddress();
      }
      componentWillReceiveProps(nextProps){
         
        this.setState({
          ...this.state,
          experience : !nextProps.studentExperience? this.state.experience:nextProps.studentExperience,
          skillSet: !nextProps.skillSet ? this.state.skillSet:nextProps.skillSet,
          education : !nextProps.education?this.state.education:nextProps.education,
          address : !nextProps.studentAddress?this.state.address:nextProps.studentAddress,
          updateExpFlag : !nextProps.updateExpFlag? this.state.updateExpFlag:nextProps.updateExpFlag,
          updateEduFlag : !nextProps.updateEduFlag? this.state.updateEduFlag:nextProps.updateEduFlag,
          isLoading : !nextProps.isLoading? this.state.isLoading:nextProps.isLoading,
          profilePic: nextProps.pictureData,
          student : !nextProps.student?this.state.student:nextProps.student,
            
        }
       );	
      }

      profilePictureHandler = event => {
          this.setState({
              ...this.state, selectedFile: event.target.files[0]
          })
      }
      uploadPicture = () => {
          if(this.state.selectedFile){
            const fd = new FormData();
            fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
            let stid = localStorage.getItem('userId');
            axios.post('http://localhost:3001/student/profileUpdatePicture/'+stid, fd, {
                headers: { 'content-type': 'multipart/form-data' }
                }).then((result) => {
                alert("Upload successful!")
            }).catch((err) => {
                alert("upload failed!")
            });
        }
        else{
            alert("No image to upload")
        }
      }

    render(){
        const { currentModal } = this.state;

        const ConnectedList = ({ experience }) => (
            <ul className="list-group list-group-flush">
              {experience.map(el => (
                <li className="list-group-item" key={el.title}>
                  {el.title}
                </li>
              ))}
            </ul>
          );
          var testResult = null;
           if(this.state.isLoading){
           testResult = this.state.student.experience.map((item,key)=>
          <div>
              <EditExperience 
                    experience={item} 
                    experiencelist = {this.state.experience}
                    id = {item.student_exp_id} 
                    handleChange={this.handleChange} 
                    applicantprofileexperience = {this.props.updateStudentExperience}/>
          <div class="row">
            <div className="col-sm-6" >Company: {item.company}</div>
            <div className="col-sm-6" >Title: {item.title}</div>
          </div><br/>
          <div class="row">
            <div className="col-sm-6" >Location: {item.location}</div>
            <div className="col-sm-6" >Description : {item.description}</div>
          </div><br/>
          <div class="row">
            <div className="col-sm-6" >Start date : {item.startDate}</div>
            <div className="col-sm-6" >End date : {item.endDate}</div>
          </div>

          <br/>
          <br/>
          <br/>
          </div> 
          );
        }

         
        

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
                                    <input type="file" onChange={this.profilePictureHandler}/>
                                    <button type="button" className="btn btn-info btn-xs" onClick={this.uploadPicture}>upload</button>
                                </div>
                                <div className="profile-usertitle">
                                    <div className="profile-usertitle-name">
                                        {localStorage.getItem('user')}
                                    </div>
                                    <div className="profile-usertitle-job">
                                       
                                        <i className="glyphicon glyphicon-home"></i> {' '}
                                        <EdiText
                                                type='text'
                                                value={this.state.address.city}                                                                      onSave={this.onSaveCity}
                                            />
                                        <EdiText
                                                type='text'
                                                value={this.state.address.state}                                                                     onSave={this.onSaveState}
                                            />
                                        <EdiText
                                                type='text'
                                                value={this.state.address.country}                                                                   onSave={this.onSaveCountry}
                                            />
                                    </div>
                                </div>
                                
                                <div className="profile-usermenu">
                                    <ul className="nav">
                                        <li>
                                            <a href="#">
                                            <i className="glyphicon glyphicon-user"></i>
                                           Contact INFO<br/> <br/> email : {localStorage.getItem('email')} <br/> </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="profile-content">
                                    <div className="panel">
                                        <div className="panel-body">
                                            <h4>Career Objective</h4>
                                            <EdiText
                                                type='text'
                                                value={this.state.student.careerObjectives}                                                                      onSave={this.onSaveObjective}
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                                <h4>Skillset</h4>
                                                <EdiText
                                                    type='text'
                                                    value={this.state.student.skillSet}
                                                    onSave={this.onSaveSkillset}
                                                />
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
                                             
                                                <button type="button" className="btn btn-info btn-xs" onClick={this.toggleModal(MODAL_B)}>EDIT</button>
                                                    <EducationModal
                                                    openPopup={currentModal == MODAL_B}
                                                    closePopUp={this.toggleModal(MODAL_B)}
                                                    onCollegNameChangeInput={this.handleCollegeInputChange}
                                                    onDegreeChangeInput={this.handleDegreeInputChange}
                                                    onMajorChangeInput={this.handleMajorInputChange}
                                                    onCGPAChangeInput={this.handleCGPAInputChange}
                                                    onEduLocationChangeInput={this.handleEduLocationInputChange}
                                                    onYOPChangeInput={this.handleYOPInputChange}
                                                    onEducationHandleSubmit={this.handleEducationSubmit}
                                                    eduCollegeName={this.state.education.college_name}
                                                    eduDegree = {this.state.education.degree}
                                                    eduMajor = {this.state.education.major}
                                                    eduLocation = {this.state.education.location}
                                                    eduCGPA = {this.state.education.cgpa}
                                                    eduYOP = {this.state.education.year_of_passing}
                                                    updateEduFlag = {this.state.updateEduFlag}/>
                                            </div>
                                    </div>
                                    <div className="panel">
                                            <div className="panel-body">
                                            
                                                <h4>Experience
                                                <Experience experiencelist = {this.state.experience} 
                                             handleChange={this.handleChange} 
                                             updateStudentExperience = {this.props.updateStudentExperience}>    
                                            </Experience>
                                                </h4> 
                                                <div>{testResult}</div>
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


class EditExperience extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : this.props.experience.title,
            company : this.props.experience.company,
            location : this.props.experience.location,
            startDate : this.props.experience.startDate,
            endDate : this.props.experience.endDate,
            description : this.props.experience.description,
            id : this.props.id,
            touchedexperience : {
                title: false,
                company: false,
                location : false,
                startDate : false,
                endDate : false
            },
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitExperience = this.submitExperience.bind(this);
    }
    
    
    submitExperience = () => {
        if (this.handleValidationExperience()) {
            alert("inside if::"+JSON.stringify(this.state));
            alert("email::"+localStorage.getItem("email"));
            const email = localStorage.getItem("email");
            alert("email::"+email);
            const token =  localStorage.getItem("token");
            alert("token::"+token);
            var editedExperience = {
                title : this.state.title,
                company : this.state.company,
                location : this.state.location,
                startDate : this.state.startDate,
                endDate : this.state.endDate,
                description : this.state.description

            }
            alert(JSON.stringify(editedExperience));
            alert(JSON.stringify(this.props.experiencelis));
            var experiencelist = this.props.experiencelist;
            console.log(experiencelist);
            experiencelist[this.state.id] = editedExperience;
            alert(JSON.stringify(experiencelist));
            var data = {
                email: email,
                experiencelist : experiencelist
            }
    
            this.props.updateStudentExperience(data, token).then(response => {
                console.log("response:", response);
                if(response.payload.status === 200){
                    console.log("Profile Experience Updated Successfully")
                    this.props.handleChange({ experience: experiencelist });
                }
            })
        }
        else{
            alert("invalid");
        }
    }
    
    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
          //alert(JSON.stringify(state));
        this.setState(state);
    }
    
    handleBlur = (field) => (evt) => {
        this.setState({
            touchedexperience: { ...this.state.touchedexperience, [field]: true }
        });
    }
    
    handleValidationExperience(){
        let formIsValid = false;

        if(this.state.company || this.state.title || this.state.location)
          {
            //alert(this.state.company + "--"+ this.state.title + "--"+this.state.location);
                return true;
            
          }
          else{
              //alert(this.state.company + "--"+ this.state.title + "--"+this.state.location);
              return false;
          }
      }
    
    
    render() {  
        const {title,company,location,startDate,endDate,description,id} = this.state;

        const errors = validateExperience(this.state.title, this.state.company, this.state.location, this.state.startDate, this.state.endDate);
        var shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touchedexperience[field];
            return hasError ? shouldShow : false;
        };
    
        return (
            <div>
             <div className = "pv-entity__actions" data-toggle="modal" data-target={'#experienceeditmodal'+id}> Edit <FontAwesomeIcon icon="pencil-alt" color="#0073b1" size ="lg"/></div>
               <div className="modal fade  bd-example-modal-lg" id={'experienceeditmodal'+id} tabIndex="-1" role="dialog" aria-labelledby={'experiencemodallabel'+id} aria-hidden="true"  style = {{marginTop : "40px"}}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id={'experiencemodallabel'+id}>Edit Experience</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                &times;
                                </button>
                            </div>
                            <div className="modal-body">
                            <label htmlFor="position-title-typeahead" className="mb1 required">Title</label>
                            <input className = "form-control" id="position-title-typeahead" value = {title}  onChange = {this.changeHandler}  onBlur={this.handleBlur('title')} name = "title" placeholder="Ex: Manager" maxLength="100" type="text"/>
                            {shouldMarkError('title') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Title is a required field</div> : (null)}
    
                            <label htmlFor="position-company-typeahead" className="mb1 required">Company</label>
                            <input className = "form-control" id="position-company-typeahead" value = {company}  onChange = {this.changeHandler}  onBlur={this.handleBlur('company')} name = "company" placeholder="Ex: Microsoft" maxLength="100" type="text"/>
                            {shouldMarkError('company') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Company is a required field</div> : (null)}
    
                            <label htmlFor="position-location-typeahead" className="mb1 required">Location</label>
                            <input className = "form-control" id="position-location-typeahead" value = {location}  onChange = {this.changeHandler}  onBlur={this.handleBlur('location')} name = "location" placeholder="Ex: London, United Kingdom" maxLength="100" type="text"/>
                            {shouldMarkError('location') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Location is a required field</div> : (null)}
    
                            <label htmlFor="position-location-typeahead" className="mb1 required">Start Date</label>
                            <input className = "form-control" id="position-location-typeahead" value = {startDate}  onChange = {this.changeHandler}  onBlur={this.handleBlur('startDate')} name = "startDate" placeholder="Ex: 2012" maxLength="100" type="text"/>
                            {shouldMarkError('startDate') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Start Date is a required field</div> : (null)}
    

                            <label htmlFor="position-location-typeahead" className="mb1 required">End date</label>
                            <input className = "form-control" id="position-location-typeahead" value = {endDate}  onChange = {this.changeHandler}  onBlur={this.handleBlur('endDate')} name = "endDate" placeholder="Ex: 2016" maxLength="100" type="text"/>
                            {shouldMarkError('endDate') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;End Date is a required field</div> : (null)}
    
                            <label htmlFor="position-description-typeahead" className="mb1 required"  >Description</label>
                            <textarea className = "form-control" name = "description" value = {description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                            
                            </div>
                            <div className="modal-footer">
                            <div className="modal-footer">
                                    {!this.handleValidationExperience() ?
                                    <div className=""  style = {{color: "red"}}>&nbsp;Please enter all fields</div> : (null)}
                                    <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                    {!this.handleValidationExperience() ?
                                    <button type="submit" className="btn arteco-btn"  style = {{width : "150px"}}>Save changes</button> :
                                    <button type="submit" className="btn arteco-btn"  data-dismiss="modal"  onClick = {this.submitExperience} style = {{width : "150px"}}>Save changes</button> }
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
               </div>
            )
        }
    }

class Experience extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : "",
            company : "",
            location : "",
            startDate : "",
            endDate : "",
            description : "",
            touchedexperience : {
                title: false,
                company: false,
                location : false,
                fromMonth : false,
                fromYear : false
            },
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitExperience = this.submitExperience.bind(this);
    }

    submitExperience = () => {
        if (this.handleValidationExperience()) {
            alert("inside if::"+JSON.stringify(this.state));
            alert("email::"+localStorage.getItem("email"));
            const email = localStorage.getItem("email");
            alert("email::"+email);
            const token =  localStorage.getItem("token");
            alert("token::"+token);
            var newExperience = {
                title : this.state.title,
                company : this.state.company,
                location : this.state.location,
                startDate : this.state.startDate,
                endDate : this.state.endDate,
                description : this.state.description
            }
            var experiencelist = this.props.experiencelist
            experiencelist.push(newExperience)
            var userData = {
                email: email,
                experience : experiencelist
            }
            this.props.updateStudentExperience(userData);
        }
    } 

    changeHandler = (e) => {
        const state = {
          ...this.state,
          [e.target.name]: e.target.value,
          }
        this.setState(state);
    }


    handleBlur = (field) => (evt) => {
        this.setState({
            touchedexperience: { ...this.state.touchedexperience, [field]: true }
        });
    }

    handleValidationExperience(){
        let formIsValid = false;

        if(this.state.company || this.state.title || this.state.location)
          {
            //alert(this.state.company + "--"+ this.state.title + "--"+this.state.location);
                return true;
            
          }
          else{
              //alert(this.state.company + "--"+ this.state.title + "--"+this.state.location);
              return false;
          }
      }


    render() {
        const errors = validateExperience(this.state.title, this.state.company, this.state.location, this.state.startDate, this.state.endDate);
        var shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touchedexperience[field];
            return hasError ? shouldShow : false;
        };

        

        return (
        <div>

            
         <div className = "pv-entity__actions" data-toggle="modal" data-target="#experiencemodal"><span class="glyphicon glyphicon-plus"></span><FontAwesomeIcon icon="plus" color="black" size ="lg"/></div>
           <div className="modal fade  bd-example-modal-lg" id="experiencemodal" tabIndex="-1"  aria-labelledby="experiencemodallabel" aria-hidden="true"  style = {{marginTop : "40px"}}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                <label> Why I am not visible?</label>
                    <div className="modal-content">
                        <div className="modal-header">
                        
                            <h5 className="modal-title" id="experiencemodallabel">Add Experience</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            &times;
                            </button>
                        </div>
                        <div className="modal-body">
                        <label htmlFor="position-title-typeahead" className="mb1 required">Title</label>
                        <input className = "form-control" id="position-title-typeahead" value = {this.state.title} onChange = {this.changeHandler}  onBlur={this.handleBlur('title')} name = "title" placeholder="Ex: Manager" maxLength="100" type="text"/>
                        {shouldMarkError('title') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}}>&nbsp;Title is a required field</div> : (null)}

                        <label htmlFor="position-company-typeahead" className="mb1 required">Company</label>
                        <input className = "form-control" id="position-company-typeahead" value = {this.state.company} onChange = {this.changeHandler}  onBlur={this.handleBlur('company')} name = "company" placeholder="Ex: Microsoft" maxLength="100" type="text"/>
                        {shouldMarkError('company') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Company is a required field</div> : (null)}

                        <label htmlFor="position-location-typeahead" className="mb1 required">Location</label>
                        <input className = "form-control" id="position-location-typeahead" value = {this.state.location} onChange = {this.changeHandler}  onBlur={this.handleBlur('location')}  name = "location" placeholder="Ex: London, United Kingdom" maxLength="100" type="text"/>
                        {shouldMarkError('location') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Location is a required field</div> : (null)}

                        <label htmlFor="position-location-typeahead" className="mb1 required">Start Date</label>
                            <input className = "form-control" id="position-location-typeahead" value = {this.state.startDate}  onChange = {this.changeHandler}  onBlur={this.handleBlur('startDate')} name = "startDate" placeholder="Ex: 2012" maxLength="100" type="text"/>
                            {shouldMarkError('startDate') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;Start Date is a required field</div> : (null)}
    

                            <label htmlFor="position-location-typeahead" className="mb1 required">End date</label>
                            <input className = "form-control" id="position-location-typeahead" value = {this.state.endDate}  onChange = {this.changeHandler}  onBlur={this.handleBlur('endDate')} name = "endDate" placeholder="Ex: 2016" maxLength="100" type="text"/>
                            {shouldMarkError('endDate') ? <div className = "col-xs-6 col-md-6" style = {{color: "red"}} >&nbsp;End Date is a required field</div> : (null)}

                        <label htmlFor="position-description-typeahead" className="mb1 required"  >Description</label>
                        <textarea className = "form-control" name = "description" value = {this.state.description} onChange = {this.changeHandler} id="position-description-typeahead"/>
                        
                        </div>
                        <div className="modal-footer">
                                {!this.handleValidationExperience() ?
                                <div className=""  style = {{color: "red"}}>&nbsp;Please enter all fields</div> : (null)}
                                <button type="button" className="btn arteco-btn-save" data-dismiss="modal">Close</button>
                                {!this.handleValidationExperience() ?
                                <button type="submit" className="btn arteco-btn"  style = {{width : "150px"}}>Save changes</button> :
                                <button type="submit" className="btn arteco-btn"  data-dismiss="modal"  onClick = {this.submitExperience} style = {{width : "150px"}}>Save changes</button> }
                        </div>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}



function mapStateToProps (state) {
    return {
       profile: state.loginReducer.profile,
       userName: state.loginReducer.userName,
       objective : state.studentProfileReducer.objective,
       education: state.studentProfileReducer.updateEduFlag ? state.studentProfileReducer.updateEducation:state.studentProfileReducer.education,
       pictureData: state.studentProfileReducer.picture,
       skillSet : state.studentProfileReducer.studentSkillSet,
       updateExpFlag: state.studentProfileReducer.updateFlag,
       updateEduFlag : state.studentProfileReducer.updateEduFlag,
       studentAddress: state.studentProfileReducer.studentAddress,
       studentExperience : state.studentProfileReducer.updateFlag ? state.studentProfileReducer.updateExperience : state.studentProfileReducer.studentExperience,
       isLoading : state.studentProfileReducer.updateFlag ? state.studentProfileReducer.updateFlag : state.studentProfileReducer.isLoading ,
       student : state.studentProfileReducer.student
    }
}
function validateExperience(title, company, location, startDate, endDate ) {
    // true means invalid, so our conditions got reversed
    //alert(title+"--"+company+"--"+location);
    if(!title || company || location )
      {
        return true;
            
      }
    return true; 
}

function mapDispatchToProps (dispatch)
{
    return {
        updateStudentObjective: data => dispatch(updateStudentObjective(data)),
        updateStudentSkillSet: data => dispatch(updateStudentSkillSet(data)),
        updateStudentExperience: data => dispatch(updateStudentExperience(data)),
        updateStudentEducation: data => dispatch(updateStudentEducation(data)),
        getStudentEducationDetails: data => dispatch(getStudentEducationDetails(data)),
        getStudentPicture: data => dispatch(getStudentPicture(data)),
        getStudentObjectiveDetails: data => dispatch(getStudentObjectiveDetails(data)),
        getStudentExperienceDetails: data => dispatch(getStudentExperienceDetails(data)),
        getStudentSkillSetDetails: data => dispatch(getStudentSkillSetDetails(data)),
        getStudentAddressDetails: data => dispatch(getStudentAddressDetails(data)),
        updateStudentCity: data => dispatch(updateStudentCity(data)),
        updateStudentCountry: data => dispatch(updateStudentCountry(data)),
        updateStudentState: data => dispatch(updateStudentState(data)),
        getStudentProfile: data => dispatch(getStudentProfile(data))
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);