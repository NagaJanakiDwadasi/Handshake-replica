import React,{Component} from 'react';
import './JobDescription.css'

class JobDescription extends Component{

    render() {  
        return (  
        <div className='popup'>  
        <div className='popup\_inner' style={{backgroundColor: "white"}}>  
        <h1 style={{color:"black"}}>{this.props.title}</h1>
        <h2 style={{color:"black"}}>{this.props.description}</h2>  
        <h3 style={{color:"black"}}>{this.props.location}</h3> 
        <h2 style={{color:"black"}}>{this.props.jobType}</h2>
        <button type="button" className="btn btn-info" onClick={this.props.closePopup}>Close</button>  
        </div>  
        </div>  
        );  
        }  

}


export default JobDescription;