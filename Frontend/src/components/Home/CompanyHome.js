import React,{Component} from 'react';
import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
import './../Profiles/Student.css';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/Navbar';
import {jobPosting,getJobOpenings} from './../../redux/actions/jobAction';
import {jobReducer} from './../../redux/reducers/jobReducer';
import ReactPaginate from 'react-paginate';
import './pagination.css';
class CompanyHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            title:null,
            posting_date: null,
            deadline: null,
            location: null,
		    salary: null,
		    job_type: null,
		    description: null,
		    job_category: null,
            company_id: null,
            job_openings : [],
            offset: 0,
            perPage: 5,
            currentPage: 0,
            pageCount: null
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.fetchJobOpenings=this.fetchJobOpenings.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        
    }

    handleChange = e => {
        this.setState({ ...this.state, [e.target.name] : e.target.value} );
    }

    handleSubmit = e => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            deadline: this.state.deadline,
            description : this.state.description,
            location : this.state.location,
            salary : this.state.salary,
            job_type : this.state.job_type,
            company_id : localStorage.getItem("id"),
            company_name : localStorage.getItem("name")

        };

        this.props.jobPosting(data)
    }

    fetchJobOpenings(){
        this.props.getJobOpenings();
    }


    componentDidMount(){
        this.fetchJobOpenings();
    }


    test(){
        alert("inside test");
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

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          job_openings : !nextProps.jobOpenings? this.state.job_openings:nextProps.jobOpenings,
          pageCount: Math.ceil(this.state.job_openings.length / this.state.perPage)
          
        }
       );	
      }


    
    render(){
        const count = this.state.job_openings.length;
        const slice = this.state.job_openings.slice(this.state.offset, this.state.offset + this.state.perPage);
        const ConnectedList = ({ job_openings }) => (
            <ul className="list-group list-group-flush">
              {job_openings.map(el => (
                <li className="list-group-item" key={el._id}>
                  {el.title}
                </li>
              ))}
            </ul>
          );

          const testResult = slice.map((item,key)=>
          <div class="row">
            <div className="col-sm-6" >{item.title}</div>
            <div className="col-sm-6" ><Link to={{pathname: "/viewJobApplications/"+item._id+"/"+item.title}} class="btn btn-primary" >View Applications</Link></div>
            <br/>
            <br/>
            <br/>
          </div> 
          );
          
          
            
          let paginationElement = (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(this.state.job_openings.length / this.state.perPage) > 1 ? Math.ceil(this.state.job_openings.length / this.state.perPage) : 10}
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
        
                <h1>Welcome {this.props.userName}!</h1>
                <div className="container">
                    <div className="row profile">
                        <div className="col-md-12">
                            <div className="profile-content">
                                    <div className="panel">
                                        <div className="panel-body">
                                           <form onSubmit={this.handleSubmit}>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="title" placeholder="Job Title"  />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="deadline" placeholder="Application Deadline"  />
												</div>
                                                <div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="location" placeholder="Job Location"  />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="salary" placeholder="Salary"  />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="description" placeholder="Job description"  />
												</div>
												<div class="form-group">
													<input type="text" onChange={this.handleChange} class="form-control" name="job_type" placeholder="Job Type"  />
												</div>
												<button class="btn btn-success">Post Job</button>   
											</form>  
                                        </div>
                                    </div>
                                    <div className="panel">
                                    {paginationElement}
                                            <div className="panel-body">
                                                <h4>Previous job postings</h4><br/><br/>
                                                
                                                   
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

function mapStateToProps (state) {
    return {
       jobPosting: state.jobReducer.jobPosting,
       jobOpenings :state.jobReducer.jobOpenings
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        jobPosting: data => dispatch(jobPosting(data)),
        getJobOpenings: data => dispatch(getJobOpenings(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome);