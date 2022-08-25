import React, { useState,useEffect } from 'react';

//const URL = "https://dollarsbank-v3.herokuapp.com/api/customer"
const URL = "http://localhost:8080/api/customer"

const SignUp = () => {

    const [user, setUser] = useState([]);

    useEffect( () => {
        // const controller = new AbortController();
        // const signal = controller.signal;
        
        const details = {
            "name": "Britney Spears",
            "username": "bSpears105",
            "address": "Beverly Hills",
            "phone": 5649871595,
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
            body: JSON.stringify(details)
            //signal: signal
        })
        .then(response => {
            if(response.status === 409) {
                throw new Error("Customer already exists in database.");
            }
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