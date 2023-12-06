import { locations } from '../../const/const';
import CityLink from '../city-link/city-link';

function CitiesList() {
  return locations.map((location) => (
    <CityLink key={location.id} location={location} />
  ));
}

export default CitiesList;
