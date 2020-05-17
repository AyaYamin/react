
import React, { Component, Fragment } from 'react'
import './App.css';
import {  Route, withRouter,Switch,Redirect} from "react-router-dom";
///import Login  from './containers/Login/Login';

import Admin from './containers/Admin/Admin';

class App extends Component {
  
  render(){
  let routes = (
                 <Switch>
                 
     {/*            <Route path="/Login" component={Login} />   
                     <Redirect from="/" to="/Login" /> 
                    
*/}
                      <Route path="/Admin" component={Admin} />   
                     <Redirect from="/" to="/Admin" /> 
                 </Switch> 
                );
  return (
            <Fragment>
                 {routes}
            </Fragment>  
 ); 
        }
}
export default withRouter(App);

