import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoutes, AuthorizationStatus, Offers } from '../src/const/const';
import { loadOffers, requireAuth, setIsQuesLoaded } from '../src/store/actions';
import { State, AppDispatch, AuthData, UserData } from '../src/const/const';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../src/token/token';

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

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoutes.Login);
    dispatch(requireAuth(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuth(AuthorizationStatus.NoAuth));
  }
});

export const LoginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(APIRoutes.Login, { email, password });
    saveToken(token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
  }
);
export const LogoutAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete<UserData>(APIRoutes.Login);
  dropToken();
  dispatch(requireAuth(AuthorizationStatus.NoAuth));
});
