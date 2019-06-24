import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Location from './Location';
import { country_list, citiesName } from '../../assets/countryName'
import {AddInfo} from '../../config/firebase'

import Button from '@material-ui/core/Button';

const countryName = country_list;
const city = citiesName;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
  imgInput: {
    display: 'flex',
    justifyContent: "center",
    width: "100%",
  }

}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    country: '',
    city: '',
    img: '',
  });


  const InfoObject = {
    country: values.country,
    city: values.city,
  }

  const images = []

  const handleChange = name => event => {
    if(name !== 'img'){
      setValues({ ...values, [name]: event.target.value });
    }else{
     // setValues({ ...values, [name]: event.target.files[0]});
      //console.log(event.target.files[0].name)
      images.push(event.target.files[0])
    }
  };






  return (
    <div>
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-select-country"
        select
        label="Select Your Country"
        fullWidth
        className={classes.textField}
        value={values.country}
        onChange={handleChange('country')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}

        margin="normal"
        variant="outlined"
      >
        {countryName.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="outlined-select-city"
        select
        label="Select Your city"
        fullWidth
        className={classes.textField}
        value={values.city}
        onChange={handleChange('city')}
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}

        margin="normal"
        variant="outlined"
      >
        {city.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    
      <div className={classes.imgInput}></div>
      <TextField
        id="outlined-name"
        margin="normal"
        variant="outlined" 
        row="2"             
        className={classes.textField}
        onChange={handleChange('img')}
        helperText="Select Your Resturant Certificat"
        type="file"
      />
      

      <TextField
        id="outlined-name"
        margin="normal"
        variant="outlined" 
        row="2"             
        className={classes.textField}
        onChange={handleChange('img')}
        helperText="Select Your Resturant Profile Image"
        type="file"
      />
   <div style={{marginLeft:"25px",marginRight:'25px', marginTop:"16px"}}>
    
    <Location /> 
 
    </div>
      <Button style={{height:'55px', marginTop:"16px",marginLeft:"25px"}} onClick={()=>{AddInfo(images,InfoObject);}} variant="contained" color="primary" className={classes.button}>
        Save Data
      </Button>


   </form>
  </div>
  );
}


