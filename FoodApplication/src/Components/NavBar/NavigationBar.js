import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Silder from '../slider'
import HomeCard from '../HomeCard'
import "./navbar.css"
import InfoForm from '../InfoAdd/InfoAddForm'
import { getDishes } from '../../config/firebase'
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Card from '../UserDashboard/ProductCart'
import DetailScreen from '../UserDashboard/Detailscreen'
import CardIcon from '../UserDashboard/AddCardIcon'
import Button from '@material-ui/core/Button';
class NavigationBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodArray: [],
            chipArray: ['Kima', 'Pizza', 'Biryani'],
            text: "",
            isResturant: true,
        }
        this.fatchingDishes = this.fatchingDishes.bind(this)
    }
    componentDidMount() {
        this.fatchingDishes()
    }
    async fatchingDishes() {
        try {
            const getingdish = await getDishes()
            this.setState({
                foodArray: getingdish
            })
            console.log(getingdish)
        } catch (e) {
            console.log(e)
        }
    }
    async search(e) {
        const { foodArray } = this.state;
        const text = e.target.value;
        const result = await foodArray.filter((elem) => {
            return elem.dishname.substring(0, text.length).toLowerCase() === (text.toLowerCase())
        })
        this.setState({ result, text });
    }
    async  handleClick(chipText) {
        const { foodArray } = this.state;
        const text = chipText;
        const result = await foodArray.filter((elem) => {
            return elem.dishname.substring(0, text.length).toLowerCase() === (text.toLowerCase())
        })
        this.setState({ result, text });
    }
    render() {
        const {
            foodArray, result, text, chipArray,
            isResturant,
        } = this.state;
        const arr = text.length ? result : foodArray;
        return (
            <div>     
             <div>               
                <h1 className="titleHeading">Get Food Online</h1>
                <div className="navBarDiv">
                    <button className="but-login btn button:hover" onClick={() => this.props.history.push('/Login')} >Login</button>
                    <button className="but-signup" onClick={() => this.props.history.push('/RegisterForm')} >Sign Up</button>
                </div>
                </div>
                <div>                    
                    <Silder />
                    {isResturant && <InfoForm>
                        <center>
                            <Typography style={{ marginBottom: '6px' }} variant="h5" component="h3"> Menus List </Typography>
                            <Divider style={{ marginBottom: '8px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <input style={{ width: '300px' }} value={text} placeholder='Search...' onChange={this.search.bind(this)} />
                                <div>
                                    <Chip style={{ width: '90px' }} variant="outlined" color="primary"
                                        label={"All Items"}
                                        onClick={() => { this.handleClick("") }}
                                    />
                                    {chipArray.map((item, index) => {
                                        return (<div style={{ display: 'inline-block' }}>
                                            <Chip style={{ width: '60px' }} variant="outlined" color="primary"
                                                key={item}
                                                label={item}
                                                onClick={() => { this.handleClick(item) }}
                                            />
                                        </div>)
                                    })}
                                </div>
                            </div>
                            <Divider style={{ marginTop: '8px' }} />
                        </center>
                        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
                            {
                                arr.map((item, index) => {
                                    return (<div style={{ marginTop: '15px' }}><Card
                                        key={item.dish_uid}
                                        dishName={item.dishname}
                                        price={'Rs' + item.amount}
                                        restName={item.rest_Name}
                                        imgUrl={item.imageUrl}
                                        addToCard={<Button variant="contained" color="primary" style={{ float: 'right', margin: '-20px 0px 0px 0px', position: 'relative' }}
                                        onClick={() => {this.props.history.push('/Login') }}
                                    >
                                        Buy{' - '} <i className="fas fa-cart-plus" style={{ fontSize: '15px', }}></i>
                                    </Button>}
                                    /></div>)
                                })
                            }
                        </div>
                    </InfoForm>}
                </div>
            </div>
        );
    }
}
export default NavigationBar;