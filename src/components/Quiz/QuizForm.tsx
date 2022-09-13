import Button, { ButtonProps } from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { FormEvent, memo } from "react";
import { Category } from "../../models/Models";
import styles from "./QuizForm.module.css";

interface Props {
  selectCategory: string;
  setSelectCategory: (selectedCategory: Category["name"]) => void;
  category: Category[];
  fetchQuizzes: (amount: number, category: string) => Promise<void>;
  isStarted: boolean;
  onSubmit: ButtonProps["onClick"];
}

const QuizForm = ({
  selectCategory,
  setSelectCategory,
  category,
  fetchQuizzes,
  isStarted,
  onSubmit,
}: Props) => {
  const changeCategory: TextFieldProps["onChange"] = (event) => {
    setSelectCategory(event.target.value);
  };

  const AMOUNT_QUESTION: number = 10;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    fetchQuizzes(AMOUNT_QUESTION, selectCategory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ textAlign: "center" }}>React Quiz</h1>
      <div className={styles.container}>
        <TextField
          id="outlined-select-currency"
          select
          label="Category"
          value={selectCategory}
          onChange={changeCategory}
          className={styles.category}
          required
          disabled={isStarted}
        >
          {category.map((cate) => (
            <MenuItem key={cate.id} value={cate.id}>
              {cate.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={styles.button}>
        {isStarted ? (
          <Button variant="contained" type="button" onClick={onSubmit}>
            Submit
          </Button>
        ) : (
          <Button type="submit" variant="contained">
            Start Quiz
          </Button>
        )}
      </div>
    </form>
  );
};

export default memo(QuizForm);
