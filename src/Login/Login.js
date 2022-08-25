import React, {useState, useEffect} from 'react';

const URL = "https://dollarsbank-v3.herokuapp.com/api/authenticate"

const Login = () => {

    useEffect( () => {

        const credentials = {
            username: "mBeth101",
            password: "pass123"
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            sessionStorage.setItem('jwt', result.jwt);
        })
    })
}