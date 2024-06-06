import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredential] = useState({name: "", email: "", password: "", cpassword: ""});

  const handleSubmit = async (e) => {
    const {name, email, password} = credentials
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email, password})
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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" onChange={onChange} id="name" aria-describedby="emailHelp" placeholder="Enter email" name='name' />
          </div> required minLength={2}
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
            <input type="cpassword" className="form-control" onChange={onChange} id="cpassword" placeholder="Password" name='cpassword' required minLength={2} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div></div>
  )
}

export default Singup
