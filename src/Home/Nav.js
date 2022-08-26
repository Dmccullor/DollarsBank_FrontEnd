import React from 'react';
import '../App.css';

function Nav() {
    
    return (
        <nav className='nav'>
            <a href='/welcome'>
            <h2 className='home-link'>Home</h2>
            </a>
            <ul className='nav-links'>
                <li><a href='/openchecking'>Open Checking Account</a></li>
                <li><a href='/opensavings'>Open Savings Account</a></li>
                <li><a href='/deposit'> Deposit</a></li>
                <li><a href='/withdraw'>WithDrawal</a></li>
                <li><a href='/transfer'>Transfer</a></li>
                <li><a href='/history'>Transaction History</a></li>
                <li><a href='/info'>Show Info</a></li>
                <li><a href='/login'>Logout</a></li>
            </ul>
        </nav>
    )
}

export default Nav;