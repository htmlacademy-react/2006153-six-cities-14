import { Comments } from '../../const/const';
import ImageComponent from '../image-component/image-component';
import QuantityOfThings from '../../const/const';
interface commentProps {
  comment: Comments;
}
function Comment({ comment }: commentProps) {
  function getRating() {
    const rating = Math.round(
      (comment.rating / QuantityOfThings.MAX_RATING) * 100
    );
    return rating;
  }
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <ImageComponent
            key={comment.user.avatarUrl}
            classProp={'reviews__avatar user__avatar'}
            image={comment.user.avatarUrl}
          />
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{
                width: `${getRating()}%`,
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment === undefined
            ? comment.userMessage
            : comment.comment}
        </p>
        <time
          className="reviews__time"
          dateTime={`${new Date(comment.date).getFullYear()}-${new Date(
            comment.date
          ).getMonth()}-${new Date(comment.date).getDate()}`}
        >
          {new Date(comment.date).toLocaleString('en-US', { month: 'long' })}{' '}
          {new Date(comment.date).getFullYear()}
        </time>
      </div>
    </li>
  );
}

export default Comment;
