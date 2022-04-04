import React, { Component,useState,useEffect } from "react";
import { getCapacity,addCapcity,editCapacity } from "../../../store/actions/allapi";
import {Pagination,Modal,Input,FocusError,Search,ConfirmModal} from '../../../components';
import { Formik, Field, Form } from "formik";
import {capacityValidator }from '../../../utils/validation'
import { connect } from "react-redux";
import {get} from 'lodash';
const CapacityManagement = ({getCapacity,editCapacity,addCapcity,allapi:{capacity}}) => {
  const [activePage,setActivePage] = useState(0)
  const [showModal,setShowModal] = useState("")
  const [searchValue,setSearchValue] = useState("")
  const [changeStatus, setChangeStatus] = useState("");

  useEffect(()=>{
    getCapacity(activePage,searchValue)
  },[activePage])

  const handleSubmit = (values)=>{
    setActivePage(0)
    if(showModal == 'true'){
      addCapcity(values);  
    }
    else{
      editCapacity({...values,id:showModal.id})
    }
    
    setShowModal(false)
  }
  
  
  return (
    <div className="container-fluid">
        {/* Breadcrumbs*/}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Capacity</li>
        </ol>
        <div className="header-with-search mb-20">
        <Search setSearchValue={setSearchValue}
              searchValue={searchValue} handleClick={() => getCapacity(0, searchValue)} handleClear={()=> {getCapacity(activePage,"")
              setSearchValue("")}
              } /> 
        <button  onClick={()=> setShowModal("true")} className="btn btn-primary text-white">
          Add Capacity
          </button>
        </div>
        <div className="card mb-3">
          
          <table class="table table-striped">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Status</th>
      
      <th style={{width:100}}scope="col">Actions</th>
      
      
    </tr>
  </thead>
  <tbody>
    {get(capacity,'capacityList',[]).map((item)=>{
        return (
          <tr>
      <td>{item.capacity}</td>
      <td>
                    <input
                      type="checkbox"
                      checked={item.status}
                      onChange={() => {
                        
                        setChangeStatus({
                          ...item,
                          id: item.id,
                          status: item.status == 1 ? 0 : 1,
                        })
                      }}
                      id={"id" + item.id}
                    />
                    <label htmlFor={"id" + item.id}>Label</label>
                  </td>
      <td><button 
      onClick={()=> setShowModal(item)}
      className="btn btn-primary text-white"><i className="fa fa-pencil"></i></button></td>
    </tr>
      )
    })}
    
  </tbody>
</table>
<Pagination totalPage={get(capacity,"totalPage",1)} activePage={activePage} updateActivePage={(pageNo)=> {
   setActivePage(pageNo)
 }}/> 
  

          </div>
         
        <Modal
        header={showModal == 'true'  ? "Add Capacity":"Edit Capacity"}
        show={showModal} onClose={()=> setShowModal(false)} content={<div className="popup-form">
        
          <Formik

                enableReinitialize
                initialValues={{
                  capacity:get(showModal,'capacity',''),
                }}
                validate={(values) => capacityValidator(values)}
                validateOnChange
                onSubmit={handleSubmit}
              >
                {(formikBag) => {
                  return (
                    <Form className="small-form">
                      <div className="row">
                        <div  className="col-lg-12">
                        
                        
                    <Field name="capacity">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            className="form-control"
                            placeholder={"Capacity Name"}
                            error={
                              formikBag.touched.capacity &&
                              formikBag.errors.capacity
                                ? formikBag.errors.capacity
                                : null
                            }
                          />
                        )}
                      </Field>
                      </div>
                      </div>
                        
                      
                      
                      
                        <button type="submit" className="btn-primary btn-block btn text-white">
                        Submit
                        </button>
                      
                      
    
                      <FocusError />
                    </Form>
                  );
                }}
              </Formik>
        </div>}/>
        <ConfirmModal show={changeStatus!==""}  handleClose={()=> { setChangeStatus("")}} handleModal={()=> { 
        editCapacity(changeStatus)
        setChangeStatus("")
        }} content={"Sure you want to change the status of Capcity !"}/>
      </div>
      
      
      
    
  );
};



const mapStateToProps = (state) => ({
  user: state.user,
  allapi:state.allapi
});

const mapActionsToProps = {
  getCapacity,
  addCapcity,
  editCapacity
  
};

export default connect(mapStateToProps, mapActionsToProps)(CapacityManagement);


