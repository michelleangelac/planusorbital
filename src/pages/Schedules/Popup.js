import React from "react";
import './Schedules.css';

const PopupSch = props => {
    return (
      <div className="popup-box-sch1">
        <div 
          className="box-sch1"
          style={{ 
            position: 'fixed', 
            width: '70vh', 
            height: '70vh',
            margin: '15vh 0 0 75vh' 
          }}>
          <span 
            className="close-icon-sch1" 
            onClick={props.handleClose}
            style={{ position: 'fixed', top: '16%', left: '51%' }}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
};

export default PopupSch;