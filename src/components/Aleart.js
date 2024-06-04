import React from 'react'

const Aleart = (props) => {
    return (
        <div>
            <div className="alert alert-success" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Aleart
