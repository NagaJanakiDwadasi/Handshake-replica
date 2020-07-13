import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {getAllJobOpenings,applyJob} from '../../redux/actions/jobAction';
import JobDescription from '../StudentTabs/JobDescription';
import JobApply from '../StudentTabs/jobApply';
import ReactPaginate from 'react-paginate';
import './pagination.css';

class StudentHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            all_job_openings : [],
            filter : '',
            showPopup : false,
            jobDescription : '',
            location : '',
            company_name : '',
            title :'',
            job_type : '',
            showApplyPopup : false,
            job_id : '',
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: null
            
        };
        this.fetchAllJobOpenings=this.fetchAllJobOpenings.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        
    }

    togglePopup(param) { 
        this.setState({  
             showPopup: !this.state.showPopup,
             jobDescription: !param ? this.state.description : param.description ,
             location: !param ? this.state.location : param.location,
             company_name: !param ? this.state.company_name : param.companyName,
             title: !param ? this.state.title : param.title,
             job_type: !param ? this.state.job_type : param.jobType,
        });  
         }  

         handlePageClick = e => {
            alert("inside handle");
            const selectedPage = e.selected;
            const offset = selectedPage * this.state.perPage;
    
            this.setState({
                currentPage: selectedPage,
                offset: offset
            }
            );
    
        };
         

     toggleApplyPopup(param){
         this.setState({
            showApplyPopup : !this.state.showApplyPopup,
            job_id : !param ? this.state.job_id : param._id,
            company_id : !param ? this.state.company_id : param.companyId,
            selectedFile : null
         });
     }    


    handleChange = event => {
        this.setState({ filter: event.target.value });
      };

    fetchAllJobOpenings(){
        this.props.getAllJobOpenings();
    }

    resumeHandler = event => {
        this.setState({
            ...this.state, selectedFile: event.target.files[0]
        })
    }
    uploadResume = () => {
        alert(JSON.stringify(this.state.job_id));
        if(this.state.selectedFile){
          const fd = new FormData();
          fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
          fd.append('student_id',localStorage.getItem('id'));
          fd.append('job_id',this.state.job_id);
          fd.append('company_id',this.state.company_id);
          fd.append('job_status','Pending');
          fd.append('student_name',localStorage.getItem('name'));
        
          this.props.applyJob(fd);
      }
      else{
          alert("No document selected to upload")
      }
    }

   
    
    componentDidMount(){
        this.fetchAllJobOpenings();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          all_job_openings : !nextProps.allJobOpenings? this.state.all_job_openings:nextProps.allJobOpenings,          
        }
       );	
      }



    render(){

        const slice = this.state.all_job_openings.slice(this.state.offset, this.state.offset + this.state.perPage);
        const allOpenings =  slice.map((item,key)=>
        <li>
            <div className="row profile">
                  <div className="col-md-6">
                      <a href="#" onClick={this.togglePopup.bind(this,item)}>
                      {item.title} </a> <br/> <Link to={'/companyView/'+item.companyId}>{item.companyName} </Link> <br/>  {item.location} <br/> 
                  </div>
                  <div className="col-md-6">
                      <br/><button class="btn btn-primary" onClick={this.toggleApplyPopup.bind(this,item)}>Apply</button>
                  </div>
              </div>
        </li>
          );

          const { filter, all_job_openings } = this.state;
          const filteredData = all_job_openings
          .filter(item => 
          Object.keys(item).some(key => typeof item[key] === 'string' && item[key].toLowerCase().includes(filter.toLowerCase())))
          .map((item,key)=>
          <li>
              <div className="row profile">
                  <div className="col-md-6">
                      <a href="#" onClick={this.togglePopup.bind(this,item)}>
                      {item.title} </a> <br/> <Link to={'/companyView/'+item.companyId}>{item.companyName} </Link> <br/>  {item.location} <br/> 
                  </div>
                  <div className="col-md-6">
                      <br/><button class="btn btn-primary" onClick={this.toggleApplyPopup.bind(this,item)}>Apply</button>
                  </div>
              </div>
          </li>
            );

            let paginationElement = (
                <ReactPaginate
                  previousLabel={"← Previous"}
                  nextLabel={"Next →"}
                  breakLabel={<span className="gap">...</span>}
                  pageCount={Math.ceil(this.state.all_job_openings.length / this.state.perPage) > 1 ? Math.ceil(this.state.all_job_openings.length / this.state.perPage) : 10}
                  onPageChange={this.handlePageClick}
                  forcePage={this.state.currentPage}
                  containerClassName={"pagination"}
                  previousLinkClassName={"previous_page"}
                  nextLinkClassName={"next_page"}
                  disabledClassName={"disabled"}
                  activeClassName={"active"}
                />
              );

        return (
            <div>
                <Navbar/>
                <h1>Welcome {localStorage.getItem('user')}!</h1>
                <div className="container">
                    <div className="row profile">
                        <div className="col-md-12">
                            <div className="profile-content">
                                <div className="panel">
                                    <div className="panel-body">
                                    <span class="glyphicon glyphicon-search"></span> &nbsp;
                                        <input value={filter} onChange={this.handleChange} placeholder="company name or job title or location" style={{width: 300, height: 30}}/>  
                                    </div>
                                </div>
                                <div className="panel">
                                    <div className="panel-body">
                                    <h4>Job postings</h4>
                                    {paginationElement}
                                     <div className="profile-usermenu">
                                      <ul className="nav">
                                         {filter ? filteredData :  allOpenings}
                                        
                                    
                                       
                                      </ul>
                                     </div>
                                     {this.state.showPopup ?  
                                        <JobDescription  
                                                description={this.state.jobDescription}
                                                location = {this.state.location} 
                                                companyName = {this.state.company_name}
                                                title = {this.state.title}
                                                jobType = {this.state.job_type}
                                                closePopup={this.togglePopup.bind(this)}  
                                        />  
                                        : null  
                                    } 
                                    {this.state.showApplyPopup ?  
                                        <JobApply  
                                                uploadResume = {this.resumeHandler.bind(this)}  
                                                submitApplication ={this.uploadResume.bind(this)}  
                                                closePopup={this.toggleApplyPopup.bind(this)}  
                                        />  
                                        : null  
                                    } 
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
       allJobOpenings :state.jobReducer.allJobOpenings,
       isApplied:state.jobReducer.isApplied
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getAllJobOpenings: data => dispatch(getAllJobOpenings(data)),
        applyJob: data => dispatch(applyJob(data))
        
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentHome);