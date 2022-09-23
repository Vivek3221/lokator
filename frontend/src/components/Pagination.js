import React from "react";
import { connect } from "react-redux";
function Pagination(props) {
  const { totalPage,activePage,updateActivePage } = props;
  return (
    <ul className="pagination align-center">
    {activePage> 0 && (
    <li className="page-item"><a  onClick={()=>updateActivePage(activePage-1)} className={`page-link`} href="#" aria-label="Previous">&laquo;</a></li>
    )}    
    {Array.apply(null, {length: totalPage})
.map((item,index)=>{
        return (<li key={index} className={`page-item ${activePage==index && 'active'}`}><a 
        onClick={()=>updateActivePage(index)}
        
        className="page-link" href="#">{index+1}</a></li>)
    })}
    
    
    {activePage<(totalPage-1) && (
    <li className="page-item"><a onClick={()=>updateActivePage(activePage+1)}  className="page-link" className={`page-link ${activePage==(totalPage-1) && 'disabled'}`}  href="#" aria-label="Next">&raquo;</a></li>
    )}    
  </ul>
  )
}


export default Pagination
