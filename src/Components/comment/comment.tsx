import { Comments } from '../../const/const';
import ImageComponent from '../image-component/image-component';

interface commentProps {
  comment: Comments;
}
function Comment({ comment }: commentProps) {
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
                width: `${comment?.rating * 20}%`,
              }}
            ></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment === undefined
            ? comment.userMessage
            : comment.comment}
        </p>
        <time className="reviews__time" dateTime="2019-04-24">
          April 2019
        </time>
      </div>
    </li>
  );
}

export default Comment;
