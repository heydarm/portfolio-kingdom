import React from "react";
import styles from "./Room.module.scss";

interface RoomProps {
  x: number;
  y: number;
  children?: React.ReactNode;
}

export const Room = ({ x, y, children }: RoomProps) => {
  return (
    <div
      className={styles.container}
      style={{ "--x": `${x}%`, "--y": `${y}%` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
