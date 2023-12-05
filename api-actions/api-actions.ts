import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  APIRoutes,
  AuthorizationStatus,
  Comments,
  Offers,
  OfferDetails,
} from '../src/const/const';
import {
  loadOffers,
  requireAuth,
  setIsQuesLoaded,
  loadCurrentOffer,
  loadNearByCurrentOffer,
  loadComments,
  sendCommentActionDispatcher,
  getUserData,
  getFavoritesOffers,
  changeStatus,
} from '../src/store/actions';
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

  const { data } = await api.get<Offers[]>(APIRoutes.Offers);

  dispatch(setIsQuesLoaded(true));

  dispatch(loadOffers(data));
});
export const fetchCurrentOfferAction = createAsyncThunk<
  void,
  OfferDetails | string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/loadCurrentOfferAction', async (offerID, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferDetails | string>(
    `${APIRoutes.Offers}/${offerID}`
  );
  dispatch(loadCurrentOffer(data));
});
export const fetchNearByCurrentOfferAction = createAsyncThunk<
  void,
  Offers[] | string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchNearByCurrentOfferAction',
  async (offerID, { dispatch, extra: api }) => {
    const { data } = await api.get<Offers[] | string>(
      `${APIRoutes.Offers}/${offerID}/nearby`
    );
    dispatch(loadNearByCurrentOffer(data));
  }
);
export const fetchOfferCommentsAction = createAsyncThunk<
  void,
  Comments[] | string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/fetchOfferCommentsAction',
  async (offerID, { dispatch, extra: api }) => {
    const { data } = await api.get<Comments[]>(
      `${APIRoutes.Comments}/${offerID}`
    );
    dispatch(loadComments(data));
  }
);

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
    const { data } = await api.get(APIRoutes.Login);
    dispatch(requireAuth(AuthorizationStatus.Auth));
    dispatch(getUserData(data));
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
    const { data } = await api.post<UserData>(APIRoutes.Login, {
      email,
      password,
    });
    saveToken(data.token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
    dispatch(getUserData(data));
  }
);
export const sendCommentAction = createAsyncThunk<
  void,
  {
    offerID: string;
    userComment: string;
    rating: number;

    setIsSubmitting: (isSumbitting: boolean) => void;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/sendComment',
  async (
    { offerID, userComment: comment, rating, setIsSubmitting },
    { dispatch, extra: api }
  ) => {
    try {
      const { data } = await api.post<Comments[]>(
        `${APIRoutes.Comments}/${offerID}`,
        {
          comment,
          rating,
        }
      );

      dispatch(sendCommentActionDispatcher(data));
    } catch (error) {
      console.log('Wrong Validation');
    } finally {
      setIsSubmitting(false);
    }
  }
);

export const LogoutAction = createAsyncThunk<
  void,
  AuthData | object,
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
export const fetchFavoritesOffers = createAsyncThunk<
  void,
  void,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offers[]>(APIRoutes.Favorite);
  dispatch(getFavoritesOffers(data));
});

export const changeOfferStatus = createAsyncThunk<
  void,
  { offerID: string; favoritesStatus: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/changeStatus',
  async ({ offerID, favoritesStatus }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offers>(
      `${APIRoutes.Favorite}/${offerID}/${Number(!favoritesStatus)}`
    );
    dispatch(changeStatus(data));
  }
);
