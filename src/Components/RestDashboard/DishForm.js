import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { country_list, citiesName } from '../../assets/countryName'
import { addDish } from '../../config/firebase'


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
        dishname: '',
        amount: '',
        imgDish: '',
    });


    const dishDetails = {
        dishname: values.dishname,
        amount: values.amount,
    }


    function valuesDelete() {
        setValues({
            dishname: '',
            amount: '',
            imgDish: '',
        })
    }


    const handleChange = name => event => {
        if (name !== 'imgDish') {
            setValues({ ...values, [name]: event.target.value });
        } else {
            setValues({ ...values, [name]: event.target.files[0] });
        }
    };



    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">

                <TextField
                    id="outlined-name"
                    margin="normal"
                    variant="outlined"
                    rowsMax="4"
                    className={classes.textField}
                    onChange={handleChange('imgDish')}
                    helperText="Select Dish Image"
                    type="file"
                />

                <TextField
                    id="outlined-multiline-flexible"
                    label="Enter Dish"
                    multiline
                    rowsMax="4"
                    value={values.dishname}
                    onChange={handleChange('dishname')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-multiline-flexible"
                    label="Amount"
                    multiline
                    rowsMax="4"
                    type='Number'
                    value={values.amount}
                    onChange={handleChange('amount')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    
                />
              


                <Button style={{ height: '55px', marginTop: "15px",marginLeft:"10px" }}
                    onClick={() => { addDish(values.imgDish, dishDetails); valuesDelete(); }}
                    variant="contained" color="primary" className={classes.button}>
                    Save
               </Button>

            </form>


        </div>


    );
}


