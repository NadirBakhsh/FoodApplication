import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from '../AppBar/Appbar'
import Loader from "../Loader/Loader"
import TabsItem from '../AppBar/TabsItem'
import { logout } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import UserInfoForm from './CellectUserInfo'
import RestLists from '../Rest_dish_Lists/RestLists'


class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isUserinfoForm:false,
        }

        this.userInfoFormFunc = this.userInfoFormFunc.bind(this) 
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 1500);
    }

userInfoFormFunc(){
    const { 
        isLoading , isUserinfoForm
    } = this.state;
    
    this.setState({
        isUserinfoForm : !isUserinfoForm
    })
}


    render() {
        const { 
            isLoading,isUserinfoForm,
            userInfoFormFunc,
        
        } = this.state;

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
                                
                                <div>
                                <InfoForm>
                                    <center>
                                        <u>
                                        <Typography variant="h5" component="h3">Resturants List </Typography>
                                        </u>
                                        <br/>
                                        
                                        <RestLists />

                                    </center>
                                </InfoForm>
                                </div>

                            </div>
                        }

                    >

                        <TabsItem
                            myfunc={() => { this.userInfoFormFunc() }}
                            myIcon={'fas fa-user-cog'}
                            tabName={'User Info'}
                        />

                        <TabsItem
                            myfunc={() => { alert("Restaurants") }}
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
