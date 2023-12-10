import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendCommentAction } from '../../api-actions/api-actions';
import './sending-comment-form.css';
import { store } from '../../store';
import Spinner from '../spinner/spinner';
import QuantityOfThings from '../../const/const';
interface FormData {
  name?: string;
  value?: string;
  comment?: string;
  rating?: string;
}

function SendingCommentsForm() {
  const [notIsActive, setNotIsActive] = useState(true);
  const [isInputBlocked, setIsInputBlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    comment: '',
    rating: '',
  });

  function clearFields() {
    setFormData({
      comment: '',
      rating: '',
    });
  }

  const getValidate = (data: FormData) => {
    if (
      data.rating !== '' &&
      data.comment !== undefined &&
      data.comment.length > QuantityOfThings.MIN_COMMENT_LENGTH &&
      data.comment.length < QuantityOfThings.MAX_COMMENT_LENGTH
    ) {
      setNotIsActive(false);
    } else {
      setNotIsActive(true);
    }
  };

  function onFieldChange(
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = evt.target.name;
    const value = evt.target.value;
    setFormData(() => {
      const newFromData = { ...formData, [name]: value };
      getValidate(newFromData);
      return newFromData;
    });
  }

  function getUserInputValidation() {
    if (
      formData.comment !== undefined &&
      formData.comment.length >= QuantityOfThings.MIN_COMMENT_LENGTH &&
      formData.comment.length < QuantityOfThings.MAX_COMMENT_LENGTH
    ) {
      return true;
    } else {
      return false;
    }
  }

  const params = useParams();
  const lablesTitle = [
    'terribly',
    'badly',
    'not bad',
    'good',
    'perfect',
    'not bad',
  ];
  function sendComment() {
    store.dispatch(
      sendCommentAction({
        setIsSubmitting,
        setIsInputBlocked,
        offerID: params.id !== undefined ? params.id : '',
        userComment:
          getUserInputValidation() && formData.comment !== undefined
            ? formData.comment
            : '',
        rating:
          Number(formData.rating) !== undefined ? Number(formData.rating) : 0,
      })
    );
  }
  if (isSubmitting) {
    return <Spinner />;
  } else {
    return (
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          setIsSubmitting(true);
          sendComment();
          if (!isSubmitting) {
            clearFields();
          }
        }}
        name="form"
        className="reviews__htmlForm htmlForm"
        method="post"
      >
        <label className="reviews__label htmlForm__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-htmlForm htmlForm__rating">
          <div className="stars__wrp">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                <input
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                    onFieldChange(evt);
                    setIsInputBlocked(true);
                  }}
                  disabled={isInputBlocked}
                  className={
                    formData.rating !== undefined &&
                    Number(formData.rating) >= value
                      ? 'htmlForm__rating-input visually-hidden painted-star'
                      : 'htmlForm__rating-input visually-hidden'
                  }
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label htmlForm__rating-label"
                  title={`${lablesTitle[value - 1]}`}
                >
                  <svg className="htmlForm__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
        <textarea
          onChange={(evt) => {
            onFieldChange(evt);
          }}
          disabled={isSubmitting}
          className="reviews__textarea htmlForm__textarea"
          id="review"
          name="comment"
          value={formData.comment}
          placeholder="Tell how was your stay, what you like and what can be improved"
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set{' '}
            <span className="reviews__star">rating</span> and describe your stay
            with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            disabled={notIsActive}
            className="reviews__submit htmlForm__submit button"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}
export default SendingCommentsForm;
