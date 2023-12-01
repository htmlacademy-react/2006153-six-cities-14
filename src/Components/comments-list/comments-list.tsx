import Comment from '../comment/comment';
import { Comments } from '../../const/const';
import { useAppSelector } from '../../const/const';
import { State } from '../../const/const';
interface CommentsListProps {
  commentsList: Comments[] | string;
}
function CommentsList({ commentsList }: CommentsListProps) {
  const newComment = useAppSelector((state: State) => state.sendedComment);

  function getNewCommentList() {
    let newCommentList = [];
    let copiedCommentList = [];
    if (commentsList.length !== 0) {
      copiedCommentList = [...commentsList];
      copiedCommentList.forEach((comment) => {
        newCommentList.push(comment);
      });
      if (newComment !== 0) {
        newCommentList.unshift(newComment);
      }
    }
    return newCommentList;
  }

  return (
    <ul className="reviews__list">
      {getNewCommentList().length !== 0
        ? getNewCommentList()
            .slice(0, 10)
            .sort(
              (a: Comments, b: Comments) =>
                new Date(b.date as string) - new Date(a.date as string)
            )
            .map((comment) => <Comment key={comment.id} comment={comment} />)
        : null}
    </ul>
  );
}

export default CommentsList;
