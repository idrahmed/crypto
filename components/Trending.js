import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/Trending.module.scss";
import TrendingCoin from "./TrendingCoin";

import { getTrendingCoins } from "../config/api";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress, Stack } from "@mui/material";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1300 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1300, min: 850 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 850, min: 0 },
    items: 2,
  },
};

const Trending = ({ currency }) => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setLoading(true);
      const { data } = await axios.get(getTrendingCoins(currency));
      setTrending(data);
      setLoading(false);
    };
    fetchTrendingCoins();
  }, [currency]);

  return (
    <div className={styles.container}>
      <Carousel responsive={responsive}>
        {loading ? (
          <Stack
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="1200px"
          >
            <CircularProgress />
          </Stack>
        ) : (
          trending.map((coin) => (
            <TrendingCoin
              key={coin.id}
              coinData={{
                id: coin.id,
                name: coin.name,
                img: coin.image,
                price_change: coin.price_change_percentage_24h,
                price: coin.current_price,
                high: coin.high_24h,
                low: coin.low_24h,
              }}
            />
          ))
        )}
      </Carousel>
    </div>
  );
};

export default Trending;
