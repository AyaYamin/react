import React, { Component } from "react";
import classes from "./Product.module.css";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Counter from '../../Counter/Counter';
import Modal from '@material-ui/core/Modal';
import axios from "axios";
// import Cart from '../../Cart/Cart';

class Product extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAdded: false,
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      
      cartBounce: false,
      quantity: 1,
      open:false
    };
    this.addToCart = this.addToCart.bind(this);
   // this.viewOrderHandler  = this.viewOrderHandler.bind(this);
    
  }
  
  
  addToCart(userEmail,image, name, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          userEmail:userEmail,
          image: image,
          name: name,
          price: price,
          id: id,
         quantity: quantity
        }
      },
function() {
  this.handleAddToCart(this.state.selectedProduct);
}
    );
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );


 }
 handleAddToCart(selectedProducts) {

  let cartItem = this.state.cart;
  let productID = selectedProducts.id;
  let productQty = selectedProducts.quantity;
  if (this.checkProduct(productID)) {
    console.log("hi");
    let index = cartItem.findIndex(x => x.id == productID);
    cartItem[index].quantity =
      Number(cartItem[index].quantity) + Number(productQty);
    this.setState({
      cart: cartItem
    });
  } else {
    cartItem.push(selectedProducts);
  }
  this.setState({
    cart: cartItem,
    cartBounce: true
  });
  console.log(this.state.quantity);
  setTimeout(
    function() {
      this.setState({
        cartBounce: false,
        quantity: 1
      });
      console.log(this.state.quantity);
     // console.log(this.state.cart);
    }.bind(this),
    1000
  );
  const cart = {
    cart:this.state.cart,
    //userId:this.props.userId,
  }
  axios.post('https://auth-6c8e5.firebaseio.com/cart.json',
  selectedProducts);
  
   const userId = this.props.userId;
  console.log(this.props.userEmail);
  
  this.sumTotalItems(this.state.cart);
  this.sumTotalAmount(this.state.cart);

 
}


checkProduct(productID) {
  let cart = this.state.cart;
  return cart.some(function(item) {
    return item.id === productID;
  });
}
sumTotalItems() {
  let total = 0;
  let cart = this.state.cart;
  total = cart.length;
  this.setState({
    totalItems: total
  });
}
sumTotalAmount() {
  let total = 0;
  let cart = this.state.cart;
  for (var i = 0; i < cart.length; i++) {
    total += cart[i].price * parseInt(cart[i].quantity);
  }
  this.setState({
    totalAmount: total
  });
}

//   quickView(image, name, price, id) {
//     this.setState(
//       {
//         quickViewProduct: {
//           image: image,
//           name: name,
//           price: price,
//           id: id
//         }
//       },
//       function() {
//         this.props.openModal(this.state.quickViewProdcut);
//       }
//     );
//   }
updateQuantity(qty) {
  console.log("quantity added...");
  this.setState({
    quantity: qty
  });
  console.log(this.state.cart);
}
handleChange(){
  this.setState({open:true});
}
handleClose(){
  this.setState({open:false});
}

  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let id = this.props.id;
  let quantity = this.props.productQuantity;
    
  const body=(
    <div style={{
      alignItems:'center',
      top:'10%',
      backgroundColor:'white',
      bottom:'10%'
      }}>
    <p className={classes.productimage}>
            <img
                src={image}
                alt={this.props.name}
               
              />
            </p>
            <h1
            className={classes.productname}>
            <span style={{fontSize:'5'}}>
            Product's Name:
              </span> 
            {this.props.name}
            </h1>
            
            <p className={classes.productprice}>
           
          {this.props.price}
            </p>
            </div>
    )
  return (
    <React.Fragment>
      <Card  className={classes.product}>
      <CardActionArea >

        <CardMedia onClick={this.handleChange.bind(this)}
          className={classes.productimage}>
             <img
            src={image}
            alt={this.props.name}
           
          />
          </CardMedia>
         
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" 
          className={classes.productname}>
           {this.props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" 
          className= {classes.productprice}>
         {this.props.price}
          </Typography>
          <Typography variant="body2">
          {/* <Counter
          productQuantity={quantity}
          updateQuantity={quantity => this.updateQuantity(quantity)}
          resetQuantity={this.resetQuantity}
        /> */}

          </Typography>
        </CardContent>
      </CardActionArea>








      <CardActions>
       
        <Button size="small" color="primary" 
      onClick={this.addToCart.bind(
        this,
        this.props.useremail,
        image,
        name,
        price,
        id,
        quantity
      )}
         className={classes.button}>
        {!this.state.isAdded ? "ADD TO CART" : "✔ ADDED"}
        </Button>
      </CardActions>

      
    </Card>


    
    <Modal style={{
      width:'650px',
    height:'220px',
   
  
    paddingLeft:'30%',
    
  }}
      open={this.state.open}
      onClose={this.handleClose.bind(this)}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
   
      >
        {body}

      </Modal>


      <div style={{display:'none'}}>
      {/* <Cart  products = {this.state} /> */}
      </div>
    </React.Fragment>
   
    );
  }
}

export default Product;
export  class Cart extends Component{

  render(){
    return(
      <React.Fragment>
      <div>
       {this.props.products.cart ? this.props.products.cart.map(product =>{
         return(
           <div>

             <p>{product.id}</p>
            <p>{product.price}</p>
             <p> {product.image}</p>
     
             <p>{product.name}</p>
            
             </div>
         )
     }) :<p></p>}
      </div>
      </React.Fragment>
    );
  }
}
