import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';



const SignUp = () => {
    const URL = "https://dollarsbank-v3.herokuapp.com/api/customer"
    // const URL = "http://localhost:8080/api/customer"

    const [user, setUser] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [present, setPresent] = useState(false);
    const [details, setDetails] = useState({
        name: "",
        username: "",
        address: "",
        phone: "",
        password: "",
        role: "ROLE_USER",
        enabled: true,
        has_savings: false
    });

    const handleNameChange = e => {
        setDetails({...details, name: e.target.value})
    }

    const handleUsernameChange = e => {
        setDetails({...details, username: e.target.value})
    }

    const handleAddressChange = e => {
        setDetails({...details, address: e.target.value})
    }

    const handlePhoneChange = e => {
        setDetails({...details, phone: e.target.value})
    }

    const handlePasswordChange = e => {
        setDetails({...details, password: e.target.value})
    }
    
    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitted(true);

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        })
        .then(response => {
            if(response.status === 409) {
                setPresent(true);
                throw new Error("Customer already exists in database.");
            }
            else if (response.ok) {
                setValid(true);
            }
            return response.json();
        })
        .then(result  => {
            setUser(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Welcome to DollarsBank {user.name}!</h1>
                <p>Please proceed to login <Link to='/'>here</Link></p>
            </div>
        )
    }
    else {
        return (
            <div className='signup-wrapper'>
                <h1>Create an account</h1>
                {submitted && present ? <p style={{color:'red'}}>There is already an account with this username.</p>: null}
                <h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                        <p>Name:</p>
                        <input 
                            type='text'
                            value={details.name}
                            className='form-field'
                            placeholder='Name'
                            name='name'
                            onChange={handleNameChange}
                            required/></label>
                        <label>
                        <p>Username:</p>
                        <input 
                            type='text'
                            value={details.username}
                            className='form-field'
                            placeholder='Username'
                            name='username'
                            onChange={handleUsernameChange}
                            required/></label>
                        <label>
                        <p>Address:</p>
                        <input
                            type='text'
                            value={details.address}
                            className='form-field'
                            placeholder='Address'
                            name='address'
                            onChange={handleAddressChange}
                            required/></label>
                        <label>
                        <p>Phone Number:</p>
                        <input
                            type='tel'
                            value={details.phone}
                            className='form-field'
                            placeholder='Phone # (no spaces)'
                            pattern="[0-9]{10}"
                            name='phone'
                            onChange={handlePhoneChange}
                            required/></label>
                        <label>
                        <p>Password:</p>
                        <input
                            type='password'
                            value={details.password}
                            placeholder='Password'
                            name='password'
                            onChange={handlePasswordChange}
                            required/></label>
                        <div>
                            <button type='submit'><h3>Submit</h3></button>
                        </div>
                    </form>
                </h3>
            </div>
        )
    }
};

export default SignUp;