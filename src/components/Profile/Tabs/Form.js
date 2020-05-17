import React ,{Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: {
                password: '',
                Newpassword:'',
                ConfirmPassword:'',
            },
            email:'admin@gmail.com',
            submitted: false,
           // pass:'',
        }
     this.handleChange=this.handleChange.bind(this);
     this.onRegister=this.onRegister.bind(this);
   }



handleChange = (event) => {
    const { formData } = this.state;
    formData[event.target.name] = event.target.value;
    if (event.target.name === 'password') {
        this.form.isFormValid(false);
    }
    if (event.target.name === 'Newpassword') {
        this.form.isFormValid(false);
    }
    if (event.target.name === 'ConfirmPassword') {
        this.form.isFormValid(false);
    }
   
    this.setState({ formData }); 
   
}






onRegister(e) {
    e.preventDefault();
    console.log(this.state);
   /* const authData = {
     //idToken:'1DRIIMrN5aURaOh9mAHH2yFu7Tc2',
     //email:'admin@gmail.com',
     newPassword: this.state.formData['Newpassword'],
     //oldPassword:this.state.formData['password'],
     oobCode:'PASSWORD_RESET'
     //returnSecureToken: true
  };*/
  const data={
   idToken:'1DRIIMrN5aURaOh9mAHH2yFu7Tc2',
   //email:'admin@gmail.com',
   //localId:['1DRIIMrN5aURaOh9mAHH2yFu7Tc2', ]
      
   
   //oldPassword:this.state.formData['password'],
   password: this.state.formData['Newpassword'],
   //oobCode: '313165371950'
   returnSecureToken: true
}
  //https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?
  //https://identitytoolkit.googleapis.com/v1/accounts:update
  //https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?
  //https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?
  let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
    axios.post(url,data).then(response =>{
      console.log(response);
    }).catch(err=>{
        console.log(err.response);
    })

}
















componentDidMount() {
  /*  const d={
    kind: "identitytoolkit#relyingparty",
    requestType: 'PASSWORD_RESET',
    email:'admin@gmail.com',
 // "challenge": string,
 // "captchaResp": string,
 // "userIp": string,
   newEmail:'admin@gmail.com',
   idToken:'1DRIIMrN5aURaOh9mAHH2yFu7Tc2'
    }
    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk',d).then(response =>{
      console.log(response.data);
    })*/
    //key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk
    /*let  url = 'https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyDer18n-1k1q-yGgD5YVzm1ts2BqYgJ3sk';
    const Data={
       email:this.state.email,
       url:'https://console.firebase.google.com/u/0/project/chireactproject/authentication/users',
    };
    axios.post(url,Data).then(response =>{
      console.log(response.data);
    })*/

   
   /* ValidatorForm.addValidationRule('isPasswordCorrect', (value) => {
        if (value=== 'admin123'){
            console.log(true)
            return true;
        }
        else{
            return false;
        }
    });
*/
   ValidatorForm.addValidationRule('isPassword', (value) => {
        if (value.length < 6) {
            return false;
        }
       return true;
    });

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        const { formData } = this.state;
        if (value !== formData.Newpassword) {
            return false;
        }
        return true;
    });

  
  
}







   render(){
    const style1 = {
        width:'70%',
        marginLeft:20,
        marginRight:20,
        height:50,
        marginTop:40,
        //marginBottom:10,
    };
     const style2={
            width:'70%',   
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            marginLeft:20,
            marginRight:20,
            height:40,
            marginTop:40,
            marginBottom:40,
           color:'#e5e5ff',
           textColor:'#e5e5ff'
        }
    const { formData, submitted } = this.state;
       return(
           <div>
            <center>
               <ValidatorForm
                        ref={r => (this.form = r)}
                        onSubmit={this.onRegister}
                        instantValidate={false}
                        style={{backgroundColor:'#e5e5ff'}}
                     >

                        <Grid item>  
                            <TextValidator
                                label="Email"
                                name="email"
                                type="email"
                                variant="outlined"
                                style={style1}
                                required
                                value='admin@gmail.com' 
                            />
                        </Grid>


                        <Grid item>
                            <TextValidator
                                label="Current Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={ formData.password}
                                validators={[/*'isPasswordCorrect' , */'required']}
                                errorMessages={[ /*'not correct password',*/'this field is required']}
                            />
                        </Grid>

                    <Grid item>
                            <TextValidator
                                label="New Password"
                                name="Newpassword"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={ formData.Newpassword}
                                validators={['isPassword','required']}
                                errorMessages={['password must be more than 6 character','this field is required']}
                            />
                        </Grid>

                        <Grid item>
                            <TextValidator
                                label="Re-Write New Password"
                                name="ConfirmPassword"
                                type="password"
                                variant="outlined"
                                onChange={this.handleChange}
                                style={style1}
                                required
                                value={formData.ConfirmPassword}
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch','this field is required']}
                            />
                        </Grid>  

                        <br />
               

                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                style={style2}
                                type="submit"
                                disabled={submitted}
                                //onClick={this.onRegister}
                            >
                                {
                                    (submitted && 'Sumbited' ) || (!submitted && 'Update')     
                                }
                           </Button>
                        </Grid>

                  
                    </ValidatorForm>
                    </center>
           </div>
       )
   }
}


export default Form;