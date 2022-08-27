import React, {useState, useEffect} from 'react';
import '../App.css'

const checkingURL = "http://localhost:8080/api/checking";
const transactionURL = "http://localhost:8080/api/transaction";
//const checkingURL = "https://dollarsbank-v3.herokuapp.com/api/checking;"
//const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction;"



const OpenChecking = () => {
    const [submitted, setSubmitted] = useState(false);
    const [init, setInit] = useState([]);
    const [valid, setValid] = useState(false);
    const [account, setAccount] = useState([]);

    const handleChange = e => {
        setInit(e.target.value);
    }

    useEffect( () => {
        fetch(transactionURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'appliation/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: JSON.stringify({
                'amount': init,
                'toAcct': 0,
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

    const handleSubmit = async e => {
        e.preventDefault();
        setSubmitted(true);

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
                <h1>Your new checking account has been opened!</h1>
                <h3>Your checking account ID is {account.id}</h3>
                <h5><a href='/home'>Return</a></h5>
            </div>
        )
    }
    else {
        return (
            <div className='form-container'>
                <div className='title'>
                    <h1>Open a new Checking Account</h1>
                </div>
                <h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p>How much would you like to initally deposit?</p>
                            <input
                                type='number'
                                value={init}
                                placeholder='$500 minimum'
                                name='init'
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

export default OpenChecking;
