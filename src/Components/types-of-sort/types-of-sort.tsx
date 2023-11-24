import { useAppDispatch, useAppSelector } from '../../const/const';
import './types-of-sort.css';
import { setSortType } from '../../store/actions';
import { sortListsItems } from '../../const/const';
import classNames from 'classnames';

function TypesOfSort() {
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();

  function handleClick(value: string) {
    dispatch(setSortType(value));
  }
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {sortListsItems.map((listItem) => (
        <li
          key={listItem.value}
          onClick={() => {
            handleClick(listItem.value);
          }}
          className={classNames('places__option', {
            'places__option--active': sortType === listItem.value,
          })}
          tabIndex={0}
        >
          {listItem.text}
        </li>
      ))}
    </ul>
  );
}

export default TypesOfSort;
