import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar';
import {connect} from 'react-redux';
import './../Profiles/Student.css';
import {getCompanyDetails} from '../../redux/actions/companyAction';

class CompanyView extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            company_id : '',
            company_name : '',
            company_info : {
                company_id : '',
                company_name : '',
                location : '',
                email_id : '',
                description : ''
            }
        };
        this.fetchCompanyDetails.bind(this);
    }

    fetchCompanyDetails(){
        this.props.getCompanyDetails(this.props.match.params.company);
    }

    componentDidMount(){
        this.fetchCompanyDetails();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          company_info : !nextProps.companyInfo? this.state.company_info:nextProps.companyInfo,          
        }
       );	
      }


    render() { 
        return (  
        <div>
            <Navbar/>
            <div className="container">
                <div className="row profile">
                    <div className="panel">
                        <div className="panel-body" style={{backgroundColor: "skyblue"}}>
                            <h1>{this.state.company_info.companyName}</h1>
                            <br/>
                            <h4><span class="glyphicon glyphicon-envelope"></span> {this.state.company_info.email}</h4>
                        </div>
                    </div>
                    <div className="panel" style={{backgroundColor: "skyblue"}}>
                        <div className="panel-body">
                            <h2>About us:</h2><br/><br/>
                            <h3>{this.state.company_info.description}</h3>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
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
       companyInfo :state.companyReducer.companyDetails
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getCompanyDetails: data => dispatch(getCompanyDetails(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyView);
