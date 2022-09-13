import React from "react";
import styles from "./Card.module.css";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<Props> = (props) => {
  return (
    <section
      className={`${styles.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
