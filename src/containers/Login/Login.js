import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chi from '../../assests/images/chi.png';
import { Router, Route, Switch,Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';
import Signup from '../Signup/Signup'
import Hist from '../../index';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
//import swal from '@sweetalert/with-react';
import User from '../../components/UI/Drawer/Drawer';
import Admin from '../Admin/Admin';


class log extends Component {

    constructor(props){
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',
            },
            submitted: false,
            redirectPath:'/Login',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.handleBlur=this.handleBlur.bind(this);
    }

    emailRef = React.createRef();
    passRef=React.createRef();

    handleBlur = (event) => {
        this.emailRef.current.validate(event.target.value);
    }










    onRegister(e) {
          e.preventDefault();
          console.log(this.state);
          let path = null;
          console.log(this.state.formData['email']);
          if(this.state.formData['email'] === 'admin@gmail.com' && this.state.formData['password'] === 'admin123')
          {
            //  let url = 'https://chireactproject.firebaseio.com/?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
             let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
            //  let url = 'https://chireactproject.firebaseio.com/ authentication/users?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
            const authData = {
                    email: this.state.formData['email'],
                    password: this.state.formData['password'],
                    returnSecureToken: true
                };
             axios.post(url,authData //, {
               // headers: {
               //   'Access-Control-Allow-Origin': true,
               // }
           // }
            ).then(response =>{
                      console.log(response.data.email);
             }).catch(error => {
                      console.log(error);
                     // reject();
                    })
             path = <Redirect to="/Admin" />;
          }

          else
          {
            const authData = {
                    email: this.state.formData['email'],
                    password: this.state.formData['password'],
                    returnSecureToken: true
            };
           // let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
           let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
           axios.post(url,authData).then(response =>{
                 console.log(response.data.email);
            }).catch(error => {
                alert('this user does not exist please signup to continue');
                console.log(error);
            })
               path = <Redirect to="/User" />;
          }
          this.setState({redirectPath:path});
          return(
            ReactDOM.render(
                        <Router history={Hist}>
                            <Route path="/Signup" component={Signup}/>
                            <Route path="/Login" component={log}/>
                            <Route path="/Admin" component={Admin} />  
                            <Route path="/User" component={User} />   
                        {path}
                        </Router>,
                        document.getElementById("root")
              )
        );
        //   this.setState({ submitted: true }, () => {
        //     setTimeout(() => this.setState({ submitted: false }), 5000);
        // });
    }
   
  
    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });   
    }

    componentDidMount() {
         ValidatorForm.addValidationRule('isPasswordCorrect', (value) => {
             if (value.length < 6) {
                 return false;
             }
            return true;
         });
    }

    handleSignup=()=>{
        const routes = (
                           <Switch>
                             <Route path="/Signup" component={Signup} /> 
                            <Redirect from="/Login" to="/Signup" />
                           </Switch>
                        );
        return(
            ReactDOM.render(
                        <Router history={Hist}>
                            {routes}
                        </Router>,
                        document.getElementById("root")
              )
        );
    }

    render() {

        const style = {
            height: 450,
            marginBottom: 100,
            width:400,
            border: '2px solid gray',
            display:'block'
        };

        const style1 = {
            width:'90%',
            marginLeft:20,
            marginRight:20,
            height:50
        };

        const style2={
            fontFamily: "Lucida Console" ,
            color:'blue',
            marginRight:10,
            marginLeft:10,
            fontWeight:'bold',
        }

        const style3={
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px solid rgb(134, 133, 133)',
            lineHeight: '0.1em',
            margin: '10px 0 20px',
        }

 

        const style4={
            background: '#fff',
            padding:' 0 10px',
            color: 'blue',
        }


        const { formData, submitted } = this.state;

        return (

            <center> 
               
                <img src={Chi}  style={{ marginTop: 50,}}  alt='chi'/>
              
                <div style={style} >

                    <br/>
                    <p  style={style2}>Login to Continue shopping in Chi </p>
                   
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.onRegister}
                        instantValidate={false}
                     >

                        <Grid item>  
                            <TextValidator
                                ref={this.emailRef}
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                onChange={this.handleChange}
                                onBlur={this.handleBlur}
                                style={style1}
                                required
                                value={formData.email} 
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>

                        <br />
                        <br />

                        <Grid item>
                            <TextValidator
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={ formData.password}
                                validators={['isPasswordCorrect','required']}
                                errorMessages={['password must be more than 6 character','this field is required']}
                                ref={this.passRef} 
                            />
                        </Grid>

                        <br />
                        <br />

                        <Grid item>
                            <Button
                        
                                variant="contained"
                                color="primary"
                                style={style1}
                                type="submit"
                                disabled={submitted}
                            >
                                {
                                    (submitted && 'Sumbited' ) || (!submitted && ' Login')     
                                }
                           </Button>
                        </Grid>

                        <br/>
                        <br/>
                        <h5 style={style3}><span style={style4}>New to Chi ?</span></h5>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={style1}
                                onClick={this.handleSignup}
                                
                            >
                                SignUp
                            </Button>
                        </Grid>
                        <br/>
                        <br/>
                  
                    </ValidatorForm>
                </div>
            </center>
        );
    }
}
export default log;
