import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {country_list,citiesName} from '../../assets/countryName'
import CertificatForm from './CertificatForm'

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
}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
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

            <CertificatForm />
      

 
    </form>
  );
}
