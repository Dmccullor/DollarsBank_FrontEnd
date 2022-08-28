import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Nav() {
    
    return (
        <nav className='nav'>
            <Link to='/home/showinfo'>
            <h2 className='home-link'>Home</h2>
            </Link>
            <ul className='nav-links'>
                <li><Link to='/home/showinfo'>Customer Information</Link></li>
                <li><Link to='/home/openchecking'>Open Checking Account</Link></li>
                <li><Link to='/home/opensavings'>Open Savings Account</Link></li>
                <li><Link to='/home/deposit'> Deposit</Link></li>
                <li><Link to='/home/withdraw'>WithDrawal</Link></li>
                <li><Link to='/home/transfer'>Transfer</Link></li>
                <li><Link to='/home/history'>Transaction History</Link></li>
                <li><Link to='/'>Logout</Link></li>
            </ul>
        </nav>
    )
}

export default Nav;