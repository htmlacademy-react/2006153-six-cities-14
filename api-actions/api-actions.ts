import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  APIRoutes,
  AuthorizationStatus,
  Comments,
  Offers,
  OfferDetails,
  cardStatus,
  CommentsUser,
  sendCommentData,
} from '../src/const/const';
import {
  loadOffers,
  requireAuth,
  setIsQuesLoaded,
  loadCurrentOffer,
  loadNearByCurrentOffer,
  loadOfferComments,
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

  const { data } = await api.get<Offers>(APIRoutes.Offers);

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
    const { data } = await api.get<Comments[] | string>(
      `${APIRoutes.Comments}/${offerID}`
    );
    dispatch(loadOfferComments(data));
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
      data: { token, email: emailUser, avatarUrl },
    } = await api.post<UserData>(APIRoutes.Login, { email, password });
    saveToken(token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
    dispatch(getUserData({ emailUser, avatarUrl }));
    localStorage.setItem('userData', JSON.stringify({ emailUser, avatarUrl }));
  }
);
export const sendCommentAction = createAsyncThunk<
  void,
  {
    offerID: string;
    userComment: string;
    rating: number;
    userRating?: number;
    setIsSubmitting: boolean;
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
      const {
        data: { comment: userMessage, rating: userRating, date, id, user },
      } = await api.post<sendCommentData>(`${APIRoutes.Comments}/${offerID}`, {
        comment,
        rating,
      });

      dispatch(
        sendCommentActionDispatcher({
          userMessage,
          userRating,
          date,
          id,
          user,
        })
      );
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
  const { data } = await api.get<Offers>(APIRoutes.Favorite);
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
    const {
      data: {},
    } = await api.post<cardStatus>(
      `${APIRoutes.Favorite}/${offerID}/${Number(!favoritesStatus)}`
    );
    dispatch(changeStatus({ offerID, favoritesStatus }));
  }
);
