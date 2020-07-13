import React,{Component} from 'react';
import Navbar from './Navbar/Navbar';
import {getAllStudents} from './../redux/actions/companyAction';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Students extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            students: [],
            filter : ''
        }
        this.fetchAllStudents = this.fetchAllStudents.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    fetchAllStudents = () => {
        this.props.getAllStudents();
    }

    componentDidMount(){
        this.fetchAllStudents();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
          ...this.state,
          students : !nextProps.students? this.state.students : nextProps.students,          
        }
       );	
      }

    render() {  

        const allStudents =  this.state.students.map((item,key)=>
            <div className="panel">
                <div className="panel-body">
                    <h3>{item.name}</h3>
                    <h4>{item.collegeName}</h4>
                    <h4>{item.major}</h4>
                    <h4>{item.skillSet}</h4>
                </div>
            </div>
        );

        const { filter, students } = this.state;
          const filteredData = students
          .filter(item => 
          Object.keys(item).some(key => typeof item[key] === 'string' && item[key].toLowerCase().includes(filter.toLowerCase())))
          .map((item,key)=>
          <div className="panel">
                <div className="panel-body">
                    <h3><Link to={'/studentView/'+item._id}>{item.name}</Link></h3>
                    <h4>{item.collegeName}</h4>
                    <h4>{item.major}</h4>
                    <h4>{item.skillSet}</h4>
                </div>
            </div>
        );

        return (  
        <div>
            <Navbar/>
            <div className="container">
                <div className="row profile" style={{backgroundColor: "white"}}>
                    <div className="panel">
                        <div className="panel-body" style={{backgroundColor: "skyblue"}}>
                            <span class="glyphicon glyphicon-search"></span> &nbsp;
                            <input value={filter} onChange={this.handleChange} placeholder="student name or college name or skillset" style={{width: 300, height: 30}}/>
                        </div>
                    </div>
                    {this.state.students.length === 0 && allStudents}
                    {this.state.students.length !== 0 && filteredData}
                </div>
            </div>
        </div>  
        );  
        }  

}

function mapStateToProps (state) {
    return {
        students :state.companyReducer.allStudents
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getAllStudents: data => dispatch(getAllStudents(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Students);