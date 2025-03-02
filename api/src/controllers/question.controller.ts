import { db } from "../config/db.js";
import { snowflake } from "../lib/snowflake.js";
import { catchAsync } from "../utils/catchAsync.js";
import slugify from "slugify";
import { pipeline } from "@xenova/transformers"

async function getModel() {
  const model = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')
  return model
};

export const listAnswersByQuestionHandler = catchAsync(async function (req, res) {
  const { qid } = req.params

  const result = await db.query(
    `
        SELECT
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
            'slug', q.slug
          ) AS question
        FROM answers a
        LEFT JOIN users u ON a.author_id = u.id
        LEFT JOIN questions q ON a.question_id = q.id
        WHERE a.question_id = $1
        ORDER BY created_time DESC
      `,
    [qid]
  )

  return res.status(200).json({
    status: 'ok',
    answers: result
  })
})

export const relatedQuestionsHandler = catchAsync(async function (req, res) {
  const { qid } = req.params;
  const { limit = 10 } = req.query
  console.log(qid)

  const result = await db.query(
    `
      SELECT 
        q.id::TEXT, 
        q.question_text,
        '/' || q.slug || '/question/' || q.id::TEXT AS url,
        q.slug,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'picture_url', u.picture_url
        ) AS asker
      FROM questions q
      LEFT JOIN users u ON q.author_id = u.id
      WHERE q.id != $1 
      AND q.question_embedding IS NOT NULL
      ORDER BY q.question_embedding <=> (SELECT question_embedding FROM questions WHERE id = $1)
      LIMIT $2;
    `,
    [qid, parseInt(limit as string, 10)]
  )

  return res.send({
    status: 'ok',
    related_questions: result
  })
})

export const searchQuestionsHandler = catchAsync(async function (req, res) {
  const { search_query } = req.query

  if (!search_query) {
    return res.status(400).json({ error: { message: 'search_query is required' } })
  }
  const model = await getModel()
  const embedding = await model(search_query as string, { pooling: 'mean', normalize: true })

  const vector = Object.values(embedding.data).slice(0, 384)
  const vectorString = `[${vector.join(',')}]`

  const result = await db.query(
    `
      WITH vector_result AS (
        SELECT id, question_text, slug, author_id, 
              question_embedding <=> $1 AS similarity
        FROM questions
        ORDER BY similarity ASC
        LIMIT 20
      )
      SELECT
        vr.id::TEXT,
        vr.question_text,
        '/' || vr.slug || '/question/' || vr.id::TEXT AS url,
        vr.slug,
        COALESCE(a.answer_count, 0)::INTEGER AS answer_count,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'picture_url', u.picture_url
        ) AS asker
      FROM vector_result vr
      LEFT JOIN users u ON vr.author_id = u.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
      ) a ON a.question_id = vr.id
      ORDER BY similarity ASC NULLS LAST
      LIMIT 20;
    `,
    [vectorString]
  )

  return res.send({
    questions: result,
  })
})

export const listQuestionsHandler = catchAsync(async function (req, res) {
  // const {page = 1} = req.query
  const result = await db.query(
    `
      WITH viewer AS (
        SELECT $1::BIGINT AS viewer_id
      )
      SELECT
        q.id::TEXT,
        q.question_text,
        '/' || q.slug || '/question/' || q.id::TEXT AS url,
        q.slug,
        COALESCE(ansc.answer_count, 0)::INTEGER AS answer_count,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name
        ) AS asker,
        EXISTS (
          SELECT 1
          FROM answers a
          WHERE a.question_id = q.id
          AND a.author_id = $1
        ) AS viewer_has_answered,
        is_author AS viewer_can_edit,
        is_author AS viewer_can_delete
      FROM questions q 
      JOIN viewer v ON TRUE
      LEFT JOIN users u ON q.author_id = u.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
        ) ansc ON ansc.question_id = q.id
      CROSS JOIN LATERAL (SELECT q.author_id = v.viewer_id AS is_author) sub 
      WHERE q.author_id <> $1
      ORDER BY q.created_time DESC
      LIMIT 20
      OFFSET 0
    `,
    [req.userId]
  )

  return res.send({ questions: result })
})

export const createQuestionHandler = catchAsync(async function (req, res) {
  const { question_text } = req.body

  const model = await getModel()
  const embedding = await model(question_text, { pooling: 'mean', normalize: true })

  const vector = Object.values(embedding.data)
  const vectorString = `[${vector.join(',')}]`

  const result = await db.query<{
    id: bigint;
    question_text: string;
    created_time: Date;
    owner: {
      id: bigint;
      given_name: string;
      family_name: string;
      full_name: string;
      picture_url: string;
    };
  }>(
    `
      WITH new_question AS (
        INSERT INTO questions (id, question_text, author_id, slug, question_embedding)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, question_text, author_id, slug, created_time
      )
      SELECT 
        nq.id::TEXT,
        nq.question_text,
        '/' || nq.slug || '/question/' || nq.id::TEXT AS url,
        slug,
        COALESCE(a.answer_count, 0)::INTEGER AS answer_count,
        json_build_object(
          'id', u.id::TEXT,
          'given_name', u.given_name,
          'family_name', u.family_name,
          'full_name', 
          u.given_name || 
          CASE 
            WHEN u.family_name IS NOT NULL THEN ' ' || u.family_name 
            ELSE '' 
          END,
          'picture_url', u.picture_url
        ) AS asker
      FROM new_question nq
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
      ) a ON a.question_id = nq.id
      LEFT JOIN users u ON nq.author_id = u.id
    `,
    [snowflake.nextId(), question_text, req.userId, slugify(question_text), vectorString]
  )

  const question = result[0]

  res.status(200).json({
    status: "ok",
    question,
  })
})

export const getQuestionHandler = catchAsync(async function (req, res) {
  const { qid } = req.params

  if (!qid || !/^\d+$/.test(qid)) {
    return res.status(400).json({ error: { message: 'Invalid qid' } })
  }

  const result = await db.query<{
    id: bigint;
    question_text: string;
    created_time: Date;
    owner: {
      id: bigint;
      given_name: string;
      family_name: string;
      full_name: string;
      picture_url: string;
    }
  }>(
    `
      SELECT 
        questions.id::TEXT, 
        questions.question_text, 
        '/' || questions.slug || '/question/' || questions.id::TEXT AS url,
        slug,
        COALESCE(a.answer_count, 0)::INTEGER AS answer_count,
        json_build_object(
          'id', users.id::TEXT,
          'given_name', users.given_name,
          'family_name', users.family_name,
          'full_name', 
          users.given_name ||
          CASE 
            WHEN users.family_name IS NOT NULL THEN ' ' || users.family_name 
            ELSE '' 
          END,
          'picture_url', users.picture_url
        ) AS asker
      FROM questions
      LEFT JOIN users ON questions.author_id = users.id
      LEFT JOIN (
        SELECT question_id, COUNT(*) AS answer_count
        FROM answers
        GROUP BY question_id
      ) a ON a.question_id = questions.id
      WHERE questions.id = $1
    `,
    [qid]
  )

  const question = result[0] ?? null

  if (!question) {
    return res.status(404).json({ error: { message: 'Question not found' } })
  }

  return res.json({ question })
})

export const updateQuestionHandler = catchAsync(async function (req, res) {
  const { qid } = req.params
  const { question_text } = req.body

  const result = await db.query(
    `
      WITH question_owner AS (
      SELECT author_id FROM questions WHERE id = $1
    ),
    updated_question AS (
      UPDATE questions
      SET question_text = $3, slug = $4
      WHERE id = $1 AND author_id = $2
      RETURNING id, question_text, author_id, created_time, slug
    )
    SELECT 
      uq.id::TEXT,
      uq.question_text,
      '/' || uq.slug || '/question/' || uq.id::TEXT AS url,
      slug,
      COALESCE(a.answer_count, 0)::INTEGER AS answer_count,
      json_build_object(
        'id', u.id::TEXT,
        'given_name', u.given_name,
        'family_name', u.family_name,
        'full_name', 
        u.given_name || 
        CASE 
          WHEN u.family_name IS NOT NULL THEN ' ' || u.family_name 
          ELSE '' 
        END,
        'picture_url', u.picture_url
      ) AS asker
    FROM updated_question uq
    LEFT JOIN users u ON uq.author_id = u.id
    LEFT JOIN (
      SELECT question_id, COUNT(*) AS answer_count
      FROM answers
    ) a ON a.question_id = uq.id
    `,
    [qid, req.userId, question_text, slugify(question_text)]
  )

  if (result.length === 0) {
    return res.status(403).json({ error: { message: 'You are not allowed to perfom this action' } })
  }

  const question = result[0]

  return res.status(200).json({
    status: 'ok',
    question,
  })
})

export const deleteQuestionHandler = catchAsync(async function (req, res) {
  const { qid } = req.params

  const result = await db.query(
    `
      DELETE FROM questions
      WHERE id = $1 AND author_id = $2
    `,
    [qid, req.userId]
  )

  if (result.length === 0) {
    return res.status(403).json({ error: { message: 'You are not allowed to perfom this action' } })
  }

  return res.status(204).json({
    status: 'ok'
  })
})