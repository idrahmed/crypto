import styles from "../styles/TrendingCoin.module.scss";
import Image from "next/image";
import Link from "next/link";

const TrendingCoin = ({ coinData }) => {
  const price = coinData.price_change >= 0;

  return (
    <Link href="/coin/[coinId]" as={`/coin/${coinData.id}`} key={coinData.id}>
      <a className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.left__flex}>
            {/* image */}
            <div className={styles.img}>
              <Image src={coinData.img} alt="" layout="fill" />
            </div>

            {/* title and price */}
            <div className={styles.left__data}>
              <h4>{coinData.name}</h4>
              <p>{`$${coinData.price.toFixed(3)}`}</p>
            </div>
          </div>

          <div className={styles.info}>
            <span className={styles.info__item}>
              <p>24h high:</p> ${coinData.high.toFixed(2)}
            </span>
            <span className={styles.info__item}>
              <p>24h low: </p> ${coinData.low.toFixed(2)}
            </span>
          </div>

          {/* percentage  */}
          <div className={styles.right}>
            <p className={price ? styles.positive : styles.negative}>
              {price
                ? `+${coinData.price_change.toFixed(2)}`
                : coinData.price_change.toFixed(2)}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default TrendingCoin;
