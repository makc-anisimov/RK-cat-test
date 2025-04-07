import { Cats } from "../cats/cats";
import styles from "./app.module.scss";

const App = () => {

  return (
    <section className={styles.app}>
      <Cats />
    </section>
  );
};

export default App;
