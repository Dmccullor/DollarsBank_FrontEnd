import React, {useState, useEffect} from 'react';
import '../App.css'

function Welcome() {
    const [user, setUser] = useState([]);

    useEffect( () => {        
        // const customerURL = "http://localhost:8080/api/customer/username/" + sessionStorage.getItem('username');
        const customerURL = "https://dollarsbank-v3.herokuapp.com/api/customer/username/" + sessionStorage.getItem('username');
        
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
                <h1>Welcome to DollarsBank {user.name}!</h1>
            </div>
            <div className='welcome-text'>
                <h3>
                    With the new DollarsBank website, you can manage your finances from home.
                    Have a look around.
                </h3>
            </div>
        </div>
    )
}

export default Welcome;