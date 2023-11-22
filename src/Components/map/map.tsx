import { Hotels, useAppSelector } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import { pinsSize } from '../../const/const';
import { HotelsPoints } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
interface MapProps {
  selectedPoint: HotelsPoints | undefined;
}

function Map({ selectedPoint }: MapProps) {
  const CITY_OFFERS = useAppSelector((state) => state.offersList);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, CITY_OFFERS);
  const isSelectedPointDefined = selectedPoint !== undefined;
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
    if (map && CITY_OFFERS.points !== undefined) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      CITY_OFFERS.points.forEach((point) => {
        leaflet
          .marker(
            {
              lat: point.latitude,
              lng: point.longitude,
            },
            {
              icon:
                isSelectedPointDefined &&
                Number(point.id) === Number(selectedPoint.id)
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [
    map,
    CITY_OFFERS.points,
    selectedPoint,
    defaultCustomIcon,
    currentCustomIcon,
    isSelectedPointDefined,
  ]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
