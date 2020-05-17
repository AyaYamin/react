import React,{Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from 'axios';
import swal from 'sweetalert';

class Add1 extends Component{
       
    constructor(props){
        super(props);
        this.state={
            formData: {
                id: '',
                name:'',
                description:'',
                category:'',
                price:'',
                image:'',
                quantity:'',
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
        if (event.target.name === 'name') {
            this.form.isFormValid(false);
        }
        if (event.target.name === 'image') {
            this.form.isFormValid(false);
        }
        if (event.target.name === 'category') {
            this.form.isFormValid(false);
        }
        if (event.target.name === 'price') {
            this.form.isFormValid(false);
        }
        if (event.target.name === 'description') {
            this.form.isFormValid(false);
        }
        if (event.target.name === 'quantity') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }

    onRegister=(e)=>{
         e.preventDefault();
         console.log(this.state.formData);
         const authData={
              name:this.state.formData['name'],
              id:this.state.formData['id'],
              image:this.state.formData['image'],
              price:this.state.formData['price'],
              category:this.state.formData['category'],
              description:this.state.formData['description'],
              quantity:this.state.formData['quantity'],
         }
         let url='https://chireactproject.firebaseio.com/Products.json/';
         axios.post(url,authData).then(response =>{
            console.log(response);
          }).catch(error => {
            console.log(error);
        })
           swal({
               title: "Added Successfuly to Sales",
               type: "success",
           })
          this.setState({
              formData:{
                id: '',
                name:'',
                description:'',
                category:'',
                price:'',
                image:'',
                quantity:'',
              }
          });
    }

    render(){
        const style1 = {
            width:'70%',
            marginLeft:20,
            marginRight:20,
            height:40,
            marginTop:40,
        };
        const style2={
            width:'50%',   
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
                                    label="ID"
                                    name="id"
                                    type="number"
                                    variant="outlined"
                                    style={style1}
                                    required
                                    value={formData.id}
                                    onChange={this.handleChange}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>
    
    
                            <Grid item>
                                <TextValidator
                                    label="Name"
                                    name="name"
                                    type="text"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={ formData.name}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>
    
                        <Grid item>
                                <TextValidator
                                    label="Category"
                                    name="category"
                                    type="text"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={ formData.category}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>
    
                            <Grid item>
                                <TextValidator
                                    label="Price"
                                    name="price"
                                    type="text"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={formData.price}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                                </Grid>  

                            <Grid item>
                                <TextValidator
                                    label="Image "
                                    name="image"
                                    type="text"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={formData.image}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid> 


                            <Grid item>
                                <TextValidator
                                    label="Desciption"
                                    name="description"
                                    type="area"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={formData.description}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
                                />
                            </Grid>  


                            <Grid item>
                                <TextValidator
                                    label="Quantity"
                                    name="quantity"
                                    type="area"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    style={style1}
                                    required
                                    value={formData.quantity}
                                    validators={[ 'required']}
                                    errorMessages={['this field is required']}
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
                                        (submitted && 'Sumbited' ) || (!submitted && 'Add')     
                                    }
                               </Button>
                            </Grid>
    
                      
                        </ValidatorForm>
                        </center>
               </div>
           )}
}

export  default Add1;
