import { Offers, useAppSelector } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import { pinsSize } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  hotelsPins: Offers[] | number;
  activePin?: string;
}
function Map({ hotelsPins, activePin }: MapProps) {
  const currentCard = useAppSelector((state) => state.offers.currentCard);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, hotelsPins);

  const isSelectedPointDefined = currentCard !== undefined;
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
    if (map && hotelsPins !== undefined) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      if (typeof hotelsPins !== 'number') {
        hotelsPins.forEach((point: Offers) => {
          leaflet
            .marker(
              {
                lat: point.location.latitude,
                lng: point.location.longitude,
              },
              {
                icon:
                  (isSelectedPointDefined &&
                    typeof currentCard !== 'number' &&
                    point.id === currentCard.id) ||
                  point.id === activePin
                    ? currentCustomIcon
                    : defaultCustomIcon,
              }
            )
            .addTo(map);
        });
      }
    }
  }, [
    currentCard,
    map,
    hotelsPins,
    defaultCustomIcon,
    currentCustomIcon,
    isSelectedPointDefined,
    activePin,
  ]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
