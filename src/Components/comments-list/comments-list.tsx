import Comment from '../comment/comment';
import { Comments } from '../../const/const';

interface CommentsListProps {
  commentsList: Comments[];
}
function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <ul className="reviews__list">
      {[...commentsList]
        .sort(
          (a: Comments, b: Comments) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        )
        .slice(0, 10)
        .map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </ul>
  );
}

export default CommentsList;
