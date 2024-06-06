import React from 'react'

export default function Aleart(props) {
    const capitalfirstletter = (word) =>{
        if (word==='danger') {
            word = 'error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
   <>
   <div style={{height:'50px'}}>
   {
  props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{capitalfirstletter(props.alert.type)}</strong> : {props.alert.msg}
  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
}
</div>
   </>
  )
}
