import React from "react";
import './Projects.css';

const PopupPrj = props => {
    return (
      <div className="popup-box-prj">
        <div 
          className="box-prj"
          style={{ 
            position: 'fixed', 
            width: '100vh', 
            height: '80vh',
            margin: '10vh 0 0 75vh' 
          }}>
          <span 
            className="close-icon-prj" 
            onClick={props.handleClose}
            style={{ position: 'fixed', top: '11%', left: '65.25%' }}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
};

export default PopupPrj;