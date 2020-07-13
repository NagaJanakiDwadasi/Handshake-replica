import React,{Component} from 'react';
import Navbar from './../Navbar/Navbar';
import {connect} from 'react-redux';
import './../Profiles/Student.css';
import {getCompanyDetails, updateCompanyName, updateCompanyContact, updateCompanyLocation, updateCompanyDescription} from '../../redux/actions/companyAction';
import EdiText from 'react-editext';

class Company extends Component{

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
        this.onSaveName = this.onSaveName.bind(this);
        this.onSaveLocation = this.onSaveLocation.bind(this);
        this.onSaveContact = this.onSaveContact.bind(this);
        this.onSaveDescription = this.onSaveDescription.bind(this);
    }

    fetchCompanyDetails(){
        this.props.getCompanyDetails(localStorage.getItem("userId"));
    }

    onSaveName = (val) => {
        this.props.updateCompanyName(val)
    }

    onSaveContact = (val) => {
        this.props.updateCompanyContact(val)
    }

    onSaveLocation = (val) => {
        this.props.updateCompanyLocation(val)
    }

    onSaveDescription = (val) => {
        this.props.updateCompanyDescription(val)
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
                        <div className="col-md-3"><div className="profile-userpic">
                                <img src="https://static.change.org/profile-img/default-user-profile.svg" 
                                className="img-responsive" alt="" style={{width: "300px", height: "300px"}}/>
                                <input type="file" style={{alignContent: "center"}}/>
                                <button type="button" className="btn btn-primary btn-sm">upload</button> 
                            </div></div>
                            <div className="col-md-9"><h1><EdiText
                                type='text'
                                value={this.state.company_info.company_name} onSave={this.onSaveName}/>
                            </h1><br/>
                            <h4><span class="glyphicon glyphicon-map-marker"/><EdiText
                                type='text'
                                value={this.state.company_info.location} onSave={this.onSaveLocation}/>
                            </h4>
                            <br/>
                            <h4><span class="glyphicon glyphicon-envelope"/><EdiText
                                type='text'
                                value={this.state.company_info.email_id} onSave={this.onSaveContact}/>
                            </h4></div>  
                            
                        </div>
                    </div>
                    <div className="panel" style={{backgroundColor: "skyblue"}}>
                        <div className="panel-body">
                            <br/>
                            <h2>About us:</h2><br/>
                            <h4><EdiText
                                type='text'
                                value={this.state.company_info.description} onSave={this.onSaveDescription}/></h4>
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
        getCompanyDetails: data => dispatch(getCompanyDetails(data)),
        updateCompanyName: data => dispatch(updateCompanyName(data)),
        updateCompanyContact: data => dispatch(updateCompanyContact(data)),
        updateCompanyLocation: data => dispatch(updateCompanyLocation(data)),
        updateCompanyDescription: data => dispatch(updateCompanyDescription(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Company);
