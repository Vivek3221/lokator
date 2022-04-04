import React from 'react'
import  Modal  from './Modal'
export default function ConfirmModal({content,show,handleModal,handleClose}) {
    return (
        <Modal show={show} content={<div className="confirm_box">
        <h3>        {content}  
        </h3>
        <div className="btn-group">
                      <button type="button" onClick={()=> handleClose()}  className="btn-transprent  btn text-white">
                        Cancel
                        </button>
                        <button type="button" onClick={()=> handleModal()} className="btn-primary  btn text-white">
                        Continue
                        </button>
                      </div>
</div>} />
    )
}
