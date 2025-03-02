import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { promiseDone } from '../components/Signup/utils';
import axios from '../lib/axios';
import QuestionCard from '../components/QuestionCard';
import QuestionCardSkeleton from '../components/QuestionCardSkeleton';
import { Question } from '../types/entities';

export default function Answer() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    promiseDone(
      axios.get('/questions'),
      res => {
        setLoading(false);
        setQuestions(res.data.questions);
      },
      () => setLoading(false)
    );
  }, []);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.questionsCard)}>
        {questions.length > 0 &&
          questions.map((question: Question, index) => (
            <QuestionCard
              key={`Question$${question.id}`}
              isLast={questions.length - 1 === index}
              {...question}
            />
          ))}
        {loading && (
          <>
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
            <QuestionCardSkeleton />
          </>
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    width: 588.5,
    marginStart: 'auto',
    marginEnd: 'auto',
  },
  questionsCard: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    borderTopColor: '#dee0e1',
    borderEndColor: '#dee0e1',
    borderBottomColor: '#dee0e1',
    borderStartColor: '#dee0e1',
    borderTopStyle: 'solid',
    borderEndStyle: 'solid',
    borderBottomStyle: 'solid',
    borderStartStyle: 'solid',
    borderTopWidth: 1,
    borderEndWidth: 1,
    borderBottomWidth: 1,
    borderStartWidth: 1,
    backgroundColor: '#ffffff',
  },
});
