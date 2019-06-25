import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Location from './Location';
import { country_list, citiesName } from '../../assets/countryName'
import { userAddInfo } from '../../config/firebase'

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
  },
  formControl: {
    margin: theme.spacing(3),

  },
  group: {
    margin: theme.spacing(0, 0),
    display: 'flex',
    flexDirection: 'row'
  },
  grid: {
    width: '60%',
  },

}));

export default function OutlinedTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    country: '',
    city: '',
    Gender: '',
    img: '',
    date: '',
    contact: '',
    accountType: 'User'
  });


  const InfoObject = {
    country: values.country,
    city: values.city,
    contact: values.contact,
    Gender: values.Gender,
    date: values.date,
    accountType: values.accountType
  }


  function valuesDelete() {
    setValues({
      country: '',
      city: '',
      Gender: '',
      img: '',
      date: '',
      contact: '',
    })
  }


  console.log(InfoObject)



  const handleChange = name => event => {
    if (name !== 'img') {
      setValues({ ...values, [name]: event.target.value });
    } else {
      setValues({ ...values, [name]: event.target.files[0] });
      //console.log(event.target.files[0].name)
      // images.push(event.target.files[0])
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

        <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          label="Enter Contact Number"
          name='contact'
          fullWidth
          value={values.contact}
          className={classes.textField}
          onChange={handleChange('contact')}
          type="text"
        />


        <div style={{ marginLeft: "14px", marginRight: '25px', marginTop: "16px" }}>
          <Location />
        </div>


        <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          rowsMax="4"
          className={classes.textField}
          onChange={handleChange('img')}
          helperText="Select Your Resturant Profile Image"
          type="file"
        />



        <TextField
          id="outlined-name"
          margin="normal"
          variant="outlined"
          value={values.date}
          className={classes.textField}
          onChange={handleChange('date')}
          helperText="Birth of date"
          type="date"
        />



        <div >
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender"
              className={classes.group}
              value={values.Gender}
              onChange={handleChange('Gender')}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </div>

        <Button style={{ height: '55px', marginTop: "25px", marginLeft: "25px" }} onClick={() => { userAddInfo(values.img, InfoObject); valuesDelete() }} variant="contained" color="primary" className={classes.button}>
          Save Data
      </Button>


      </form>
    </div>
  );
}


