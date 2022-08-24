import React, { useState,useEffect } from 'react';

const URL = "https://dollarsbank-v3.herokuapp.com/api/customer/1"

const ShowTest = () => {

    const [customer, setCustomer] = useState([]);

    useEffect( () => {
        fetch (URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            setCustomer(result);        
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);
    

    return (
        <div className='welcome-message'>
            <h1>Welcome to DollarsBank {customer.name}!</h1>
        </div>
    )
}

export default ShowTest;