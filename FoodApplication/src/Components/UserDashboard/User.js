import React, { Component } from 'react';
import { connect } from 'react-redux';
import Appbar from '../AppBar/Appbar'
import Loader from "../Loader/Loader"
import TabsItem from '../AppBar/TabsItem'
import { logout } from '../../config/firebase'
import InfoForm from '../InfoAdd/InfoAddForm'
import Typography from '@material-ui/core/Typography';
import UserInfoForm from '../UserDashboard/CellectUserInfo'
import Card from './ProductCart'
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import DetailScreen from './Detailscreen'

import {getDishes,getRestInfoDishes} from '../../config/firebase'

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isUserinfoForm: false,
            foodArray : [],
            chipArray : ['Kima','Pizza', 'Biryani'],
            text : "",
           
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
            isUserinfoForm: !isUserinfoForm
        })
    }


    async fatchingDishes(){
        try{
            const getingdish = await getDishes()
            this.setState({
                foodArray : getingdish 
            })
           console.log(getingdish)
        }catch (e){
            console.log(e)
        }
    }


   async search(e) {
        const { foodArray } = this.state;
        const text = e.target.value;
        
        const result = await foodArray.filter((elem) => {
        return elem.dishname.substring(0,text.length).toLowerCase() === (text.toLowerCase())
        })

      this.setState({result, text});
    }

    async  handleClick(chipText){
        const { foodArray } = this.state;
        const text = chipText;
        
        const result = await foodArray.filter((elem) => {
        return elem.dishname.substring(0,text.length).toLowerCase() === (text.toLowerCase())
        })

      this.setState({result, text});
    }


    handleDetailScreen(rest_uid){
        var Rest_Info_Dishes = [];
        Rest_Info_Dishes.push(rest_uid)
        Rest_Info_Dishes.map((e,i)=>{
            if(i < 1){
                console.log("nadir")
            }
        })
        

    }


    render() {
        const {
            isLoading, isUserinfoForm,foodArray,result,text,chipArray
        } = this.state;

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
                                <InfoForm>
                                    <center>
                                    <Typography style={{marginBottom:'6px'}} variant="h5" component="h3">Resturant's Menus List </Typography>
                                <Divider style={{marginBottom:'8px'}} />
                                <div style={{display: 'flex',flexWrap: 'wrap' , flexDirection:'row', justifyContent:'space-between'}}>
                                  
                                 <input style={{width:'300px'}} value={text}  placeholder='Search...'  onChange={this.search.bind(this)}/>
                                <div>
                                <Chip style={{width:'90px'}} variant="outlined" color="primary" 
                                         label={"All Items"}   
                                         onClick={()=>{this.handleClick("")}}
                                    />

                                    {chipArray.map((item,index)=>{
                                        return (<div style={{display:'inline-block' }}>
                                                <Chip style={{width:'60px'}} variant="outlined" color="primary" 
                                         key={item}   
                                         label={item}   
                                         onClick={()=>{this.handleClick(item)}}
                                    />
                                        </div>)
                                    })}
                                    </div>
                                </div>
                                


                                <Divider style={{marginTop:'8px'}} />
                                    </center>

                                <div style={{display: 'flex',flexWrap: 'wrap', flexDirection:'row',justifyContent:'space-around',marginTop:'20px'}}> 
                                                                
                                  {
                                   arr.map((item,index)=>{
                                       return(  <div style={{marginTop:'15px'}}><Card 
                                       
                                       key={item.dish_uid}
                                        dishName={item.dishname} 
                                        price={'Rs' + item.amount} 
                                        imgUrl={item.imageUrl} 
                                        addToCard={<DetailScreen 
                                         onClick={this.handleDetailScreen(item.dish_uid)} 
                                        />} 
                                         /></div>)
                                   })            
                                 }

                                 </div>
                                </InfoForm>

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
