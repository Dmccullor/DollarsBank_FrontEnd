import React, { useState,useEffect } from 'react';

const URL = "https://dollarsbank-v3.herokuapp.com/api/customer"

const SignUp = () => {

    const [user, setUser] = useState([]);

    useEffect( () => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        
        const details = {
            "name": "Dylan McCullor",
            "username": "dMccullor104",
            "address": "4700 Staggerbrush Rd.",
            "phone": 9727419974,
            "password": "pass123",
            "role": "ROLE_USER",
            "enabled": true,
            "has_savings": false
        }
        
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details),
            //signal: signal
        })
        .then(response => {
            return response.json();
        })
        .then(result  => {
            setUser(result);

        })
        .catch((error) => {
            console.log(error);
        })
    // return () => {
    //     controller.abort();
    // }
    }, []);

    return (
        <div className='welcome-message'>
            <h1>Welcome to DollarsBank {user.name}!</h1>
        </div>
    )

};

export default SignUp;