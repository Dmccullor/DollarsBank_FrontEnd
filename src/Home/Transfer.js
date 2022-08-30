import React, {useState, useEffect} from 'react';
import ReactjsAlert from 'reactjs-alert';
import '../App.css';

function Transfer() {
    // const transactionURL = "http://localhost:8080/api/transaction";
    const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction";
    
    
    const [status, setStatus] = useState(false);
    const [type, setType] = useState([]);
    const [title, setTitle] = useState([]);
    const [quote, setQuote] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [amount, setAmount] = useState([]);
    const [acct, setAcct] = useState('0');
    const [user, setUser] = useState([]);
    const [totals, setTotals] = useState({
        checking: 0,
        savings: 0
    })
    
    useEffect( () => {
        const customerURL = "https://dollarsbank-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
        // const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
        
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
            return result;
        })
        .then(customer => {
            console.log(customer);
            setTotals({
                checking: customer.checking.amount,
                savings: customer.savings.amount
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    const handleAcctChange = e => {
        setAcct(e.target.value);
        console.log(acct);
    }

    const handleAmountChange = e => {
        setAmount(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        
        if(acct === '0' && amount > totals.savings) {
            setType('error');
            setTitle('Action blocked');
            setQuote(`You only have $${totals.savings} in your savings account`);
            setStatus(true);
        }
        else if(acct === '1' && amount > totals.checking) {
            setType('error');
            setTitle('Action blocked');
            setQuote(`You only have $${totals.checking} in your checking account`);
            setStatus(true);
        }
        else {
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
                    'type': 2
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
        
    }
    
    if(user === null) {
        return (
            <div className='main-page'>
                <h1>Please wait...</h1>
            </div>
        )
    }
    else if(user.checking === null || user.savings === null) {
        return (
            <div className='main-page'>
                <h1>You must have a checking and a savings account to transfer funds</h1>
            </div>
        )
    }
    else if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Success!</h1>
                {acct === '0' ? 
                <h3>${amount} has been transferred from your checking account to your savings account.</h3> :
                <h3>${amount} has been transferred from your savings account to your checking account.</h3>
                }
            </div>
        )
    }
    else {
        return (
            <div className='main-page'>
                <ReactjsAlert
                status={status}
                type={type}
                title={title}
                quotes={true}
                quote={quote}
                Close={() => setStatus(false)}/>

                <div className='title'>
                    <h1>Transfer Funds</h1>
                </div>
                <h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                        <p>To which account would you like to transfer?</p>
                            <label>
                                <input
                                    type='radio'
                                    value='0'
                                    checked={acct === '0'}
                                    onChange={handleAcctChange}
                                    required/>
                                    Checking
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    value='1'
                                    checked={acct === '1'}
                                    onChange={handleAcctChange}
                                    required/>
                                    Savings
                            </label>
                        </div>
                        <label>
                            <p>How much would you like to transfer?</p>
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

export default Transfer;