import { State, useAppDispatch, useAppSelector } from '../../const/const';
import { changeCity } from '../../store/actions';
import { Location } from '../../const/const';
interface CityLinkProps {
  location: Location;
}
function CityLink({ location }: CityLinkProps) {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state: State) => state.offers.city);
  const getCityName = (evt: React.MouseEvent<HTMLLIElement>): string => {
    const cityName = (evt.target as HTMLLIElement).textContent;
    if (cityName === null) {
      return '';
    }
    return cityName;
  };

  return (
    <li
      onClick={(evt: React.MouseEvent<HTMLLIElement>) =>
        dispatch(changeCity(getCityName(evt)))}
      key={location.id}
      className="locations__item"
    >
      <a
        className={`locations__item-link  ${
          location.city === currentCity ? 'tabs__item--active' : 'tabs__item'
        }`}
        href="#"
      >
        <span>{location.city}</span>
      </a>
    </li>
  );
}
export default CityLink;
