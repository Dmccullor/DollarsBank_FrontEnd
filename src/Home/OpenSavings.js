import React, {useState, useEffect} from 'react';
import '../App.css'


const Opensavings = () => {
    // const savingsURL = "http://localhost:8080/api/savings";
    // const transactionURL = "http://localhost:8080/api/transaction";
    // const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
    const savingsURL = "https://dollarsbank-v3.herokuapp.com/api/savings";
    const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction";
    const customerURL = "https://dollarsbank-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
    
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
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
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
            return result;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect( () => {
        !valid ? console.log("Post cancelled"):
        
        fetch(transactionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

    if(user.checking === null) {
        return (
            <div className='main-page'>
                <h1>Please open a checking account before opening a savings account</h1>
            </div>
        )
    }
    else if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Your new savings account has been opened!</h1>
                <h3>Your new savings account ID is {account.id}</h3>
            </div>
        )
    }
    else if(user.has_savings) {
        return (
            <div className='main-page'>
                <h2 style={{color:'red'}}>You already have a savings account</h2>
            </div>
        )
    }
    else {
        return (
            <div className='main-page'>
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