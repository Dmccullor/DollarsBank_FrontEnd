import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './Login/Signup';
import Home from './Home/Home';
import Welcome from './Home/Welcome';
import OpenChecking from './Home/OpenChecking';
import Opensavings from './Home/OpenSavings';
import Deposit from './Home/Deposit';
import Withdraw from './Home/Withdraw';
import Transfer from './Home/Transfer';
import Info from './Home/Info';
import History from './Home/History';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}>
          <Route index element={<Welcome/>}/>
          <Route path="/home/welcome" element={<Welcome/>}/>
          <Route path="/home/openchecking" element={<OpenChecking/>}/>
          <Route path="/home/opensavings" element={<Opensavings/>}/>
          <Route path="/home/deposit" element={<Deposit/>}/>
          <Route path="/home/withdraw" element={<Withdraw/>}/>
          <Route path="/home/transfer" element={<Transfer/>}/>
          <Route path="/home/showinfo" element={<Info/>}/>
          <Route path="/home/history" element={<History/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
