import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSingleCoin } from "../../config/api";
import axios from "axios";
import styles from "../../styles/Coin.module.scss";
import CoinInfo from "../../components/CoinInfo";
import Image from "next/image";
import ReactHtmlParser from "react-html-parser";
import { LinearProgress } from "@mui/material";
import { numberWithCommas } from "../../config/utils";

const Coin = ({ currency }) => {
  const router = useRouter();
  const { coinId } = router.query;
  const [coin, setCoin] = useState("");

  // fetching data for single coin.

  useEffect(() => {
    const fetchCoin = async () => {
      if (!router.isReady) return;
      const { data } = await axios.get(getSingleCoin(coinId));
      setCoin(data);
    };
    fetchCoin();
  }, [coinId, router]);

  if (!coin) return <LinearProgress />;

  return (
    <div className={styles.container}>
      {coin && (
        <div className={styles.sidebar}>
          <div className={styles.img__container}>
            <Image
              src={coin?.image?.large}
              alt={coin?.name}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h1 className={styles.heading}>{coin.name}</h1>
          <p>{ReactHtmlParser(coin.description.en.split(". ")[0])}</p>
          <div className={styles.marketData}>
            <span className={styles.marketData__span}>
              <h4>Rank: </h4> {coin.market_cap_rank}
            </span>
            <span className={styles.marketData__span}>
              <h4>Current Price: </h4> $
              {coin.market_data.current_price[currency.toLowerCase()]}
            </span>
            <span className={styles.marketData__span}>
              <h4>Market cap: </h4> $
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()].toString()
              )}
            </span>
          </div>
        </div>
      )}

      <CoinInfo
        coin={coin}
        currency={currency}
        id={coin.id}
        className={styles.chart}
      />
    </div>
  );
};

export default Coin;
