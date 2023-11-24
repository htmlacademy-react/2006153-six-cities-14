import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, OffersList } from '../src/const/const';
import { loadOffers } from '../src/store/actions';
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
  const { data } = await api.get<OffersList[]>(APIRoutes.Offers);
  dispatch(loadOffers(data));
});
