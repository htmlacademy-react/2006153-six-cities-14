import Header from '../../Components/header/header';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Offers,
  State,
  useAppDispatch,
  useAppSelector,
} from '../../const/const';
import { LoginAction } from '../../api-actions/api-actions';

function Login(): JSX.Element {
  const currentCity = useAppSelector((state: State) => state.offers.city);
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offersList: Offers[] = useAppSelector(
    (state: State) => state.offers.apiOffersList
  );
  function getValidatePassword(passInput: string) {
    if (passwordRef.current !== null) {
      return /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(passInput);
    }
  }
  function getValidateEmail(emailInput: string) {
    if (loginRef.current !== null) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    }
  }
  const city =
    offersList?.find((offer) => offer.city.name !== currentCity)?.city.name ??
    currentCity;

  function sendUserData() {
    if (loginRef.current !== null && passwordRef.current !== null) {
      if (
        getValidatePassword(passwordRef.current.value) &&
        getValidateEmail(loginRef.current.value)
      ) {
        dispatch(
          LoginAction({
            login: loginRef.current.value,
            password: passwordRef.current.value,
          })
        ).then(() => {
          navigate('/');
        });
      }
    }
  }

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              onSubmit={(evt) => evt.preventDefault()}
              className="login__form form"
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <button
                onClick={() => {
                  sendUserData();
                }}
                className="login__submit form__submit button"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Login;
