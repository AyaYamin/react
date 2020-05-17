import React, { Component } from "react";
import  "./Product.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  
  }
  
  



  render() {
    let image = this.props.image;
    //let name = this.props.name;
    let price = this.props.price;
    let description=this.props.description;
    let category=this.props.category;
 
    return (    
  
      <Card className='product' onClick={()=>swal({ 
                                                //title:  name ,
                                                title: 'This Product is '+description + '  with  special price of $ '+price +'.  Its is Categorised as ' +category,
                                                icon: 'info',
                                                button: "Close",  
                                                                                                
                                        })     
                                        }

                                      
      > 

         <CardActionArea>     
              <CardMedia  className='productimage'>  
                 <img
                    src={image}
                    alt={this.props.name}    
                 />
              </CardMedia>
              <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className='productname'>
                        {this.props.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="h2" className='productprice' style={{color:'cadetblue' ,fontSize:'22px'}}>
                          {this.props.price }
                  </Typography>
              </CardContent>
          </CardActionArea>
    </Card>

    );
  }
}

export default Product;
