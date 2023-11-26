import { locations, useAppDispatch } from '../../const/const';
import { changeCity } from '../../store/actions';

function LocationLink() {
  const dispatch = useAppDispatch();

  const getCityName = (evt: React.ChangeEvent<HTMLLIElement>) => {
    const cityName = evt.target.textContent;
    return cityName;
  };
  const locList = locations.map((location) => (
    <li
      onClick={(evt: React.MouseEvent<HTMLLIElement>) =>
        dispatch(changeCity(getCityName(evt)))
      }
      key={location.id}
      className="locations__item"
    >
      <a className="locations__item-link tabs__item" href="#">
        <span>{location.city}</span>
      </a>
    </li>
  ));
  return locList;
}

export default LocationLink;
