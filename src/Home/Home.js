import React from 'react';
import '../App.css';
import {Outlet} from 'react-router-dom'
import Nav from './Nav';
// import OpenChecking from './OpenChecking';
// import OpenSavings from './OpenSavings';
// import Deposit from './Deposit';
// import Withdraw from './Withdraw';
// import Transfer from './Transfer';
// import History from './History';
// import Info from './Info';
// import Login from '../Login/Login';

function Home() {
    // let component
    // switch(window.location.pathname) {
    //     case "/home/openchecking":
    //         component = <OpenChecking/>
    //         break
    //     case "/home/opensavings":
    //         component = <OpenSavings/>
    //         break
    //     case "/home/deposit":
    //         component = <Deposit/>
    //         break
    //     case "/home/withdraw":
    //         component = <Withdraw/>
    //         break
    //     case "/home/transfer":
    //         component = <Transfer/>
    //         break
    //     case "/home/history":
    //         component = <History/>
    //         break
    //     case "/home/info":
    //         component = <Info/>
    //         break
    //     case "/login":
    //         component = <Login/>
    //         break
    //     default:
    //         component = <Info/>
    // }
    return (
        <div className='Home'>
            <Nav/>
            <Outlet/>
        </div>
    )
}

export default Home;