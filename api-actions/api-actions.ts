import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, Offers } from '../src/const/const';
import { loadOffers, setIsQuesLoaded } from '../src/store/actions';
import { State, AppDispatch } from '../src/const/const';
import { AxiosInstance } from 'axios';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setIsQuesLoaded(false));
  const { data } = await api.get<Offers>(APIRoutes.Offers);
  dispatch(setIsQuesLoaded(true));
  dispatch(loadOffers(data));
});
