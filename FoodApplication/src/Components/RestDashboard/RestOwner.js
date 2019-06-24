import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "../Loader/Loader"
import Appbar from '../AppBar/Appbar'
import TabsItem from '../AppBar/TabsItem'
import { logout } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import RestInfoInputForm from '../RestDashboard/InfoCellecetForm'
import AddDishInputForm from '../RestDashboard/DishForm'
import Orders from './Orders'
class RestOwner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isRestForm: false,
        }

        this.viewFunc = this.viewFunc.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 500);
    }

    viewFunc() {
        const { isRestForm } = this.state;
        this.setState({ isRestForm: !isRestForm })
    }

    render() {
        const { isLoading, isRestForm } = this.state;
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
                                        {true && <div> <InfoForm>
                                            <center>
                                        <Typography variant="h5" component="h3">Orders Dashboard</Typography>
                                        </center>
                    
                                        <Orders />
                                        
                                        </InfoForm>
                                        </div>}

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
                                myfunc={() => { alert("Progress") }}
                                myIcon={'fas fa-handshake'}
                                tabName={'Progress'}
                            />

                            <TabsItem
                                myfunc={() => { alert("Dliverled") }}
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

