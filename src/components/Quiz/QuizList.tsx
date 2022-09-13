import React from "react";
import { Answer, Quiz } from "../../models/Models";
import QuizItem from "../Quiz/QuizItem";
import styles from "./QuizList.module.css";

export interface QuizListProps {
  quizzes: Quiz[];
  checkAnswer:
    | ((userAnswer: string, correctAnswer: string) => void)
    | undefined;
  getUserAnswers: (answers: Answer) => void;
}

const QuizList = ({ quizzes, checkAnswer, getUserAnswers }: QuizListProps) => {
  return (
    <div className={styles.quizzes}>
      <ul>
        {quizzes.map((quiz, index) => (
          <QuizItem
            key={index}
            id={index}
            questionsNumber={index}
            question={quiz.question}
            correct_answer={quiz.correct_answer}
            incorrect_answers={quiz.incorrect_answers}
            checkAnswer={checkAnswer}
            getUserAnswers={getUserAnswers}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(QuizList);
