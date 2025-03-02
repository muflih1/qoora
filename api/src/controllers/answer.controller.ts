import { db } from "../config/db";
import { snowflake } from "../lib/snowflake";
import { catchAsync } from "../utils/catchAsync";

export const getSingleAnswerQueryHandler = catchAsync(async function (req, res) {
  const {aid} = req.params
  const result = await db.query(
    `
      SELECT
        CASE
          WHEN $2 IS NULL THEN 'novote'
          WHEN viewer_vote.vote_type = 1 THEN 'upvote'
          WHEN viewer_vote.vote_type = -1 THEN 'downvote'
          ELSE 'novote'
        END AS viewer_vote_type,
        COALESCE(v.vote_count, 0)::INTEGER AS vote_count,
        a.id::TEXT,
        a.answer_text,
        a.created_time,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'picture_url', u.picture_url
        ) AS owner,
        json_build_object(
          'id', q.id::TEXT,
          'question_text', q.question_text,
          'url', '/' || q.slug || '/question/' || q.id::TEXT,
          'answer_count', COALESCE(qac.answer_count, 0),
          'asker', json_build_object(
            'id', qa_u.id::TEXT
          )
        ) AS question
      FROM answers a
      LEFT JOIN users u ON a.author_id = u.id
      LEFT JOIN questions q ON a.question_id = q.id
      LEFT JOIN users qa_u ON q.author_id = qa_u.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
      ) qac ON q.id = qac.question_id
      LEFT JOIN (
        SELECT answer_id, COUNT(vote_type = 1) AS vote_count
        FROM votes
        GROUP BY answer_id
      ) v ON a.id = v.answer_id
      LEFT JOIN votes viewer_vote ON a.id = viewer_vote.answer_id AND viewer_vote.user_id = $2
      WHERE a.id = $1
    `,
    [aid, req.userId || null]
  )

  return res.send({
    status: 'ok',
    answer: result[0]
  })
})

export const createAnswerHandler = catchAsync(async function (req, res) {
  const { question_id, answer_text } = req.body

  if (!question_id || !answer_text) {
    return res.status(400).send({ error: { message: 'question_id and answer_text are required' } })
  }

  if (!/^\d+$/.test(question_id)) {
    return res.status(400).send({ error: { message: 'Invalid question_id' } })
  }

  const result = await db.query(
    `
      WITH create_answer AS (
        INSERT INTO answers (id, question_id, answer_text, author_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id, question_id, answer_text, author_id, created_time
      )
      SELECT 
        ca.id::TEXT,
        ca.answer_text,
        ca.created_time,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'picture_url', u.picture_url
        ) AS owner,
        json_build_object(
          'id', q.id::TEXT,
          'question_text', q.question_text,
          'url', '/' || q.slug || '/question/' || q.id::TEXT,
          'answer_count', (COALESCE(a.answer_count, 0) + 1)::INTEGER,
          'asker', json_build_object(
            'id', a1.id::TEXT
          )
        ) AS question
      FROM create_answer ca
      LEFT JOIN users u ON ca.author_id = u.id
      LEFT JOIN questions q ON ca.question_id = q.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
      ) a ON a.question_id = q.id
      LEFT JOIN users a1 ON q.author_id = a1.id
    `,
    [snowflake.nextId(), question_id, answer_text, req.userId]
  );

  return res.status(200).json({
    status: 'ok',
    answer: result[0]
  })
})

export const updateAnswerHandler = catchAsync(async function (req, res) {
  const { aid } = req.params
  const { answer_text } = req.body

  const result = await db.query(
    `
      WITH answer_owner AS (
        SELECT author_id
        FROM answers
        WHERE id = $1
      ),
      update_answer AS (
        UPDATE answers
        SET answer_text = $2
        WHERE id = $1 AND author_id = $3
        RETURNING id, question_id, answer_text, author_id, created_time
      )
      SELECT
        ua.id::TEXT,
        ua.answer_text,
        ua.created_time,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'picture_url', u.picture_url
        ) AS owner,
        json_build_object(
          'id', q.id::TEXT,
          'question_text', q.question_text,
          'slug', q.slug,
          'answer_count', a.answer_count::INTEGER,
          'asker', json_build_object(
            'id', u1.id::TEXT
          )
        ) AS question
      FROM update_answer ua
      LEFT JOIN users u ON ua.author_id = u.id
      LEFT JOIN questions q ON ua.question_id = q.id
      LEFT JOIN users u1 ON q.author_id = u1.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id 
      ) a ON a.question_id = q.id
    `,
    [aid, answer_text, req.userId]
  )

  if (!result[0]) {
    return res.status(403).json({ error: { message: 'Cannot perform this action.' } })
  }

  return res.status(200).json({
    status: 'ok',
    answer: result[0]
  })
})

export const multiFeedQueryHandler = catchAsync(async function (req, res) {
  const result = await db.query(`
    WITH viewer as (
      SELECT $1::BIGINT AS viewer_id
    )
    SELECT
      a.id::TEXT,
      a.answer_text,
      '/answer/' || a.id AS url,  
      a.created_time,
      json_build_object(
        'id', u.id::TEXT,
        'given_name', u.given_name,
        'family_name', u.family_name,
        'picture_url', u.picture_url
      ) AS owner,
      json_build_object(
        'id', q.id::TEXT,
        'question_text', q.question_text,
        'url', '/' || q.slug || '/question/' || q.id,
        'slug', q.slug,
        'asker', json_build_object(
          'id', qu.id::TEXT
        ),
        'answer_count', answer_count
      ) AS question,
      is_author AS viewer_can_delete,
      is_author AS viewer_can_edit
    FROM answers a
    JOIN viewer v ON TRUE
    LEFT JOIN users u ON a.author_id = u.id
    LEFT JOIN questions q ON a.question_id = q.id
    LEFT JOIN users qu ON q.author_id = qu.id
    LEFT JOIN (
      SELECT question_id, COUNT(*) AS answer_count
      FROM answers
      GROUP BY question_id
    ) ac ON ac.question_id = q.id
    CROSS JOIN LATERAL (SELECT a.author_id = v.viewer_id AS is_author) sub
  `, [req.userId])

  return res.status(200).send(result)
})