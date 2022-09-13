import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./Score.module.css";

interface Props {
  score: number;
  totalQuestions: number;
  onReset: () => void;
  onReview: () => void;
}

const Score = ({ score, totalQuestions, onReset, onReview }: Props) => {
  return (
    <div className={styles.score}>
      <Card className={styles.card}>
        <CardContent>
          <Typography variant="h5" component="div">
            Quiz finished!
          </Typography>

          <Typography variant="body1">
            You scored {score} out of {totalQuestions}!
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={onReset}>
            Reset
          </Button>
          <Button size="medium" onClick={onReview}>
            Review quiz
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Score;
