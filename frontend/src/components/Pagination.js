import React from "react";
import { connect } from "react-redux";
function Pagination(props) {
  const { totalPage,activePage,updateActivePage } = props;
  return (
    <ul class="pagination align-center">
    {activePage> 0 && (
    <li class="page-item"><a  onClick={()=>updateActivePage(activePage-1)} class={`page-link`} href="#" aria-label="Previous">&laquo;</a></li>
    )}    
    {Array.apply(null, {length: totalPage})
.map((item,index)=>{
        return (<li key={index} class={`page-item ${activePage==index && 'active'}`}><a 
        onClick={()=>updateActivePage(index)}
        
        class="page-link" href="#">1</a></li>)
    })}
    
    
    {activePage<(totalPage-1) && (
    <li class="page-item"><a onClick={()=>updateActivePage(activePage+1)}  class="page-link" class={`page-link ${activePage==(totalPage-1) && 'disabled'}`}  href="#" aria-label="Next">&raquo;</a></li>
    )}    
  </ul>
  )
}


export default Pagination
