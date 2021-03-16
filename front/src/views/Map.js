// import {Component} from 'react';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
 
//         <Marker onClick={this.onMarkerClick}
//                 name={'Current location'} />
 
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }
 
// export default Map({
//   apiKey: ('AIzaSyDFPwqB5cwmPTDpe3OCfkH1itg-2_DeNkA')
// })(MapContainer)

import React, {useContext} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { DronutContext } from '../contexts/DronutContext';

const containerStyle = {
  width: '400px',
  height: '400px'
};

// const center = {
//   lat: -3.745,
//   lng: -38.523
// };

function Map() {

    const {coordinates} = useContext(DronutContext);

    console.log(coordinates);
    const center = coordinates;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDFPwqB5cwmPTDpe3OCfkH1itg-2_DeNkA"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)
