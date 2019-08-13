import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from '../AppBar/Appbar'
import Loader from "../Loader/Loader"
import TabsItem from '../AppBar/TabsItem'
import { logout, orderBooked } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import UserInfoForm from '../UserDashboard/CellectUserInfo'
import Card from './ProductCart'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import DetailScreen from './Detailscreen'
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import CardIcon from './AddCardIcon'

import { getDishes } from '../../config/firebase'

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isUserinfoForm: false,
            foodArray: [],
            chipArray: ['Kima', 'Pizza', 'Biryani'],
            text: "",
            isResturant: true,
            orders: [],
            orderObj: {},

        }

        this.fatchingDishes = this.fatchingDishes.bind(this)

    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 200);

        this.fatchingDishes()
    }


    userInfoFormFunc() {
        const {
            isLoading, isUserinfoForm
        } = this.state;

        this.setState({
            isUserinfoForm: true,
            isResturant: false,
        })
    }

    isResturantHandle() {
        const {
            isLoading, isUserinfoForm, isResturant
        } = this.state;

        this.setState({
            isUserinfoForm: false,
            isResturant: true,
        })
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


    //////////////


    onClickValue = (rest_uid, dishname, amount) => {
        amount = parseInt(amount);
        this.setState({ orderObj: { rest_uid, dishname, amount } });
        this.onAddOrder()
    };


    onAddOrder = () => {
        // not allowed AND not working
        this.setState(state => {
            const Orders = state.orders.push(state.orderObj);

            return {
                Orders,
                orderObj: '',
            };
        });
    };



    onCancelOreder = () => {
        this.setState({ orders: [] })
    }


    onSaveOrder = () => {
        const { orders } = this.state
        orders.map((item) => {
            return (orderBooked(item))

        })
        Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your Order Confirmed',
            showConfirmButton: false,
            timer: 1500
        })
    }



    /////////////

    render() {
        const {
            isLoading, isUserinfoForm, foodArray, result, text, chipArray,
            isResturant, orders,
        } = this.state;


        console.log(orders, "Order working user")

        const arr = text.length ? result : foodArray;
        return (
            <div>
                {isLoading ? <Loader /> :
                    <Appbar userName={"Welcome " + this.props.user.firstName}
                        InfoForm={
                            <div>
                                {isUserinfoForm && <div>
                                    <InfoForm>
                                        <Typography variant="h5" component="h3">Add User Info</Typography>
                                        <UserInfoForm />
                                    </InfoForm>
                                </div>}
                                {isResturant && <InfoForm>
                                    <center>
                                        <Typography style={{ marginBottom: '6px' }} variant="h5" component="h3">Resturant's Menus List </Typography>
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
                                                    addToCard={<DetailScreen
                                                        orderDrop={this.onCancelOreder}
                                                        saveOrder={this.onSaveOrder}
                                                        CardIcon={<CardIcon badgeContentcounter={orders.length} />}
                                                    >

                                                        <div style={{ margin: "50px auto", display: 'flex', justifyItems: 'space-between', }}>
                                                            <Card
                                                                dishName={item.dishname}
                                                                price={'Rs' + item.amount}
                                                                imgUrl={item.imageUrl}
                                                                addToCard={<Button variant="contained" color="primary" style={{ float: 'right', margin: '-20px 0px 0px 0px', position: 'relative' }}
                                                                    onClick={() => { this.onClickValue(item.rest_uid, item.dishname, item.amount) }}
                                                                >
                                                                    Buy{' - '} <i className="fas fa-cart-plus" style={{ fontSize: '15px', }}></i>
                                                                </Button>}

                                                            />


                                                        </div>

                                                    </DetailScreen>}

                                                /></div>)
                                            })
                                        }

                                    </div>
                                </InfoForm>}

                            </div>
                        }

                    >

                        <TabsItem
                            myfunc={() => { this.userInfoFormFunc() }}
                            myIcon={'fas fa-user-cog'}
                            tabName={'User Info'}
                        />

                        <TabsItem
                            myfunc={() => { this.isResturantHandle() }}
                            myIcon={'fas fa-utensils'}
                            tabName={'Restaurants'}
                        />

                        <TabsItem
                            myfunc={() => { alert("My Requests") }}
                            myIcon={'fas fa-concierge-bell'}
                            tabName={'My Requests'}
                        />

                        <TabsItem
                            myfunc={() => { logout(this.props) }}
                            myIcon={'fas fa-sign-out-alt'}
                            tabName={'Logout'}
                        />


                    </Appbar>
                }

                {/* <br/><br/>     
             {"this account Type" + this.props.user.accountType}
            <br/><br/>
            {"Name " + this.props.user.firstName} */}

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(User);
