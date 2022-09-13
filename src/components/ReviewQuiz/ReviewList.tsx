import Button from "@mui/material/Button";
import React from "react";
import { Answer } from "../../models/Models";
import ReviewItem from "./ReviewItem";
import styles from "./ReviewList.module.css";

interface Props {
  reviewList: Answer[];
  score: number;
  totalQuestions: number;
  onReset: () => void;
}

const ReviewList = ({ reviewList, score, totalQuestions, onReset }: Props) => {
  return (
    <div className={styles.reviews}>
      <h1>Review Quiz</h1>
      <h2>
        Total score: {score} / {totalQuestions}
      </h2>
      <div className={styles.button}>
        <Button
          variant="contained"
          type="button"
          size="large"
          onClick={onReset}
        >
          Back
        </Button>
      </div>
      <ul>
        {reviewList.map((review, index) => (
          <ReviewItem
            key={index}
            question={review.question}
            correct_answer={review.correctAnswer}
            answers={review.answers}
            questionsNumber={index}
            userAnswer={review.userAnswer}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ReviewList);
