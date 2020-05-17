import React,{Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import swal from 'sweetalert';

class Delete1 extends Component{
       
    constructor(props){
        super(props);
        this.state={
            formData: {
                id: '',
            },
            submitted: false,
        }
        this.handleChange=this.handleChange.bind(this);
        this.onRegister=this.onRegister.bind(this);
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        if (event.target.name === 'id') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }


    onRegister=(e)=>{
         e.preventDefault();
         console.log(this.state.formData);
         const id=this.state.formData['id'];
         let url='https://chireactproject.firebaseio.com/Products/'+id+'.json';
         axios.delete(url).then(response =>{
            console.log(response);
          }).catch(error => {
            console.log(error);
        })
           swal({
               title: "Deleted Successfuly to Sales",
               type: "success",
           })
          this.setState({
              formData:{
                id: '',
              }
          });
    }

    render(){
        const style1 = {
            width:'65%',
            marginLeft:20,
            marginRight:20,
            height:50,
            marginTop:40,
            size:'small'
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
                                    label="ID"
                                    name="id"
                                    type="text"
                                    variant="outlined"
                                    style={style1}
                                    required
                                    value={formData.id}
                                    onChange={this.handleChange}
                                />
                            </Grid>

                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={style2}
                                    type="submit"
                                    disabled={submitted}
                                >
                                    {
                                        (submitted && 'Sumbited' ) || (!submitted && 'Delete')     
                                    }
                               </Button>
                            </Grid>
    
                      
                        </ValidatorForm>
                        </center>
               </div>
           )}
}

export  default Delete1;
