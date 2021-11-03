import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from 'react-leaflet'
import MapRouting from "./MapRouting";
import 'leaflet/dist/leaflet.css';

const MapView = ({ lugares = [] }) => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if( lugares.length > 0 ){
            const toPosition = lugares[lugares.length - 1].position;
            map.flyTo(toPosition, 14);
        }
    }, [map, lugares]);

    return <MapContainer 
    center={[19.3673611, -99.188214]} 
    zoom={10} 
    style={{ width: '100%', height: '100vh', padding: 0 }} 
    scrollWheelZoom={false}
    whenCreated={map => setMap(map)}
    >
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
        <MapRouting map={map} lugares={lugares} />

    </MapContainer>
}

export default MapView;