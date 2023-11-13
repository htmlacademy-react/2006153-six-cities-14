import { Hotels } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface MapProps {
  hotels: Hotels[];
  selectedPoint: Hotels;
}

function Map({ hotels, selectedPoint }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, hotels);

  /* const [isMapInitialized, setIsMapInitialized] = useState(false); */
  const defaultCustomIcon = leaflet.icon({
    iconUrl: urlForPins[0],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: urlForPins[1],
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      hotels.forEach((hotel) => {
        leaflet
          .marker(
            {
              lat: hotel.latitude,
              lng: hotel.longitude,
            },
            {
              icon:
                Number(hotel.id) === Number(selectedPoint.id)
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, hotels, selectedPoint]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
