import React, { useMemo, useState } from "react";
import { Answer, Quiz } from "../../models/Models";
import { shuffleArray } from "../../utils/shuffleArray";
import Card from "../UI/Card";
import styles from "./QuizItem.module.css";
import { QuizListProps } from "./QuizList";

interface Props {
  question: Quiz["question"];
  correct_answer: Quiz["correct_answer"];
  incorrect_answers: Quiz["incorrect_answers"];
  questionsNumber: number;
  id: number;
  checkAnswer: QuizListProps["checkAnswer"];
  getUserAnswers: QuizListProps["getUserAnswers"];
}

const QuizItem = ({
  question,
  correct_answer,
  incorrect_answers,
  questionsNumber,
  id,
  checkAnswer,
  getUserAnswers,
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] =
    useState<Answer["userAnswer"]>("");

  const answers = useMemo(
    () =>
      shuffleArray<Quiz["correct_answer"]>([
        correct_answer,
        ...incorrect_answers,
      ]),
    [correct_answer, incorrect_answers]
  );

  const answerClickedHandler = (userAnswer: string) => {
    setSelectedAnswer(userAnswer);
    checkAnswer && checkAnswer(userAnswer, correct_answer);

    const answerObj: Answer = {
      question: question,
      correctAnswer: correct_answer,
      answers: answers,
      userAnswer: userAnswer,
    };
    getUserAnswers(answerObj);
  };

  return (
    <li className={styles.item} key={id}>
      <Card>
        <div className={styles.question}>
          <span>Question {questionsNumber + 1} : </span>

          {decodeURIComponent(question)}
        </div>
        <div className={styles["answer-container"]}>
          {answers.map((answer) => (
            <button
              onClick={() => answerClickedHandler(answer)}
              className={
                selectedAnswer === answer ? styles.active : styles.answer
              }
              disabled={selectedAnswer === answer}
            >
              {decodeURIComponent(answer)}
            </button>
          ))}
        </div>
      </Card>
    </li>
  );
};

export default React.memo(QuizItem);
