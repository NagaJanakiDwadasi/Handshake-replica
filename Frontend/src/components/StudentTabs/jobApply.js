import React,{Component} from 'react';
import './JobDescription.css'

class JobApply extends Component{

    render() {  
        return (  
        <div className='popup' style={{backgroundColor: "white"}}>  
                <input type="file" onChange={this.props.uploadResume} style={{textAlign: "center"}} />
                <button type="button" className="btn btn-success" onClick={this.props.submitApplication} >Submit Application</button> &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.props.closePopup}>close me</button>  
        </div>  
        );  
        }  

}


export default JobApply;