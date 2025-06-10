import React from 'react';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Register from './Components/Register';
import Complaint from './Components/Complaint';
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
function App(){
    return(
        <Router>
            <div>
                <Navbar/>
            </div>
            <div>
               <Switch>
                 <Route exact path = "/">
                    <Home/>
                 </Route>
                 <Route exact path = "/login">
                    <Login/>
                 </Route>
                 <Route exact path = "/register">
                    <Register/>
                 </Route>
                 <Route exact path = "/complaint">
                    <Complaint/>
                 </Route>
               </Switch>
            </div>
            <div>
                <Footer/>
            </div>
        </Router>

    );
}

export default App;