import React from 'react';
const About = () => {
    return (<div style={{ marginTop: 30 }}><h5>For Help Or Queries Related</h5>
        <h5>Ashish Bisht</h5>
        <h5>Email : <a href={`mailto:${"xyz@gmail.com"}?subject=${'Query Message'}`}>xyz@gmail.com</a></h5>
        
        <br/> <br/>

                <div id="after_submit"></div>
        <form id="contact_form"  method="POST" >
        <span >Your name:</span><br />
                <input style={{border:"1px solid"}} id="name" class="input" name="name" type="text"  /><br />

                <span >Your email:</span><br />
                <input style={{border:"1px solid"}} id="email" class="input" name="email" type="text" /><br />

                <span >Your message:</span><br />
                <textarea  placeholder="Your Message" style={{border:"1px solid",height:"auto",padding:"10px"}} cols="30" rows="8"></textarea><br />

                <input style={{border:"1px solid",borderRadius:"5px"}} id="submit_button" type="submit" value="Send Message" />

            
        </form>
        
        </div>

        
        )
}
export default About; 