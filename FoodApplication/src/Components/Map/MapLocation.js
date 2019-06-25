import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import Button from '@material-ui/core/Button';
import {addLocation} from '../../config/firebase'

class MapLocation extends Component {

    constructor(props) {
        super(props)

        this.state = {
            lat: null,
            lng: null
        }


        this.locationUpdate = this.locationUpdate.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition((location) => {
            this.setState({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        });

    }
    

    locationUpdate() {
        navigator.geolocation.getCurrentPosition((location) => {
          const locationObject = {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
            addLocation(locationObject)
        });
    }






    render() {

        const { lat, lng } = this.state;
      
        return (

            <div style={{ width: "600px" }}>
                <MyMapComponent
                    isMarkerShown
                    location={{ lat, lng }}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <Button onClick={this.locationUpdate} style={{ marginTop: '-45px', position: 'absolute' }} variant="contained" color="primary" >
                    Save Location
                 </Button>
            </div>
        );
    }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={18}
        defaultCenter={{ lat: props.location.lat, lng: props.location.lng }}
    >
        <Marker
            draggable={true}
            position={{ lat: props.location.lat, lng: props.location.lng }}
            onDragEnd={(loc) => { console.log('loc ===>', loc.latLng.lat(), loc.latLng.lng()) }}
        />
    </GoogleMap>

))




export default MapLocation;

