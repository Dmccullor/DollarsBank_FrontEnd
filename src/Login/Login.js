import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';


const Login = () => {
    sessionStorage.clear();

    const URL = "https://dollarsbank-v3.herokuapp.com/api/authenticate";
    // const URL = "http://localhost:8080/api/authenticate";

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [found, setFound] = useState(true);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const handleUsernameChange = e => {
        setCredentials({...credentials, username: e.target.value})
    }

    const handlePasswordChange = e => {
        setCredentials({...credentials, password: e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitted(true);
        
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            if(response.status === 404) {
                setFound(false);
                throw new Error("Username or password incorrect.");
            }
            else if(response.ok) {
                setValid(true);
            }
            return response.json();
        })
        .then(result => {
            sessionStorage.setItem('jwt', result.jwt);
            sessionStorage.setItem('username', credentials.username);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Login Successful!</h1>
                <h3>Please proceed to the <Link to='/home'>homepage</Link></h3>
            </div>
        )
    }
    else {
        return (
            <div className='login-wrapper'>
                <h1>Please Login</h1>
                {submitted && !found ? <p style={{color:'red'}}>Username or Password Incorrect</p>:null}
                <h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>Username:</p>
                            <input
                                type='text'
                                value={credentials.username}
                                className='form-field'
                                placeholder='Username'
                                name='username'
                                onChange={handleUsernameChange}
                                required/>
                        </label>
                        <label>
                            <p>Password:</p>
                            <input
                                type='password'
                                value={credentials.password}
                                placeholder='Password'
                                name='password'
                                onChange={handlePasswordChange}
                                required/>
                        </label>
                        <div>
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                </h3>
                <h5>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </h5>
            </div>
        )
    }
}

export default Login;