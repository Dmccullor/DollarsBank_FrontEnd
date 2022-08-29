import React, {useState, useEffect} from 'react';
import '../App.css';

function Deposit() {
    // const transactionURL = "http://localhost:8080/api/transaction";
    // const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
    const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction;"
    const customerURL = "https://dollarsbankd-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
    
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [amount, setAmount] = useState([]);
    const [acct, setAcct] = useState(0);
    const [user, setUser] = useState([]);
    
    useEffect( () => {
        console.log(sessionStorage.getItem('username'));
        
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

    const handleAcctChange = e => {
        setAcct(e.target.value);
    }

    const handleAmountChange = e => {
        setAmount(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitted(true);

        fetch(transactionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                'amount': amount,
                'toAcct': acct,
                'type': 0
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
        .catch((error) => {
            console.log(error);
        })
    }
    
    if(user.checking === null) {
        return (
            <div className='main-page'>
                <h1>Please open a checking account before proceeding...</h1>
            </div>
        )
    }
    else if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Success!</h1>
                <h3>${amount} has been deposited into your account</h3>
            </div>
        )
    }
    else {
        return (
            <div className='main-page'>
                <div className='title'>
                    <h1>Deposit</h1>
                </div>
                <h3>
                    <form onSubmit={handleSubmit}>
                        {user.has_savings ?
                        <div>
                            <p>To which account would you like to deposit?</p>
                            <label>
                                <input
                                    type='radio'
                                    name='ToAcct'
                                    value={0}
                                    onChange={handleAcctChange}
                                    checked={true}/>
                                    Checking
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='ToAcct'
                                    value={1}
                                    onChange={handleAcctChange}/>
                                    Savings
                            </label>
                        </div> : null}
                        <label>
                            <p>How much would you like to deposit?</p>
                            <input
                                type='number'
                                value={amount}
                                placeholder='$'
                                name='amount'
                                min={0.01}
                                step={0.01}
                                onChange={handleAmountChange}
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

export default Deposit;