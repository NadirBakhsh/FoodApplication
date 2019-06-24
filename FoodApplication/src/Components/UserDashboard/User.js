import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from '../AppBar/Appbar'
import Loader from "../Loader/Loader"
import TabsItem from '../AppBar/TabsItem'
import {logout} from '../../config/firebase'
class User extends Component {
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
                {isLoading ? <Loader /> :
                    <Appbar userName={"Welcome " + this.props.user.firstName}>

                        <TabsItem
                            myfunc={() => { alert('User Info') }}
                            myIcon={'fas fa-user-cog'}
                            tabName={'User Info'}
                        />

                        <TabsItem
                            myfunc={() => { alert("Restaurants") }}
                            myIcon={'fas fa-utensils'}
                            tabName={'Restaurants'}
                        />

                        <TabsItem
                            myfunc={() => { alert("My Restaurants") }}
                            myIcon={'fas fa-concierge-bell'}
                            tabName={'My Restaurants'}
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
