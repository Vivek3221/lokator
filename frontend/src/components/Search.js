import React,{useState} from "react";
import Select from "react-select";

function Search(props) {
  const { error,searchValue,setSearchValue,handleClick,handleClear } = props;
  const [isClicked,setIsClicked] = useState(false)
  return (
    <div>
      <form class="form-inline search-form">
      <div class="form-group mb-2">
            <input
              type="text"
              class="form-control"
              onChange={(e) => {
                setIsClicked(false)
                setSearchValue(e.target.value)}}
              value={searchValue}
              placeholder="Search..."
            />
          </div>
          {isClicked ?(
             <button
             type="button"
             
             onClick={()=>{
              setIsClicked(false)
              handleClear()}}
             class="btn btn-primary text-white mb-2 text-low"
           >
             Clear
             
           </button>
          ):( <button
            type="button"
            onClick={()=>{
              setIsClicked(true)
              handleClick()}}
            class="btn btn-primary text-white mb-2 text-low"
          >
            <i className="fa fa-search"></i>
            
          </button>)}
         
        </form>
       
    </div>
  );
}

export default Search;
