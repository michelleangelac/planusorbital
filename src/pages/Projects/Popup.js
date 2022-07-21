import React from "react";
import './Projects.css';

const PopupPrj = props => {
    return (
      <div className="popup-box-prj">
        <div 
          className="box-prj"
          style={{ 
            position: 'fixed', 
            width: '70vh', 
            height: '70vh',
            margin: '15vh 0 0 75vh' 
          }}>
          <span 
            className="close-icon-prj" 
            onClick={props.handleClose}
            style={{ position: 'fixed', top: '16%', left: '51%' }}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
};

export default PopupPrj;