import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chi from '../../assests/images/chi.png';
import Login from '../Login/Login';
import { Router, Route, Switch,Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';
import Hist from '../../index';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';


class SignUp extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            formData: {
                email: '',
                password: '',
                repeatPassword: '',
            },
            submitted: false,
            redirectPath:'Signup'
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

    
    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { formData } = this.state;
            if (value !== formData.password) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isPasswordCorrect', (value) => {
            if (value.length < 6) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }

    onRegister(e) {
          e.preventDefault();
          console.log(this.state);
          let path=null;
          const authData = {
            email: this.state.formData['email'],
            password: this.state.formData['password'],
            returnSecureToken: true
        };
         // let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlF1qo3YCLDEB1kHbcr-zpmUUI7DB7bC0';
         let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
          axios.post(url,authData).then(response =>{
            console.log(response.data.email);
          })
          path = <Redirect to="/Login" />;
          this.setState({redirectPath:path});
          return(
            ReactDOM.render(
                        <Router history={Hist}>
                            <Route path="/Login" component={Login}/>
                      {path}
                        </Router>,
                        document.getElementById("root")
              )
        );
        //   this.setState({ submitted: true }, () => {
        //     setTimeout(() => this.setState({ submitted: false }), 5000);
        // });
     }


    handleLogin=()=>{
        const routes = (<
                            Switch>
                               <Route path="/Login" component={Login}/>   
                               <Redirect from="/Signup" to="/Login" />
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
            height: 600,
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
            fontFamily: "Lucida Console" ,
            color:'blue',
            marginRight:10,
            marginLeft:10,
            fontWeight:'bold',
        }

        const style4={
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px solid rgb(134, 133, 133)',
            lineHeight: '0.1em',
            margin: '10px 0 20px',
        }

        const style5={
            background: '#fff',
            padding:' 0 10px',
            color: 'blue',
        }

        const { formData, submitted } = this.state;

        return (

            <center> 
               
                <img src={Chi}  style={{ marginTop: 50,}}  alt='chi'/>
              
                <div style={style}>

                    <br />
                    <p  style={style2}> To Create Account in Chi Website</p>
                    <br />

                    <ValidatorForm
                         ref={r => (this.form = r)}
                          onSubmit={this.onRegister}
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
                                errorMessages={['add Password of more than 6 characters','this field is required']}
                                ref={this.passRef} 
                            />
                    </Grid>


                        <br />
                        <br />

                    <Grid item>
                        <TextValidator
                                label="Confirm Password"
                                name="repeatPassword"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={formData.repeatPassword}
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
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
                                    (submitted && 'Sumbited' ) || (!submitted && ' SignUp')     
                                }
                           </Button>
                        </Grid>

                        <h6 style={style3}>By creating an account, you agree to Chi's Conditions of Use and Privacy Notice.</h6>

                      
                        <br/>
                         <h5 style={style4}><span style={style5}>Have Already Account ?</span></h5>

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={style1}
                                onClick={this.handleLogin}
                            >
                                login
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
export default SignUp;
