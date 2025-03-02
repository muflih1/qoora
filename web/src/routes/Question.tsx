import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { promiseDone } from '../components/Signup/utils';
import axios from '../lib/axios';
import AnswerFeedStory from '../components/AnswerFeedStory/AnswerFeedStory';
import BaseText from '../components/Typography/BaseText';
import { Answer, Question as IQuestion } from '../types/entities';

export default function Question() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const {
    data: { question, answers },
  } = useQuestion(qid!);

  if (question == null) {
    return (
      <div>
        <h3>Page No Found</h3>
        <p>
          We searched everywhere but couldn't find the page you were looking
          for.
        </p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div {...stylex.props(styles.root)}>
      <div {...stylex.props(styles.questionTextContainer)}>
        <BaseText
          size='headline2'
          color='primaryText'
          weight='bold'
        >
          {question.question_text}
        </BaseText>
      </div>
      <div>
        {answers.length === 0 && (
          <div>
            <h3>There are no answers yet.</h3>
          </div>
        )}
        {answers.length > 0 &&
          answers.map(answer => (
            <AnswerFeedStory
              key={`QuestionAnswerCard$${answer.id}`}
              {...answer}
            />
          ))}
      </div>
    </div>
  );
}

function useQuestion(qid: string) {
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [answers, setAnswers] = useState<Array<Answer>>([]);

  useEffect(() => {
    promiseDone(axios.get(`/questions/${qid}`), res => {
      if (res.data.question) {
        setQuestion(res.data.question);

        promiseDone(axios(`/questions/${qid}/answers`), res => {
          if (res.data.answers) {
            setAnswers(res.data.answers);
          }
        });
      }
    });
  }, [qid]);

  return { data: { question, answers } };
}

const styles = stylex.create({
  root: {
    width: 658,
  },
  questionTextContainer: {
    paddingBottom: 24,
  },
});
