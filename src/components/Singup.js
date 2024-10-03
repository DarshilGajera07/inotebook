import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    const { name, email, password } = credentials
    e.preventDefault();
    const response = await fetch("https://inotebook-umber-omega.vercel.app/signup/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json()
    console.log(json);
    if (json.success) {
      //success is true redirect and save ther auth token.
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");


    }
    else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    setCredential({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit} className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                  <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                      <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                      <p className="text-white-50 mb-5">Please enter your Details</p>


                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={onChange} id="name" aria-describedby="emailHelp" placeholder="Enter Name" name='name' required minLength={2} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" onChange={onChange} id="email" aria-describedby="emailHelp" placeholder="Enter email" name='email' />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" onChange={onChange} id="password" placeholder="Password" name='password' required minLength={2} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="cpassword" className="form-control" onChange={onChange} id="cpassword" placeholder="Confirm Password" name='cpassword' required minLength={2} />
                      </div>

                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Singup
