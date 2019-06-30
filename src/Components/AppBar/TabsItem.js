import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


function TabsItem(props) {
    return (
        <div>
            <ListItem button onClick={props.myfunc}>
                <ListItemIcon > <i className={props.myIcon}></i> </ListItemIcon>
                <ListItemText primary={props.tabName} />
            </ListItem>
            <Divider/>
        </div>
    );

}

export default TabsItem;