import React, { useState,useEffect } from 'react';


const SignUp = () => {

    const [authenticated, setAuthenticated] = useState(false);

    const URL = "https://dollarsbank-v3.herokuapp.com/api/customer"

    const body = {
        "name": "Mary Beth",
        "username": "mBeth101",
        "address": "123 Pine St.",
        "phone": 3105768977,
        "password": "pass123",
        "role": "ROLE_USER",
        "enabled": true,
        "has_savings": false
    }

    async function createCustomer(body) {
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
        .then(response  => {
            if(response.ok) {
                setAuthenticated(true);
                return response.json();
            }
            else {
                throw new Error("Something went wrong")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const newUser = createCustomer(body);

    return (
        <div className='welcome-message'>
            <h1>Welcome to DollarsBank {newUser.name}!</h1>
        </div>
    )

};

export default SignUp;