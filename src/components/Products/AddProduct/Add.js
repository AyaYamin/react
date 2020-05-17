import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Add1 from './Add1';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    marginTop:50,
    marginLeft:200,
    marginRight:200,
    marfinBottom:50,
    width:'50%'
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value ] = React.useState(0);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{height:60}} >
        <Tabs value={value} aria-label="simple tabs example"  >
             <Tab label="Add A New Product To Sale"  style={{fontSize:15  ,color:'#e5e5ff',height:60}}/>
        </Tabs>
      </AppBar>

       <Add1 />
    </div>
  );
}