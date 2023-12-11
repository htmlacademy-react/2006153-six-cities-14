import { combineReducers } from '@reduxjs/toolkit';

import {
  commentsSlice,
  offersSlice,
  dataLoadAndAuthSlice,
} from './slicers/slice';

export const reducer = combineReducers({
  offers: offersSlice.reducer,
  comments: commentsSlice.reducer,
  dataLoadAndAuthSlice: dataLoadAndAuthSlice.reducer,
});
