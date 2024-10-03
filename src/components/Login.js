import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredential] = useState({ email: "", password: "" });
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-umber-omega.vercel.app/login/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json);
        if (json.success) {
            //success is true redirect and save ther auth token.
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully", "success");
            navigate("/");


        }
        else {
            props.showAlert("Invalid Details", "danger");
        }
    }

    const onChange = (e) => {
        setCredential({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
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
            </form> */}
            <form onSubmit={handleSubmit} className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input type="email" onChange={onChange} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="email">Email</label>

                                        </div>

                    

                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input type="password" onChange={onChange} value={credentials.password} id="password" name='password'  className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to="/signup" role='button'>Signup</Link>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
