import React, { useEffect }from 'react';
import '../App.css';
import {Outlet, Navigate} from 'react-router-dom'
import Nav from './Nav';

function Home() {
    
    return (
        <div className='Home'>
            <Nav/>
            <Outlet/>
        </div>
    )
}

export default Home;