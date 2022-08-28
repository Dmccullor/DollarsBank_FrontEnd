import React, {useState, useEffect} from 'react';
import '../App.css';



function History() {
    const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
    //const customerURL = "https://dollarsbankd-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
    
    const [user, setUser] = useState(null);

    useEffect( () => {
        console.log(customerURL);
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
    
    if(!user) {
        return (
            <div className='main-page'>
                <h1>Please wait...</h1>
            </div>
        )
    }
    else if(user.transactions.length === 0) {
        return (
            <div className='main-page'>
                <h1>Transaction History</h1>
                <h2 style={{color:'red'}}>You have no transactions to view</h2>
            </div>
        )
    }
    else {
        return (
            <div className='main-page'>
                <div className='title'>
                    <h1>Transaction History</h1>
                </div>
                <div className='transaction-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Account</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.transactions.map((item) => {
                                return (
                                    <tr key={item.id} className='transaction-item'>
                                        <td>{item.id}</td>
                                        <td>{item.type}</td>
                                        <td>{item.toAcct}</td>
                                        <td>${item.amount}</td>
                                        <td>{item.date[1]}/{item.date[2]}, {item.date[0]}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default History;