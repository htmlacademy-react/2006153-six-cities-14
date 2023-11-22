import { useAppDispatch, useAppSelector } from '../../const/const';
import './types-of-sort.css';
import { changeOffers } from '../../store/actions';

function TypesOfSort() {
  const CITY_OFFERS = useAppSelector((state) => state.offersList);
  const dispatch = useAppDispatch();
  console.log(CITY_OFFERS);

  function handleClick(evt) {
    let sortedArr = [];
    if (evt.target.textContent === 'Popular') {
      sortedArr = CITY_OFFERS;
    }
    if (evt.target.textContent === 'Price: low to high') {
      sortedArr = CITY_OFFERS.offers.toSorted((a, b) => {
        return a.price - b.price;
      });
    }
    if (evt.target.textContent === 'Price: high to low') {
      sortedArr = CITY_OFFERS.offers.toSorted((a, b) => {
        return b.price - a.price;
      });
    }
    if (evt.target.textContent === 'Top rated first') {
      sortedArr = CITY_OFFERS.offers.toSorted((a, b) => {
        return b.rating - a.rating;
      });
    }
    console.log(sortedArr);

    dispatch(changeOffers(sortedArr));
  }

  return (
    <ul className="places__options places__options--custom places__options--opened">
      <li
        onClick={handleClick}
        className="places__option places__option--active"
        tabIndex={0}
      >
        Popular
      </li>
      <li onClick={handleClick} className="places__option" tabIndex={0}>
        Price: low to high
      </li>
      <li onClick={handleClick} className="places__option" tabIndex={0}>
        Price: high to low
      </li>
      <li onClick={handleClick} className="places__option" tabIndex={0}>
        Top rated first
      </li>
    </ul>
  );
}

export default TypesOfSort;
