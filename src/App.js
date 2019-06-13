import React from 'react';
import './app.css'


class App extends React.Component {  
  
state = {    
value: '',
emails:[],
emailList:["faiz@gmail.com","arun@gmail.com","richard@gmail.com","khalidee@yahoo.com","mopetown@msn.com"],
error:null,
flag:0
  } 


componentDidMount=()=>{
  var str=''; // variable to store the options
  var emailList = [...this.state.emailList];
  var emailsIn = [...this.state.emails];
  emailList = emailList.filter( ( el ) => !emailsIn.includes( el ) );
 
  for (var i=0; i < emailList.length;++i){
  str += '<option value="'+emailList[i]+'" />'; // Storing options in variable
  }
  var my_list=document.getElementById("emailList");
  my_list.innerHTML = str;

}

componentDidUpdate=()=>{
  var str=''; // variable to store the options
  var emailList = [...this.state.emailList];
  var emailsIn = [...this.state.emails];
  emailList = emailList.filter( ( el ) => !emailsIn.includes( el ) );
  
 
  for (var i=0; i < emailList.length;++i){
  str += '<option value="'+emailList[i]+'" />'; // Storing options in variable
  }
  var my_list=document.getElementById("emailList");
  my_list.innerHTML = str;

}

handleChange = (evt) => {  
  this.setState(
    {      value: evt.target.value    }
    
    );  

};
  

//
handleKeyDown = (evt) => {  
  if (['Enter', 'Tab', ','].includes(evt.key))
   {    
     evt.preventDefault();
    var email = this.state.value.trim(); 

    if (email && this.isValid(email)) 
    {
      var element = document.getElementById("error2");
      var element1 = document.getElementById("error1")
      element1.classList.remove("has-error");
      if(element!=null){

        element.innerHTML="";
      }
      this.setState({
        emails: [...this.state.emails, email],
        value: '',
        flag:0
      });    
  }
  }
   if (evt.keyCode === 8) {
     if (this.state.flag ===1 && this.state.value===''){
       var last =this.state.emails[this.state.emails.length-1];
       this.setState({
         flag:0,
          emails: this.state.emails.filter(el=>el!==last)
       })
     }
     else if (this.state.flag===0 && this.state.value===''){
       this.setState({
         flag:1
       })
     }
        console.log('BACKSPACE was pressed');

        // Call event.preventDefault() to stop the character before the cursor
        // from being deleted. Remove this line if you don't want to do that.
    }
  }



  //copy and paste emails from documents

  handlePaste = (evt) => {  
    evt.preventDefault();
    var paste = evt.clipboardData.getData('text');  
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);
    if (emails) {
      var toBeAdded = emails.filter(email => !this.isInList(email));
      this.setState({
        emails: [...this.state.emails, ...toBeAdded]
      });  
    
    }};

  isEmail(email) 
  {  return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  isInList(email) {  
    return this.state.emails.includes(email);
  }

  isValid(email) {
    var error = null;
    if (!this.isEmail(email))
    {    error = `${email} is not a valid email address.`;  }
  if (this.isInList(email)) 
  {
    error = `${email} has already been added.`;
  }
  if (error) {
    this.setState({ error });
    return false;
  }
  return true;
} 

handleDelete = (toBeRemoved) => {  
  this.setState({ 
    emails: this.state.emails.filter(email => email !== toBeRemoved) 
  });};
  render() 

  {    
    let classes= "tag-email ";
    classes+= (this.state.flag==1)?"highlight":"no-high";

    const {error,emails}= this.state;
    return (<main className="wrapper">
       
    {emails.map(email => <div className={classes} key={email}>{email}
    <button className="button" type="button"      
    onClick={() =>this.handleDelete(email)}>
      ×</button>
      
      </div>)}
    <input list="emailList" id = "error1"className={'input ' + (error && ' has-error')}     
    placeholder="Type or paste email addresses and press `Enter`..."      
    value={this.state.value}      
    onChange={this.handleChange}      
    onKeyDown={this.handleKeyDown}
    onPaste={this.handlePaste}
    /><datalist id="emailList">
    </datalist>

     {error && <p id ="error2" className="error">{error}</p>} 
      </main>  
   );  
  
  }


}
export default App;
