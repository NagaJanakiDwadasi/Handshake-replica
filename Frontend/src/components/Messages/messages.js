import React,{Component} from 'react';
import Navbar from '../Navbar/Navbar';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import '../Profiles/Student.css';
import {getAllMessages,postMessages} from './../../redux/actions/messagesAction';
class Messages extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            messages : [{}],
            isLoading : false,
            displayMessage : null,
            enteredMessage : '',
            param : '',
            messageObject: '',
            
        }
        this.fetchMessages = this.fetchMessages.bind(this);
        this.postMessage=this.postMessage.bind(this);
    }

    fetchMessages(){
        this.props.getAllMessages();
    }

    displayMessages(param){
        this.setState({
            ...this.state,
            param : param
        })
    }

    postMessage(messageObject){
       // alert("messageObject::"+JSON.stringify(messageObject[0]));
       // alert("enteredMessage::"+JSON.stringify(this.state.enteredMessage));
       var today = new Date();
        let payload = {
            "user1" : {
                "id" : (localStorage.getItem('id') === messageObject[0].user1.id) ? messageObject[0].user1.id:messageObject[0].user2.id,
                "name" : (localStorage.getItem('name') === messageObject[0].user1.name) ? messageObject[0].user1.name : messageObject[0].user2.name 
            },
            "user2" : {
                "id" : (localStorage.getItem('id') === messageObject[0].user2.id) ? messageObject[0].user1.id:messageObject[0].user2.id,
                "name" : (localStorage.getItem('name') === messageObject[0].user2.name) ? messageObject[0].user1.name : messageObject[0].user2.name
            },
            "messages": [{
                "from" : localStorage.getItem('name'),
                "message" : this.state.enteredMessage,
                "time"   : "["+today.toISOString().slice(0,10) + " " +today.toISOString().slice(11,16) + "]"
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

    componentDidMount(){
        this.fetchMessages();
    }


    handleChange = event => {
        this.setState({ enteredMessage: event.target.value });
    };


    componentWillReceiveProps(nextProps){
        this.setState({
            ...this.state,
        messages : !nextProps.messages ? this.state.messages:nextProps.messages,
        isLoading : !nextProps.isLoading ? this.state.isLoading : nextProps.isLoading
      });
    }

    render() {  
        var testResult=null;
        var idisplayMessages = null;
        if(this.state.isLoading){
            //alert("inside isLoading true");
            testResult = this.state.messages.map((item,key)=>
           <div>
           <div className="panel">
             <div className="panel-body" style={{backgroundColor: "skyblue"}}>
               <h3 onClick={this.displayMessages.bind(this,item._id)}>{ (localStorage.getItem('name') === item.user1.name) ?item.user2.name : item.user1.name}</h3>
               
             </div>
           </div>
         </div> 
           );
         }
         const { param, messages } = this.state;
         if(this.state.isLoading){
             //alert("inside second");
             //alert("param::"+param);
             //alert("messages::"+JSON.stringify(messages));
        idisplayMessages = messages.filter(item => 
            Object.keys(item).some(key => typeof item[key] === 'string' && item[key]=== this.state.param));
            var filteredObject=idisplayMessages;
            idisplayMessages=idisplayMessages.map(function(item,key){
                var messages = item.messages;
                return (
                    <div>
                        {messages.map(function(value,index){
                            return (
                                    <div>
                                        <h4> {messages[index].from} : {messages[index].message}     {messages[index].time} </h4>
                                    </div>
                                    
                            )
                        }
                        )}
                    </div>
                   

                )
            })
            
        }
          
            // alert(JSON.stringify(idisplayMessages[0]));
            // var test = idisplayMessages.map((item,key)=>
            //         <div className="panel">
            //             <div className="panel-body" style={{backgroundColor: "lightgrey"}}>
            //                     <h1> {key}</h1>
            //                 </div>
            //             </div>
            //   );
            //alert(JSON.stringify(test._id));
            const {enteredMessage} = this.state;
            
        return (  
        <div>
            <Navbar/>
            <div className="container">
                    <div className="col-md-3">
                        <div className="profile-sidebar">
                            {testResult}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="panel">
                            <div className="panel-body" style={{backgroundColor: "lightgrey"}}>
                                {idisplayMessages}
                                <textarea placeholder="Enter your message" rows="4" cols="50" onChange={this.handleChange} value={enteredMessage}></textarea>
                                <button class="btn btn-primary" onClick={this.postMessage.bind(this,filteredObject)}>Send</button>    
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
        messages: state.messagesReducer.result,
        isLoading : state.messagesReducer.isLoading
    }
}

function mapDispatchToProps (dispatch)
{
    return {
        getAllMessages: data => dispatch(getAllMessages(data)),
        postMessages: data => dispatch(postMessages(data))
        
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Messages);