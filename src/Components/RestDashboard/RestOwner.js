import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "../Loader/Loader"
import Appbar from '../AppBar/Appbar'
import TabsItem from '../AppBar/TabsItem'
import { logout,getPenddingOrder } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import RestInfoInputForm from '../RestDashboard/InfoCellecetForm'
import AddDishInputForm from '../RestDashboard/DishForm'
import PendingOrders from './PendingOrders'
import Inprogress from './Inprogress'
import Delivered from './Delivered'
 

class RestOwner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isRestForm: false,
            isPending: false,
            isInprogress: false,
            isDelivered: false,
            isOrderControll: false,
            boardName: "",
        }

        this.viewFunc = this.viewFunc.bind(this)
        this.orderViewFunc = this.orderViewFunc.bind(this)
        
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 0);
        this.fatchPenddinfOrders()
    }

    viewFunc() {
        const { isRestForm, isOrderControll } = this.state;

        this.setState({
            isOrderControll: false,
            isRestForm: !isRestForm,
        })
    }

    orderViewFunc(name) {
        const {
            isRestForm,
            isPending, isInprogress,
            isDelivered, boardName,
        } = this.state;

        if (name === "Pending") {
            this.setState({
                isInprogress: false,
                isDelivered: false,
                isOrderControll: true,
                isRestForm: false,
                isPending: true, boardName: "Pending Orders"
            })
        } else if (name === 'Inprogress') {
            this.setState({
                isPending: false,
                isDelivered: false,
                isOrderControll: true,
                isRestForm: false,
                isInprogress: true, boardName: "In Progress Orders"
            })
        } else {
            this.setState({
                isPending: false,
                isInprogress: false,
                isOrderControll: true,
                isRestForm: false,
                isDelivered: true, boardName: "Delivered Orders"
            })
        }



    }


   async fatchPenddinfOrders(){
        try{
            const  getingPenddingOrders = await getPenddingOrder()
            console.log(getingPenddingOrders,"perdding Gating")
        }catch (e){

        }
    }

    render() {
        const {
            isLoading, isRestForm,
            isPending, isInprogress,
            isDelivered, boardName,
            isOrderControll,
        } = this.state;

        return (
            <div>
                {
                    isLoading ? <Loader /> :
                        <Appbar userName={"Welcome " + this.props.user.resturantName}
                            InfoForm={
                                <div>
                                    {isRestForm && <div> <InfoForm>
                                        <Typography variant="h5" component="h3">Resturant Information Form</Typography>
                                        <RestInfoInputForm />
                                        </InfoForm>
                                        <br />
                                        <InfoForm>
                                            <Typography variant="h5" component="h3">Add Dishses</Typography>
                                            <AddDishInputForm />
                                        </InfoForm> </div>}

                                    {/* {Resturen Order } */}
                                    {isOrderControll && <div>
                                        <InfoForm>
                                            <center>
                                                <Typography variant="h5" component="h3">{boardName}</Typography>
                                            </center>

                                            {isPending && <PendingOrders 
                                            
                                            />}

                                            {isInprogress && <Inprogress />}

                                            {isDelivered && <Delivered />}

                                        </InfoForm>
                                    </div>
                                    }

                                </div>
                            }>

                            <TabsItem
                                myfunc={() => { this.viewFunc() }}
                                myIcon={'fas fa-user-cog'}
                                tabName={'Add Restaurants Info'}
                            />

                            <TabsItem
                                myfunc={() => { alert("Restaurants") }}
                                myIcon={'fas fa-id-card-alt'}
                                tabName={'Your Info'}
                            />

                            <TabsItem
                                myfunc={() => { this.orderViewFunc('Pending') }}
                                myIcon={'fas fa-handshake'}
                                tabName={'Pendding'}
                            />

                            <TabsItem
                                myfunc={() => { this.orderViewFunc('Inprogress') }}
                                myIcon={'fab fa-accusoft'}
                                tabName={'Progress'}
                            />

                            <TabsItem
                                myfunc={() => { this.orderViewFunc("Dliverled") }}
                                myIcon={'fas fa-shipping-fast'}
                                tabName={'Dliverled'}
                            />

                            <TabsItem
                                myfunc={() => { logout(this.props) }}
                                myIcon={'fas fa-sign-out-alt'}
                                tabName={'Logout'}
                            />




                        </Appbar>
                }

                {/* {"this account Type" + this.props.user.accountType}
            <br/>
            {"Name " + this.props.user.firstName}
            */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(RestOwner);

