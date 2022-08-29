import React, {useState, useEffect} from 'react';
import '../App.css';



function Info() {
    // const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
    const customerURL = "https://dollarsbank-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
    
    const [user, setUser] = useState([]);

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
    
    return (
        <div className='main-page'>
            <div className='title'>
                <h1>Customer Information</h1>
            </div>
            <div className='info-table'>
                <table>
                    <tbody>
                        <tr>
                            <td><b>Name:</b></td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td><b>ID:</b></td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td><b>Username:</b></td>
                            <td>{user.username}</td>
                        </tr>
                        <tr>
                            <td><b>Address:</b></td>
                            <td>{user.address}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number:</b></td>
                            <td>{user.phone}</td>
                        </tr>
                        {user.checking ? 
                        <tr>
                            <td><b>Checking:</b></td>
                            <td>${(user.checking.amount).toFixed(2)}</td>
                        </tr>
                        : null}
                        {user.has_savings ? 
                        <tr>
                            <td><b>Savings:</b></td>
                            <td>${(user.savings.amount).toFixed(2)}</td>
                        </tr>
                        : null}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Info;