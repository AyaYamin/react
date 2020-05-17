import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../../assests/images/k.png';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    maxHeight:1000,
    //marginLeft:100,
    marginTop:100,

  },
});

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
      <center>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="400"
          image={logo}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
              About Us
          </Typography>
          <Typography variant="body2" color="textSecondary" component="pre">
          
          
        
        <pre> Welcome to Chi Store, your number one source for all things  all products.</pre>
        <pre> We are  dedicated to giving you the very best of products,with a focus on </pre>
        <pre> three characteristics, ie: dependability, customer service and uniqueness.</pre> 
          <br/>
        <pre> Founded in 2013,Chi  has come a long way from its beginnings in Palestine. </pre>  
        <pre> When Chi founder first started out,his passion for passion of founder,drove</pre>
        <pre> him to produce,  and gave him the impetus to turn hard work and inspiration</pre>  
        <pre> into to a booming online store.We now serve customers all  over Palestine ,</pre> 
        <pre>    and are thrilled to be a part of the world industry. </pre>
            
     
      
         
          </Typography>
        </CardContent>
      </CardActionArea>


      <CardActions>
        <Button size="small"  style={{color:'red'}} variant="text">
          Contact Email           :  admin@gmail.com  
        </Button>
        
      </CardActions>
      <CardActions>
          <Button size="small"  style={{color:'red'}}>
          Contact   Phone Number  : 0597170354
        </Button>
      </CardActions>
    </Card>
    </center>
  );
}
