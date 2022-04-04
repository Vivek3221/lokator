import React from 'react'

export default function Textarea(props) {
    const {error} = props;
    return (
      <>
        <textarea {...props} />
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
