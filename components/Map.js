import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { useState } from "react"
import getCenter from "geolib/es/getCenter"


function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({})

    //Transform the searchResults object into the latitude and longitude object.

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates);

    const [viewport, setviewport] = useState({
        width: "100%",
        height: "100%", 
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });


    return ( 
    <ReactMapGL
        mapStyle="mapbox://styles/trudel66/cks65ax39d27r18rzbgpfpsh3"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewport}
        onViewportChange={(nextViewPort)=> setviewport(nextViewPort)}
    >
        {searchResults.map((result)=>(
            <div key={result.long}>
                <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <p aria-label="push-pin" onClick={()=>setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce" >📌</p>       
                </Marker>


                {selectedLocation.long === result.long ? (
                    <Popup
                        onClose={()=>setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                    >
                        {result.title}
                    </Popup>
                ):(false)}

            </div>
        ))}

    </ReactMapGL>);
}

export default Map
