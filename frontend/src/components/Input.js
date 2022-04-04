import React,{useState} from 'react'

export default function Input(props) {
    const {error,type} = props;
    const [showPassword,setShowPassword] = useState(false)
    return (
      <>
        <div  className="input_box">
        <input {...props} type={type ? (showPassword ? "text" : type) : "text"} />
        {type === "password"  ? (
          <i onClick={() => setShowPassword(!showPassword)} className={`fa ${!showPassword?"fa-eye":"fa-eye-slash"}`}>
            
          </i>
        ) : (
          ""
        )}
        </div>
        {error ? (
          <p  
          style={{ paddingTop: 5,
          fontSize:13,
          color:"red" }}>
            {error}
          </p>
        ) : null}
      </>
    );
}
