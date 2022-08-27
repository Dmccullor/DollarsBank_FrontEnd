import React from 'react';
import '../App.css';

const customerURL = "http://localhost:8080/api/customer/username" + sessionStorage.getItem('username');
//const customerURL = "https://dollarsbankd-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');

function History() {
    
    const user = {
        "id": 3,
        "name": "Trey Songz",
        "username": "tSongz103",
        "address": "1422 Queens Ave",
        "phone": 2108675309,
        "password": "$2a$10$mFMBlwGycczAMGxApbL6HOeSjjO1ZzmSBqnEfQIaLJOViTUMbeweq",
        "role": "ROLE_USER",
        "enabled": true,
        "checking": {
            "id": 1,
            "amount": 700.0,
            "init_deposit": 500.0
        },
        "has_savings": true,
        "savings": {
            "id": 3,
            "amount": 0.0
        },
        "transactions": [
            {
                "id": 1,
                "date": [
                    2022,
                    8,
                    22,
                    0,
                    23,
                    14,
                    713139000
                ],
                "type": "DEPOSIT",
                "toAcct": "CHECKING",
                "amount": 500.0
            },
            {
                "id": 2,
                "date": [
                    2022,
                    8,
                    22,
                    0,
                    24,
                    23,
                    165098000
                ],
                "type": "DEPOSIT",
                "toAcct": "SAVINGS",
                "amount": 1000.0
            },
            {
                "id": 3,
                "date": [
                    2022,
                    8,
                    22,
                    0,
                    25,
                    40,
                    634040000
                ],
                "type": "WITHDRAWAL",
                "toAcct": "SAVINGS",
                "amount": 100.0
            },
            {
                "id": 4,
                "date": [
                    2022,
                    8,
                    22,
                    0,
                    26,
                    2,
                    270531000
                ],
                "type": "TRANSFER",
                "toAcct": "CHECKING",
                "amount": 100.0
            },
            {
                "id": 5,
                "date": [
                    2022,
                    8,
                    23,
                    23,
                    23,
                    0,
                    156530000
                ],
                "type": "DEPOSIT",
                "toAcct": "CHECKING",
                "amount": 100.0
            }
        ]
    }
    
    return (
        <div className='main-page'>
            <div className='title'>
                <h1>Transaction History</h1>
            </div>
            <div className='transaction-table'>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Date</th>
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

export default History;