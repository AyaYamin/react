import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Button from '@material-ui/core/Button';
import LockIcon from '@material-ui/icons/Lock';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chi from '../../../assests/images/chi1.png';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Hist from '../../../index';
import {  Route,Router,Redirect} from "react-router-dom";
import Login from '../../../containers/Login/Login';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Person from "@material-ui/icons/Person";
import Profile from '../../Profile/Profile';
import {   Link,Switch} from "react-router-dom";
import Products from '../../Products/Products';
import Add from '../../Products/AddProduct/Add';
import Delete from '../../Products/DeleteProduct/delete';
import ImgMediaCard from '../../History/History';
import EnhancedTable from '../../OrderList/OrderList';


const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    height:75,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));





export default function PermanentDrawerLeft() {


  const classes = useStyles();

  return (
    <div className={classes.root}>

      <CssBaseline />

      <BrowserRouter>

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
           <Typography variant="h6" className={classes.title}>
                 {/* <ListItemIcon><Dashboard style={{color:'white'}}/></ListItemIcon> */}
           </Typography>
           <Button 
                color="inherit" 
                onClick={ ()=>{
                    const path = <Redirect from="/Admin" to="/Login" />;
                    return(
                        ReactDOM.render(
                             <Router history={Hist}>
                                 <Route path="/Login" component={Login} />  
                                 {path}
                             </Router>,
                             document.getElementById("root")
                        )
                          );

                      }}>
              <LockIcon />
              <b>LogOut</b>
           </Button>
        </Toolbar>
      </AppBar>


      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        //style={{backgroundColor:'white'}}
      >

        <div className={classes.toolbar} >
               <img src={Chi}  style={{marginLeft:60}}  alt='chi'/>
        </div>
         

        <Divider  style={{marginLeft:10,marginRight:10 ,backgroundColor:'blue'}} light />


        <List>
             <ListItem  button key={'Profile'}  component={Link} to={"/Admin/Profile"}>         
                  <ListItemIcon><Person color="primary" /></ListItemIcon>
                  <ListItemText primary={'Profile'} style={{color:"blue"}}/>
              </ListItem> 
        </List>





        <List>  
            <ListItem button component={Link} to={"/Admin/Products"}>
              <ListItemIcon><AddShoppingCartIcon color="primary" /></ListItemIcon>
              <ListItemText primary={'Products'} style={{color:"blue"}}/>
            </ListItem>
        </List>

            

           

          
{/* 
            <List> 
             <ListItem button component={Link} to={"/Admin/Description"}>
              <ListItemIcon><DescriptionIcon color="primary" /></ListItemIcon>
              <ListItemText primary={'Products Description'} style={{color:"blue"}}/>
            </ListItem>
            </List> 
           
 */}

          

            <List> 
               <ListItem button component={Link} to={"/Admin/Add"}>
                   <ListItemIcon><AddCircleIcon  color="primary"/></ListItemIcon>
                    <ListItemText primary={'Add Products'}  style={{color:"blue"}}/>
               </ListItem>
            </List> 

        

            <List> 
               <ListItem button component={Link} to={"/Admin/Delete"}>
                <ListItemIcon><HighlightOffIcon color="primary"/> </ListItemIcon>
                <ListItemText primary={'Delete Products'} style={{color:"blue"}}/>
               </ListItem>
            </List> 


           


            <List> 
                <ListItem button  component={Link} to={"/Admin/Order"}>
                  <ListItemIcon><BorderColorIcon color="primary"/> </ListItemIcon>
                  <ListItemText primary={'Order List'} style={{color:"blue"}}/>
                </ListItem> 
            </List>   


            

            <List> 
                <ListItem button component={Link} to={"/Admin/History"}>
                      <ListItemIcon><InboxIcon  color="primary"/></ListItemIcon>
                      <ListItemText primary={'History'} style={{color:"blue"}}/>
                </ListItem>
            </List>
 
      </Drawer>


      <main className={classes.content} style={{backgroundColor:'white' }}> 
        <div className={classes.toolbar} style={{backgroundColor:'white'}}/> 

        <Switch>
            <Route path="/Admin/Profile" render={() => <div> <Profile/></div>} /> 
            <Route path="/Admin/Products" render={() => <div><Products/></div>} /> 
           
           
            <Route path="/Admin/Add" render={() => <div><Add/></div>} /> 
            <Route path="/Admin/Delete" render={() => <div><Delete/> </div>} /> 
            <Route path="/Admin/Order" render={() => <div><EnhancedTable/> </div>} /> 
            <Route path="/Admin/History" render={() => <div> <ImgMediaCard/></div>} /> 

            <Route path="/Admin/Products" component={Products} />
            <Redirect  from='/Admin' to='/Admin/Products'/>
          </Switch>
      </main>

      </BrowserRouter>
    </div>
  );
}

