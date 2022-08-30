import React, {useState, useEffect} from 'react';
import '../App.css'

const OpenChecking = () => {
    // const checkingURL = "http://localhost:8080/api/checking";
    // const transactionURL = "http://localhost:8080/api/transaction";
    const checkingURL = "https://dollarsbank-v3.herokuapp.com/api/checking";
    const transactionURL = "https://dollarsbank-v3.herokuapp.com/api/transaction";
    
    
    const [user, setUser] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [init, setInit] = useState([]);
    const [valid, setValid] = useState(false);
    const [account, setAccount] = useState([]);

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
        })
    }, []);

    const handleChange = e => {
        setInit(e.target.value);
    }

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
            return result;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect( () => {
        if(!valid) {
            console.log("Cancelled post");
        }
        else {
            fetch(transactionURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valid])


    if(submitted && valid) {
        return (
            <div className='main-page'>
                <h1>Your new checking account has been opened!</h1>
                <h3>Your checking account ID is {account.id}</h3>
            </div>
        )
    }
    else if(user.checking) {
        return (
            <div className='main-page'>
                <h2 style={{color:'red'}}>You already have a checking account</h2>
            </div>
        )
    }
    else {
        return (
            <div className='main-page'>
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
