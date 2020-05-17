import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import Modal from '@material-ui/core/Modal';

class EnhancedTable extends Component {


constructor(props){
    super(props);
    this.state={
          status:'',
          total:'',
          orders:[],
          ord:[],
          id:'',
          quantity:'',
          image:'',
          email:'',
          open:false,
          keys:[],
    };
    this.handleOpen=this.handleOpen.bind(this);
   // this.handleReject=this.handleReject.bind(this);
}

componentDidMount(){
    let url="https://chireactproject.firebaseio.com/Orders.json/";
    axios.get(url).then(response => {
      const order=[];
      const k=[];
      for(let key in response.data){
        order.push({
            id:response.data[key].id,
            status:response.data[key].status,
            total:response.data[key].total,
            image:response.data[key].image,
            email:response.data[key].email,
            quantity:response.data[key].quantity,
        })
         k.push({key,id:response.data[key].id});

      }

      console.log(k);
      this.setState({orders:order});
      this.setState({keys:k});
      console.log(order)
    }).catch(err=>console.log(err));
}

handleClose(){
    this.setState({open:false});
  }

handleOpen = () => {
    this.setState({open:true});
}


render() {


return (

<div>  

    <Paper className="container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell >Total Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Show</TableCell>
            <TableCell>Accept</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { this.state.orders.map(( item,i) => (

        
            <TableRow key={i} >
              <TableCell component="th" scope="row">
                     {
                       item.id
                     }
              </TableCell>
              <TableCell >{item.total}</TableCell>
              <TableCell >{item.status}</TableCell>
              <TableCell >
                    <Button  
                            variant="contained" 
                            color="primary" 
                            type="submit"  
                            onClick={this.handleOpen}
                    >
                              More Details

                    </Button>
                     
                    <Modal 
                        style={{
                             width:'750px',
                             height:'1000px',
                             paddingLeft:'30%',
                             paddingTop:'10%'
                                 }}
                             open={this.state.open}
                             onClose={this.handleClose.bind(this)}
                             aria-labelledby="simple-modal-title"
                             aria-describedby="simple-modal-description"
                 >
                 { <div  style={{
                             alignItems:'center',
                             top:'30%',
                             backgroundColor:'white',
                             bottom:'20%',
                             height:'400px',
                             }}>
                     <center>
                      <h3 style={{alignContent:'center'}}>        
                         <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                             Clients Email  : {item.email}
                         </span>      
                     </h3>
                     <h3>        
                       <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                             Order's quantity : {item.quantity}
                       </span>      
                     </h3>
                     <h3>        
                       <span style={{fontSize:'5',color:'blue',alignContent:'center'}}>
                             Shape Of Product in Order:
                        </span>
                      </h3>  
                       <img
                         src={item.image}
                         alt=''
                       />
                     </center> 
                 </div>}
                 </Modal> 
              </TableCell>
                        

              <TableCell>
                        <Button  
                            variant="contained" 
                            color="primary" 
                            type="submit"  
                            onClick={()=>{
                                 var arr = [];
                                 var arr1=[];
                                 var x=[];
                                 arr=this.state.orders;
                                 var y=this.state.keys;
                                 //console.log(y);
                                 for(let i=0;i<arr.length;i++)
                                 {
                                      Object.keys(arr[i]).forEach(function(key) {
                                          arr1.push(arr[i][key]);
                                          });    
                                  } 
                                  for(let a=0;a<6;a++)
                                  {
                                          x.push(arr1[a]);       
                                  }


                                   var array=[];
                                   var array1=[];
                                   for(let i=0;i<y.length;i++)
                                 {
                                      Object.keys(y[i]).forEach(function(k) {
                                        array.push(y[i][k]);
                                          });    
                                  }
                                  for(let a=0;a<2;a++)
                                  {
                                     array1.push( array[a]);       
                                  }

                                 console.log(array);


                                if(array1[1]===item.id){
                                          const ordered={
                                              id:x[0],
                                              status:'Approved',
                                              total:x[2],
                                              image:x[3],
                                              email:x[4],
                                              quantity:x[5],
                                           }
                                 //this.setState({ord:ordered})
                                 console.log(ordered);
                                 let url="https://chireactproject.firebaseio.com/Orders/"+array1[0]+".json";
                                 //const idd='5';
                                
                                 
                                
                                 axios.patch(url,ordered).then((response)=>{
                                   console.log(response);
                                 }).catch(err=>console.log(err));
                            }}
                            }
                        >
                            Approve Order
                    </Button>
 
              </TableCell>

            </TableRow>
          ))
          }
        </TableBody>
      </Table>
     
    </Paper>


</div>

        );
    }
}

export default EnhancedTable;