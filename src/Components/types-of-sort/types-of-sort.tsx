import { useAppDispatch, useAppSelector } from '../../const/const';
import './types-of-sort.css';
import { setSortType } from '../../store/actions';
import { sortListsItems } from '../../const/const';
import classNames from 'classnames';

interface TypesOfSortProps {
  classForSort: boolean;
}
function TypesOfSort({ classForSort }: TypesOfSortProps) {
  const sortType = useAppSelector((state) => state.offers.sortType);
  const dispatch = useAppDispatch();

  function handleClick(value: string) {
    dispatch(setSortType(value));
  }
  return (
    <ul
      className={classNames('places__options', {
        'places__options--opened': classForSort === true,
      })}
    >
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
