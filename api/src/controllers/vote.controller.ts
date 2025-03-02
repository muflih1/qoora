import { db } from "../config/db";
import { catchAsync } from "../utils/catchAsync";

export const voteChangeMutationHandler = catchAsync(async function (req, res) {
  const { answer_id } = req.params;
  const { vote_type } = req.body;

  if (!['upvote', 'downvote', 'novote'].includes(vote_type)) {
    return res.status(400).json({
      status: 'fail',
      error: { message: 'Invalid vote type.' }
    });
  }

  const voteValue = vote_type === 'upvote' ? 1 : vote_type === 'downvote' ? -1 : null;

  await db.query(
    `
      INSERT INTO votes (answer_id, user_id, vote_type)
      VALUES ($1, $2, $3)
      ON CONFLICT (answer_id, user_id) 
      DO UPDATE SET vote_type = EXCLUDED.vote_type
      WHERE votes.vote_type IS DISTINCT FROM EXCLUDED.vote_type
      RETURNING vote_type;
    `,
    [answer_id, req.userId, voteValue]
  );

  return res.status(200).json({
    status: 'ok',
    viewer_vote_type: vote_type
  });
});
