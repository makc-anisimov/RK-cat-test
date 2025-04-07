import { Checkbox } from "../checkbox/checkbox";
import styles from "./cats.module.scss";

export const Cats = () => {
  return (
    <div className={styles.cats}>
      <Checkbox />
      <Checkbox />
      <button className={styles.button} onClick={() => console.log("click")}>Get cat</button> 
    </div>
  );
};
