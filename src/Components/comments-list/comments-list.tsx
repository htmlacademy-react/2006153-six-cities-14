import Comment from '../comment/comment';
import { Comments } from '../../const/const';

interface CommentsListProps {
  commentsList: Comments[];
}
function CommentsList({ commentsList }: CommentsListProps) {
  return (
    <ul className="reviews__list">
      {commentsList.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentsList;
