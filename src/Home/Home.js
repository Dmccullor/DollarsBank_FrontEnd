import React from 'react';
import '../App.css';
import Nav from './Nav';
import Welcome from './Welcome';
import OpenChecking from './OpenChecking';
import OpenSavings from './OpenSavings';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Transfer from './Transfer';
import History from './History';
import Info from './Info';
import Login from '../Login/Login';

function Home() {
    let component
    switch(window.location.pathname) {
        case "/welcome":
            component = <Welcome/>
            break
        case "/openchecking":
            component = <OpenChecking/>
            break
        case "/opensavings":
            component = <OpenSavings/>
            break
        case "/deposit":
            component = <Deposit/>
            break
        case "/withdraw":
            component = <Withdraw/>
            break
        case "/transfer":
            component = <Transfer/>
            break
        case "/history":
            component = <History/>
            break
        case "/info":
            component = <Info/>
            break
        case "/login":
            component = <Login/>
            break
        default:
            component = <Welcome/>
    }
    return (
        <div className='Home'>
            <Nav/>
            {component}
        </div>
    )
}

export default Home;