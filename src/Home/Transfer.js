import React from 'react';
import '../App.css';

const transactionURL = "http://localhost:8080/api/transaction";
const customerURL = "http://localhost:8080/api/customer/username" + sessionStorage.getItem('username');
//const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction;"
//const customerURL = "https://dollarsbankd-v3.herokuapp.com/api/customer/username" + sessionStorage.getItem('username');

function Transfer() {
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [amount, setAmount] = useState([]);
    const [acct, setAcct] = useState(0);
    const [user, setUser] = useState([]);
    const [created, setCreated] = useState([]);
    
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
                'type': 2
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
                setCreated(result);
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }
    
    
    if(submitted && valid) {
        return (
            <div>
                <h1>Success!</h1>
                {!acct ? 
                <h3>${amount} has been transferred from your checking account to your savings account.</h3> :
                <h3>${amount} has been transferred from your savings account to your checking account.</h3>
                }
                <h6><a href='/home'>Return</a></h6>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Transfer Funds</h1>
                <h3>
                    <form onSubmit={handleSubmit}>
                        {user.has_savings ?
                        <div>
                        <p>To which account would you like to transfer?</p>
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
                        </div>: null}
                        <label>
                            <p>How much would you like to transfer?</p>
                            <input
                                type='number'
                                value={amount}
                                placeholder='$'
                                name='amount'
                                max={acct ? user.checking.amount:user.savings.amount}
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