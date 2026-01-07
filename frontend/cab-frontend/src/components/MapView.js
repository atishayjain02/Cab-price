import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer
} from "@react-google-maps/api";

import { useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px"
};

function MapView({ route }) {
  const [directions, setDirections] = useState(null);

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 18.5204, lng: 73.8567 }} // Pune default
        zoom={7}
      >
        <DirectionsService
          options={{
            origin: route.from,
            destination: route.to,
            travelMode: "DRIVING"
          }}
          callback={(result, status) => {
            if (status === "OK") {
              setDirections(result);
            }
          }}
        />

        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapView;
