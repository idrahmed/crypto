import AllCoins from "../components/AllCoins";
import styles from "../styles/Home.module.scss";

export default function Home({ currency }) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <AllCoins currency={currency} />
      </div>
    </div>
  );
}
