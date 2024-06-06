import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const {showAlert} = props;
    const [credentials, setCredential] = useState({email: "", password: ""});
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            //success is true redirect and save ther auth token.
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully", "success");
            navigate("/");


        }
        else{
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange= (e)=>{
        setCredential({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
