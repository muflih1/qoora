import * as stylex from "@stylexjs/stylex"
import { useEffect, useState } from 'react';
import FeedInlineComposer from './FeedInlineComposer';
import { promiseDone } from '../Signup/utils';
import axios from '../../lib/axios';
import AnswerFeedStorySkeleton from '../Skeleton/AnswerFeedStorySkeleton';
import AnswerFeedStory from '../AnswerFeedStory/AnswerFeedStory';
import { Answer } from "../../types/entities";

export default function Feed() {
  const [answers, setAnswers] = useState<Array<Answer>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    promiseDone(
      axios.get('/answers'),
      res => {
        setLoading(false);
        setAnswers(res.data);
      },
      () => {
        setLoading(false);
      }
    );
  }, []);

  return (
    <div {...stylex.props(styles.root)}>
      <FeedInlineComposer />
      {answers.length > 0 &&
        answers.map(answer => (
          <AnswerFeedStory
            key={`${AnswerFeedStory.name}$${answer.id}`}
            {...answer}
          />
        ))}
      {loading && (
        <>
          <AnswerFeedStorySkeleton />
          <AnswerFeedStorySkeleton />
        </>
      )}
    </div>
  );
}

const styles = stylex.create({
  root: {
    width: 600
  }
})