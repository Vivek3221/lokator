import React, { Component,useState,useEffect } from "react";
import { addCountry,getCountries,editCountry } from "../../../store/actions/allapi";
import { connect } from "react-redux";
import { Modal,Input,FocusError } from "../../../components";
import { Formik, Field, Form } from "formik";
import { countryValidator } from "../../../utils/validation";
import { get } from "lodash";
const CountryManagement = ({getCountries,addCountry,editCountry,allapi:{countries=[]}}) => {


  useEffect(()=>{
    getCountries()
  },[])
  const [showModal,setShowModal] = useState(false)
  const [editValue,setEditValue] = useState(null)
  const handleSubmit = (values) => {
    setShowModal(false);

    if(editValue!==null){
      editCountry({...values,id:get(editValue,'id','')})
    }
    else{
      addCountry(values)
    }
    setEditValue(null)
    
  }

  
  
  return (
    <div className="container-fluid">
        {/* Breadcrumbs*/}
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Country Management</li>
        </ol>
        <div className="d-flex btn_box">
        <button onClick={()=> {
          setEditValue(null)
          setShowModal(true)}}  className="btn btn-primary text-white">Add Country</button>

        </div>

        {/* Area Chart Example*/}
        <div className="card mb-3">
          
          <table class="table table-striped">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Country Code</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
    {countries.map((item)=>{
        return (
          <tr>
      <td>{item.name}</td>
      <td>{item.country_code}</td>
      <td><button 
      onClick={()=> {
        setShowModal(true)
        setEditValue(item)
      }}
      className="btn btn-primary text-white"><i className="fa fa-edit"></i></button></td>
      
      
      
    </tr>
      )
    })}
    
  </tbody>
</table>
  {/* <ul class="pagination align-center">
    <li class="page-item"><a class="page-link" href="#" aria-label="Previous">&laquo;</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active"><a class="page-link " href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">6</a></li>
    <li class="page-item"><a class="page-link" href="#">7</a></li>
    <li class="page-item"><a class="page-link" href="#">8</a></li>
    <li class="page-item"><a class="page-link" href="#">9</a></li>
    <li class="page-item"><a class="page-link" href="#" aria-label="Next">&raquo;</a></li>
  </ul> */}

          </div>
         
          <Modal show={showModal}
       onClose={()=> {
        setEditValue(null)
         setShowModal(false)}} content={<div className="modal_form">

<Formik
                enableReinitialize
                initialValues={{
                  name:get(editValue,'name',''),
                  country_code:get(editValue,'country_code','')
                }}
                validate={(values) => countryValidator(values)}
                validateOnChange
                onSubmit={handleSubmit}
              >
                {(formikBag) => {
                  return (
                    <Form>
                      <h4>{editValue!==null?"Update":"Add"} Country</h4>
                        
                    <Field name="name">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            className="form-control"
                            placeholder={"Country Name"}
                            error={
                              formikBag.touched.name &&
                              formikBag.errors.name
                                ? formikBag.errors.name
                                : null
                            }
                          />
                        )}
                      </Field>

                      <Field name="country_code">
                        {({ field }) => (
                          <Input
                            {...field}
                            type="text"
                           className="form-control"
                            placeholder={"Country Code"}
                            error={
                              formikBag.touched.country_code &&
                              formikBag.errors.country_code
                                ? formikBag.errors.country_code
                                : null
                            }
                          />
                        )}
                      </Field>
                      
                        
                      
                      
                      <div className="btn-group">
                      <button type="button" onClick={()=> setShowModal(false)}  className="btn-transprent  btn text-white">
                        Cancel
                        </button>
                        <button type="submit" className="btn-primary  btn text-white">
                      {editValue!==null?"Update":"Add"}
                        </button>
                      </div>
                    
                      <FocusError />
                    </Form>
                  );
                }}
              </Formik>
                </div>} />    
      </div>
      
      
      
    
  );
};



const mapStateToProps = (state) => ({
  user: state.user,
  allapi:state.allapi
});

const mapActionsToProps = {
  addCountry,
  getCountries,
  editCountry
    
};

export default connect(mapStateToProps, mapActionsToProps)(CountryManagement);


