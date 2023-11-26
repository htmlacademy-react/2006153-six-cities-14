import { Offers, useAppSelector } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import { pinsSize } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getSortedOffers } from '../selectors/offers-list-selector';

function Map() {
  const currentCard = useAppSelector((state) => state.currentCard);
  const sortedOffers = useAppSelector(getSortedOffers);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, sortedOffers);

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
    if (map && sortedOffers !== undefined) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      sortedOffers.forEach((point: Offers) => {
        leaflet
          .marker(
            {
              lat: point.location.latitude,
              lng: point.location.longitude,
            },
            {
              icon:
                isSelectedPointDefined && point.id === currentCard.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [
    currentCard,
    map,
    sortedOffers,
    defaultCustomIcon,
    currentCustomIcon,
    isSelectedPointDefined,
  ]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
