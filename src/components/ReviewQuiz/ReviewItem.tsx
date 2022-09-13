import React from "react";
import Card from "../UI/Card";
import styles from "./ReviewItem.module.css";

interface Props {
  question: string;
  correct_answer: string;
  answers: string[];
  questionsNumber: number;
  userAnswer: string;
  key: number;
}

const ReviewItem: React.FC<Props> = (props) => {
  const {
    question,
    correct_answer,
    answers,
    questionsNumber,
    userAnswer,
    key,
  } = props;

  const getUserAnswerButtonStyle = (userAnswer: string, quizAnswer: string) => {
    if (userAnswer !== quizAnswer) return styles.answer;

    return userAnswer === correct_answer ? styles.correct : styles.incorrect;
  };

  return (
    <li className={styles.item}>
      <Card>
        <div className={styles.question} key={key}>
          <span>Question {questionsNumber + 1} : </span>

          {decodeURIComponent(question)}
        </div>
        <div className={styles["answer-container"]}>
          {answers.map((answer) => (
            <button className={getUserAnswerButtonStyle(userAnswer, answer)}>
              {decodeURIComponent(answer)}
            </button>
          ))}
        </div>
      </Card>
      {userAnswer !== correct_answer && (
        <div className={styles["show-answer"]}>
          <span> Correct answer:</span> {decodeURIComponent(correct_answer)}
        </div>
      )}
      <br />
    </li>
  );
};

export default ReviewItem;
