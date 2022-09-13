import axios from "axios";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import QuizForm from "../components/Quiz/QuizForm";
import QuizList, { QuizListProps } from "../components/Quiz/QuizList";
import Score from "../components/Quiz/Score";
import ReviewList from "../components/ReviewQuiz/ReviewList";
import Loader from "../components/UI/Loader";
import { BASE_URL } from "../config/api";
import { Answer, Category, Quiz } from "../models/Models";

const Home = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [selectCategory, setSelectCategory] = useState<Category["name"]>("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const fetchCategory = async () => {
    try {
      const api = await axios.get(`${BASE_URL}/api_category.php`);
      const response = await api.data;
      setCategory(response.trivia_categories);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
        setError(error.message);
      }
    }
  };

  const fetchQuizzes = async (amount: number, category: Category["name"]) => {
    setIsLoading(true);
    setIsStarted(true);
    const api = await axios.get(
      `${BASE_URL}/api.php?amount=${amount}&category=${category}&encode=url3986`
    );
    const response = await api.data;
    setQuizzes(response.results);
    setIsLoading(false);
  };

  const checkAnswer = useCallback(
    (
      userAnswer: Answer["userAnswer"],
      correctAnswer: Answer["correctAnswer"]
    ): QuizListProps["checkAnswer"] => {
      if (userAnswer !== correctAnswer) return;
      setScore(score + 1);
    },
    [score]
  );

  const resetHandler = () => {
    setIsSubmitted(false);
    setQuizzes([]);
    setIsStarted(false);
    setScore(0);
    setUserAnswers([]);
    setIsClicked(false);
  };

  const getUserAnswers: QuizListProps["getUserAnswers"] = useCallback(
    (answers: Answer) => {
      setUserAnswers([...userAnswers, answers]);
    },
    [userAnswers]
  );

  const submitHandler = () => {
    setIsSubmitted(true);
  };

  const reviewQuizHandler = () => {
    setIsClicked(true);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const renderReviewList = useMemo(() => {
    return isClicked ? (
      <ReviewList
        reviewList={userAnswers}
        score={score}
        totalQuestions={quizzes.length}
        onReset={resetHandler}
      />
    ) : (
      <Score
        score={score}
        totalQuestions={quizzes.length}
        onReset={resetHandler}
        onReview={reviewQuizHandler}
      />
    );
  }, [isClicked, quizzes.length, score, userAnswers]);

  const renderQuiz = useMemo(() => {
    return (
      <>
        <QuizForm
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
          category={category}
          fetchQuizzes={fetchQuizzes}
          isStarted={isStarted}
          onSubmit={submitHandler}
        />
        {isLoading ? (
          <div className="centered">
            <Loader />
          </div>
        ) : (
          <QuizList
            quizzes={quizzes}
            checkAnswer={checkAnswer}
            getUserAnswers={getUserAnswers}
          />
        )}
      </>
    );
  }, [
    category,
    checkAnswer,
    getUserAnswers,
    isLoading,
    isStarted,
    quizzes,
    selectCategory,
  ]);

  return (
    <>
      {error}
      {isSubmitted ? renderReviewList : renderQuiz}
    </>
  );
};

export default memo(Home);
