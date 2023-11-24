import { FormEvent, useState } from 'react';

interface FormData {
  name: string | undefined;
  value: string | undefined;
}

function SendingCommentsForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    value: '',
  });
  function onFieldChange(
    evt:
      | FormData
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | FormEvent
  ) {
    const { name, value }: FormData = evt;

    setFormData({ ...formData, [name]: value });
  }
  return (
    <form
      /* onSubmit={(evt) => {
        evt.preventDefault();
        onFieldChange(evt);
      }} */
      name="form"
      className="reviews__htmlForm htmlForm"
      action="#"
      method="post"
    >
      <label className="reviews__label htmlForm__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-htmlForm htmlForm__rating">
        <input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(evt.target);
          }}
          className="htmlForm__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label htmlForm__rating-label"
          title="perfect"
        >
          <svg className="htmlForm__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(evt.target);
          }}
          className="htmlForm__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label htmlForm__rating-label"
          title="good"
        >
          <svg className="htmlForm__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(evt.target);
          }}
          className="htmlForm__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label htmlForm__rating-label"
          title="not bad"
        >
          <svg className="htmlForm__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(evt.target);
          }}
          className="htmlForm__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label htmlForm__rating-label"
          title="badly"
        >
          <svg className="htmlForm__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            onFieldChange(evt.target);
          }}
          className="htmlForm__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label htmlForm__rating-label"
          title="terribly"
        >
          <svg className="htmlForm__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        /* onChange={onFieldChange} */
        className="reviews__textarea htmlForm__textarea"
        id="review"
        name="comment"
        value={formData.name}
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit htmlForm__submit button"
          type="submit"
          /* disabled="" */
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default SendingCommentsForm;
