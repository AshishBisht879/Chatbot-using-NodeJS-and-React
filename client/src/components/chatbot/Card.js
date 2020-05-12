import React from 'react';
const Card = (props) => (
  <div style={{ float: 'left', width: 500 }}>

    <div className="card">
      <div style={{ border: '1px solid', textAlign: 'center' }}>
        <span className="card-title"><h5><strong>STATEMENT OF MARKS(PROVISIONAL)</strong></h5></span>
      </div>
      <div className="card-content" style={{ border: '1px solid' }}>
        <div style={{ display: "block"}}>          
          <div style={{ float: 'left', width: '50%', textAlign: 'center',height:'60px'}}>
          <div style={{ display: 'block', textAlign: 'left' }}>
            <h6><strong>ID No.  :</strong>  {props.payload.fields.UserID.stringValue}</h6>
          </div>
          <div style={{ display: 'block', textAlign: 'left' }}><h6><strong>Name :</strong> {props.payload.fields.Name.stringValue}</h6></div>
        </div>
          <div style={{ float: 'left', width: '50%', textAlign: 'center',height:'60px' }}> <h6><strong>Semester :</strong> {props.payload.fields.Semester.stringValue}</h6></div>
        </div>


        <div style={{ display: 'block', width: '100%' }}>
          <ul style={{ textAlign: 'center' }}>
            <li><strong>Subject 1</strong> : <span style={{ paddingLeft: 40 }}>{props.payload.fields.Subject_1.stringValue}</span></li>
            <li><strong>Subject 2</strong> :<span style={{ paddingLeft: 40 }}>{props.payload.fields.Subject_2.stringValue}</span></li>
            <li><strong>Subject 3</strong> : <span style={{ paddingLeft: 40 }}>{props.payload.fields.Subject_3.stringValue}</span></li>
            <li><strong>Subject 4</strong> : <span style={{ paddingLeft: 40 }}>{props.payload.fields.Subject_4.stringValue}</span></li>
            <li><strong>Subject 5</strong> : <span style={{ paddingLeft: 40 }}>{props.payload.fields.Subject_5.stringValue}</span></li>
            <li><strong>SGPA</strong>  : {props.payload.fields.SGPA.stringValue}</li>
          </ul>
        </div>

      </div>
    </div>
  </div>
);

export default Card;