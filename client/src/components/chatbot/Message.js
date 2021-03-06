//functional component of React to rendering text messages
import React from 'react';
const Message = (props) => (
    <div className="col s12 m8 offset-m2 offset-l3 ">
        <div className="card-panel #ffa726 blue lighten-1 " style={{borderRadius:10}}>
            <div className="row">
                {props.speaks === 'bot' &&                                     //true && expression = expression  
                    <div style={{marginRight:"50px",marginLeft:"5px"}}>
                        <button className="waves-effect orange waves-light btn"> {props.speaks}</button>
                    </div>
                }
                <div className="col s10">
            <span className="black-text"><h5>{props.text}</h5></span>
                </div>

                {props.speaks === 'user' &&                                     //true && expression = expression  
                    <div className="col s2">
                       <button className="right waves-effect orange waves-light btn">{props.speaks}</button>
                    </div>
                }
            </div>
        </div>
    </div>
);

export default Message;