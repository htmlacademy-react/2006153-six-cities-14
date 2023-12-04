import { Comments } from '../../const/const';

interface CommentsAmountProps {
  cityOfferComments: Comments[];
  newCommentsLength: number;
}

function CommentsAmount({
  cityOfferComments,
  newCommentsLength,
}: CommentsAmountProps) {
  return (
    <h2 className="reviews__title">
      Reviews &middot;{' '}
      <span className="reviews__amount">
        {newCommentsLength !== undefined
          ? newCommentsLength
          : cityOfferComments.length}
      </span>
    </h2>
  );
}
export default CommentsAmount;
