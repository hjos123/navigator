import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";


const MapRouting = ({ map, lugares }) => {

    useEffect(() => {
        if (!map) return;
        if(lugares.length <= 0) return;
        const routingControl = L.Routing.control({
        //waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
        waypoints: lugares.map( Element => L.latLng(Element.position)),
        routeWhileDragging: true,
        lineOptions: {
            styles: [
              {
                color: "blue",
                opacity: 0.6,
                weight: 4
              }
            ]
          },
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, lugares]);

    return null;
}

export default MapRouting;