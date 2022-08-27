import React, {useState, useEffect} from 'react';
import '../App.css'

const savingsURL = "http://localhost:8080/api/savings";
const transactionURL = "http://localhost:8080/api/transaction";
const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
//const savingsURL = "https://dollarsbank-v3.herokuapp.com/api/checking;"
//const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction;"
//const customerURL = "https://dollarsbankd-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');


const Opensavings = () => {
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [account, setAccount] = useState([]);
    const [user, setUser] = useState([]);
    const [amount, setAmount] = useState([]);

    useEffect( () => {
        fetch(customerURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then(result => {
            setUser(result);
        })
    }, []);

    useEffect( () => {
        fetch(transactionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'appliation/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                'amount': amount,
                'toAcct': 1,
                'type': 0
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
    }, [valid])

    const handleChange = e => {
        setAmount(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitted(true);

        fetch(savingsURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sesssionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                'amount': 0
            })
        })
        .then(response => {
            if(response.ok) {
                setValid(true);
                return response.json();
            }
            else {
                throw new Error("Something went wrong");
            }
        })
        .then(result => {
            setAccount(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    if(submitted && valid) {
        return (
            <div className='welcome-message'>
                <h1>Your new savings account has been opened!</h1>
                <h3>Your new savings account ID is {account.id}</h3>
            </div>
        )
    }
    else if(user.has_savings) {
        return (
            <div>
                <h2 style={{color:'red'}}>You already have a savings account</h2>
                <h5><a href='/home'>Return</a></h5>
            </div>
        )
    }
    else {
        return (
            <div className='form-container'>
                <div className='title'>
                    <h1>Open a new Savings Account</h1>
                </div>
                <h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>How much would you like to initially deposit?</p>
                            <input
                                type='number'
                                value={amount}
                                placeholder='$500 minimum'
                                name='amount'
                                step={0.01}
                                min={500}
                                onChange={handleChange}
                                required/>
                        </label>
                        <div>
                            <button type='submit'>Confirm</button>
                        </div>
                    </form>
                </h3>
            </div>
        )
    }

}

export default Opensavings;