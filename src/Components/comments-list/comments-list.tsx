import Comment from '../comment/comment';
import { Comments, useAppDispatch } from '../../const/const';
import { useAppSelector } from '../../const/const';
import { State } from '../../const/const';
import { useEffect } from 'react';
import { getCommentsLength } from '../../store/actions';

interface CommentsListProps {
  commentsList: Comments[] | string;
}
function CommentsList({ commentsList }: CommentsListProps) {
  const newComment = useAppSelector((state: State) => state.sendedComment);
  const dispatch = useAppDispatch();

  let newCommentList: Comments[] = [];

  function getNewCommentList() {
    if (commentsList.length !== 0 && typeof commentsList !== 'string') {
      commentsList.forEach((comment) => {
        newCommentList.push(comment);
      });
    }
    if (newComment !== undefined && typeof newComment !== 'number') {
      newCommentList.unshift(newComment[0]);
    }

    return newCommentList;
  }
  useEffect(() => {
    dispatch(getCommentsLength(newCommentList.length));
  }, [newCommentList.length]);

  return (
    <ul className="reviews__list">
      {getNewCommentList()
        .slice(0, 10)
        .sort(
          (a: Comments, b: Comments) =>
            new Date(b.date as string).getTime() -
            new Date(a.date as string).getTime()
        )
        .map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
    </ul>
  );
}

export default CommentsList;
