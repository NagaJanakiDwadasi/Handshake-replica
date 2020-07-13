import React,{Component} from 'react';
import './../StudentTabs/JobDescription.css';
import {ReactPDF} from 'react-pdf';

class ResumeView extends Component{

    render() {  
        
        return (  
        <div className='popup'>  
        <iframe style={{width:"1000px", height:"600px"}} src={'data:application/pdf;base64,' + this.props.resume} /><br/><br/>
        <button type="button" className="btn btn-primary" onClick={this.props.review} value="Reviewed">Reviewed</button> &nbsp;
        <button type="button" className="btn btn-primary" onClick={this.props.decline} value="Decline">Decline</button> &nbsp;
        <button type="button" className="btn btn-danger" onClick={this.props.closePopup}>Close</button>  
        </div>  
        );  
        }  

}


export default ResumeView;