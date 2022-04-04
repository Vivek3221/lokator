import React from "react";
import Logo from "../assests/images/logo.jpeg";
import { NavLink, Link } from "react-router-dom";

export default function Modal({content,header,width=400,show,onClose}) {
  return (
      <>
      {show && (
    <div  className={`modal ${show && "fade show"}`} tabIndex={-1} role="dialog" >
    <div  onClick={onClose} className={`modal-backdrop fade ${show && " show"}`}></div>
        <div className="modal-dialog modal-dialog-centered" role="document" style={{maxWidth:width}}>
          <div className="modal-content">
              
              {header && (
            <div className="modal-header">
                <h3>{header}</h3>
              <button type="button" onClick={onClose} className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>)}
            <div className="modal-body">
              {content}
            </div>
            
          </div>
        </div>
        
      </div>
      )}
     
      </>
      
  );
}


