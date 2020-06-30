import React, { Component } from "react"; //react is default export and Component in Named export (In a module we can have one default export and many named export )
import axios from "axios/index"; //axios to send request to backend

class contact extends Component {


    

constructor(props)
{

    super(props);
    this.form = {
        name: "",
        email: "",
        message: "",
    };
    

   this.state={
        email: "None",
        response:""
    }; 

    this.handleSubmit = this.handleSubmit.bind(this);
}

 
                       


    
    handleSubmit(event) {                 //This method is triggered when Result login form is submitted
        event.preventDefault();             //prevent the event on submitted i.e. reload of page
        event.stopPropagation();
        document.getElementById("sending").innerHTML="Sending...";
        const user = {
            name: this.form.name,
            email: this.form.email,
            message: this.form.message
        };
        axios.post("/api/contact_admin", { user}).then((res) => {           //sending the form data to URL
            try {
                   
                if (res.data.response === "Submitted_success") {                         //checking if the response is String i.e "Submitted_success"
                  this.setState({
                       response:"Submitted_success",
                       email:res.data.email
                   });

                } else {                                                   //when response is result then send that object to msg
                    this.setState({
                        response:"Message not Submitted Network Error or Server Error",
                        email:null
                    });
                }
            } catch (error) {
                alert("Couldn't connect to Server Try Later");
            }
        });
    }







    handleChange1 = (event) => {                                               //this method is triggered when Name input field is filled
        this.form.name = event.target.value;
        // this.setState({name: event.target.value});
    };

    
    handleChange2 = (event) => {                                               //this method is triggered when email input field is filled
        this.form.email = event.target.value;
        // this.setState({name: event.target.value});
    };

    
    handleChange3 = (event) => {                                               //this method is triggered when msg input field is filled
        this.form.message = event.target.value;
        // this.setState({name: event.target.value});
    };

    render() {
        if(this.state.email===null)
        {
            
            return(
                <div style={{border:"1px solid ",marginTop:"60px",boxShadow: "5px 5px 5px rgba(0,0,0,0.7)",padding:"10px",height:"120px"}}>
                <div style={{float:"left",height:"100%",margin:"10px"}}><img  src="data:image/jpeg;base64,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" height="80px" alt="Error"/></div>
                <div style={{float:"left",height:"100%"}}><h3>{this.state.response} </h3></div>
            </div>
            )
        }

        else if(this.state.response==="Submitted_success")
        {
          
            return(
                <div style={{border:"1px solid ",marginTop:"60px",boxShadow: "5px 5px 5px rgba(0,0,0,0.7)",padding:"10px",height:"120px"}}>
                    <div style={{float:"left",height:"100%",margin:"10px"}}><img style={{borderRadius:"50%"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwUKgIlg2vHBh2Kgw2cUVrR8xD9mT9Zos1tQ&usqp=CAU" height="80px" alt="Confirm"/></div>
                    <div style={{float:"left",height:"100%"}}><h3>Message successfully Submitted for </h3>
                    <h3>{this.state.email}</h3></div>
                </div>
            )
        }
        else 
        {
        return (<div style={{ marginTop: 30 }}><h5>For Help Or Queries Related</h5>
            <h5>Ashish Bisht</h5>
            <h5>Email : <a href={`mailto:${"naffrio123@gmail.com"}?subject=${'Query Message'}`}>naffrio123@gmail.com</a></h5>

            <br /> <br />

            <div id="after_submit"></div>
            <form id="contact_form" method="POST"  onSubmit={this.handleSubmit} >
                <span ><h5>Your Name:</h5></span>
                <input style={{ border: "2px solid",paddingLeft: "10px",borderRadius:"10px" }} id="name" class="input" name="name" type="text" placeholder="Name" required onChange={this.handleChange1} /><br />

                <span ><h5>Your Email:</h5></span>
                <input style={{ border: "2px solid",paddingLeft: "10px",borderRadius:"10px" }} id="email" class="input" name="email" placeholder="Email" type="email" required onChange={this.handleChange2}/><br />

                <span ><h5>Your Message:</h5></span>
                <textarea placeholder="Your Message.." style={{ border: "2px solid", height: "auto", padding: "10px",borderRadius:"10px"  }} cols="30" rows="8" required onChange={this.handleChange3}></textarea><br />

                <input style={{ border: "2px solid",padding:"5px",marginTop:"10px",borderRadius: "10px",fontWeight:"500" }} id="submit_button" value="Send Message" type="submit"/><br/>

                <div  style={{marginTop:"20px"}}><h3 id="sending"> </h3></div>
             </form>
        </div>
        )

        }


    
    }
}

export default contact;