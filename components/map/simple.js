import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerIcon from '@material-ui/icons/AddLocation'

const AnyReactComponent = ({ text }) => <div><MarkerIcon size /></div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Lol'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;