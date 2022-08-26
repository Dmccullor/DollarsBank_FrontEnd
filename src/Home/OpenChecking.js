import React, {useState, useEffect} from 'react';
import '../App.css'

const checkingURL = "http://localhost:8080/api/checking";
const transactionURL = "http://localhost:8080/api/transaction";
//const checkingURL = "https://dollarsbank-v3.herokuapp.com/api/checking;"
//const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction"

const OpenChecking = () => {
    const [opened, setOpened] = useState(false);
    const [init, setInit] = useState([]);

    const handleOpening = async e => {
        e.preventDefault();
        setOpened(true);

        fetch(checkingURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                'amount': 0,
                'init_deposit': init
            })
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
