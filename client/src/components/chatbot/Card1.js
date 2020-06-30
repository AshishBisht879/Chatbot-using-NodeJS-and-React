import React from 'react';
const Card1 = (props) => (
    <div style={{ float: 'left', width: 500,boxShadow: "5px 5px 5px rgba(0,0,0,0.7)" }}>

        <div className="card">
            <div style={{ border: '1px solid', textAlign: 'center' }}>
                <span className="card-title"><h5><strong>Syllabus</strong></h5></span>
            </div>
            <div className="card-content" style={{ border: '1px solid' }}>
                <div style={{ float: 'left', width: '50%', textAlign: 'center' }}>
                    <div style={{ display: 'block', textAlign: 'left' }}>
                        <h6><strong>Course :</strong>  {props.payload.fields.Course.stringValue}</h6>
                    </div>
                </div>
                <div style={{ float: 'left', width: '50%', textAlign: 'center' }}> <h6><strong>Semester :</strong> {props.payload.fields.Semester.stringValue}</h6></div>
                <ul style={{ textAlign: 'center', marginTop: 20 }}>
                    <li><strong>{props.payload.fields.Subject_1.stringValue}</strong></li>
                    <li><strong>{props.payload.fields.Subject_2.stringValue}</strong></li>
                    <li><strong>{props.payload.fields.Subject_3.stringValue}</strong></li>
                    <li><strong>{props.payload.fields.Subject_4.stringValue}</strong></li>
                    <li><strong>{props.payload.fields.Subject_5.stringValue}</strong></li>
                    <li style={{ marginTop: 20 }}><strong><a rel="noopener noreferrer" target="_blank" href={props.payload.fields.link.stringValue}>{props.payload.fields.Course.stringValue} Syllabus</a></strong></li>
                </ul>

            </div>
        </div>
    </div>
);

export default Card1;