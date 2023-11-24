import { Hotels, useAppSelector } from '../../const/const';
import { useRef, useEffect } from 'react';
import useMap from '../../Hooks/useMap/use-map';
import { urlForPins } from '../../const/const';
import { pinsSize } from '../../const/const';
import { HotelsPoints } from '../../const/const';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { createSelector } from '@reduxjs/toolkit';
interface MapProps {
  selectedPoint: HotelsPoints | undefined;
}

function Map({ selectedPoint }: MapProps) {
  /* const CITY_OFFERS = useAppSelector((state) => state.offersList); */
  const getOffersList = (state) => state.offersList;
  const getSelectedCity = (state) => state.city;
  const getSortType = (state) => state.sortType;
  const getSortedOffers = createSelector(
    [getOffersList, getSelectedCity, getSortType],
    (offersList, selectedCity, sortType) => {
      const currentCity = offersList.find((city) => city.city === selectedCity);

      if (!currentCity) {
        return [];
      }

      const copiedOffers = currentCity;

      return copiedOffers;
    }
  );
  const sortedOffers = useAppSelector(getSortedOffers);

  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, sortedOffers);
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
    if (map && sortedOffers.points !== undefined) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      sortedOffers.points.forEach((point) => {
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
    sortedOffers.points,
    selectedPoint,
    defaultCustomIcon,
    currentCustomIcon,
    isSelectedPointDefined,
  ]);
  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
export default Map;
