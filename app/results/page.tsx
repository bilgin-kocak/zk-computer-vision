import { Button } from "@/components/button/Button";
import Images from "../_components/candidates/candidates";
import styles from "./page.module.scss";
import cn from "classnames";

export default function Results() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Images showResults={true} />
        <Button className={styles.button} href="/" text="Go back" />
      </div>
    </div>
  );
}
