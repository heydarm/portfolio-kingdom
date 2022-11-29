import { clsnm } from "../../utils";
import styles from "./Character.module.scss";

interface CharacterProps {
  direction?: "left" | "right";
  state?: "stand" | "walk";
}

export const Character = ({ state, direction }: CharacterProps) => {
  return (
    <div
      className={clsnm(styles.container, styles[direction!], styles[state!])}
    />
  );
};
