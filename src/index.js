import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
//import {BrowserRouter as Router} from 'react-router-dom'
import {Router } from 'react-router';
//import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import './index.css';
import App from './App';



const hist = createBrowserHistory();


const app =(
    <Router history={hist} >
      <App/> 
    </Router>
)


ReactDOM.render(app,document.getElementById('root'));




export default hist;