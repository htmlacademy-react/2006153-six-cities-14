import { locations } from '../../const/const';

function LocationLink() {
  const locList = locations.map((location) => (
    <li key={location.id} className="locations__item">
      <a className="locations__item-link tabs__item" href="#">
        <span>{location.city}</span>
      </a>
    </li>
  ));
  return locList;
}

export default LocationLink;
