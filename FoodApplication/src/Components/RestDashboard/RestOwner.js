import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from "../Loader/Loader"
import Appbar from '../AppBar/Appbar'
import TabsItem from '../AppBar/TabsItem'
import { logout } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import InputForm from '../RestDashboard/InfoCellecetForm'
class RestOwner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1500);
    }


    render() {
        const { isLoading } = this.state;
        return (
            <div>
                {
                    isLoading ? <Loader /> :
                        <Appbar userName={"Welcome " + this.props.user.resturantName}
                            InfoForm={
                                <div>
                                    <InfoForm>
                                        <Typography variant="h5" component="h3">Resturant Information Form</Typography>
                                        <InputForm />
                                    </InfoForm> 
                                    <br />
                                    <InfoForm>
                                        
                                   </InfoForm>
                                </div>
                            }>

                            <TabsItem
                                myfunc={() => { "asd" }}
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

