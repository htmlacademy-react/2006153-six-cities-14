import { Hotels } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import { pinsSize } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface MapProps {
  hotels: Hotels[];
  selectedPoint: Hotels;
}

function Map({ hotels, selectedPoint }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, hotels);
  const isSelectedPointDefined = selectedPoint !== undefined;
  /* const [isMapInitialized, setIsMapInitialized] = useState(false); */
  const defaultCustomIcon = leaflet.icon({
    iconUrl: urlForPins[0],
    iconSize: pinsSize.iconSize,
    iconAnchor: pinsSize.iconAnchor,
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: urlForPins[1],
    iconSize: pinsSize.iconSize,
    iconAnchor: pinsSize.iconAnchor,
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
                isSelectedPointDefined &&
                Number(hotel.id) === Number(selectedPoint.id)
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, hotels, selectedPoint, defaultCustomIcon, currentCustomIcon]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
