import React from 'react';
const Card2 = (props) =>( 
  <div style={{ float: 'left', width: 500 }}>

    <div className="card">
      <div style={{ border: '1px solid', textAlign: 'center' }}>
        <span className="card-title"><h5><strong>NOTICE</strong></h5></span>
      </div>
      <div className="card-content" style={{ border: '1px solid',paddingTop:'25px' }}>
          <ol style={{textAlign:'center'}}>
        <li><a style={{ paddingTop:8 }} rel="noopener noreferrer" target="_blank" href={props.payload.fields.Notice_1.structValue.fields.link.stringValue}>{props.payload.fields.Notice_1.structValue.fields.Name.stringValue}</a></li>
          <li><a style={{ paddingTop:8 }} rel="noopener noreferrer" target="_blank" href={props.payload.fields.Notice_2.structValue.fields.link.stringValue}>{props.payload.fields.Notice_2.structValue.fields.Name.stringValue}</a></li>
          <li><a style={{ paddingTop:8 }} rel="noopener noreferrer" target="_blank" href={props.payload.fields.Notice_3.structValue.fields.link.stringValue}>{props.payload.fields.Notice_3.structValue.fields.Name.stringValue}</a></li>
          <li><a style={{ paddingTop:8 }} rel="noopener noreferrer" target="_blank" href={props.payload.fields.Notice_4.structValue.fields.link.stringValue}>{props.payload.fields.Notice_4.structValue.fields.Name.stringValue}</a></li>
          <li><a style={{ paddingTop:8 }} rel="noopener noreferrer" target="_blank" href={props.payload.fields.Notice_5.structValue.fields.link.stringValue}>{props.payload.fields.Notice_5.structValue.fields.Name.stringValue}</a></li>
          </ol>


      </div>
    </div>
  </div>
);

export default Card2;