import { CircularProgress, ThemeProvider } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { getHistoricalChart } from "../config/api";
import { darkTheme } from "../config/theme";
import styles from "../styles/CoinInfo.module.scss";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import SelectButton from "./SelectButton";

export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];

const CoinInfo = ({ currency, id }) => {
  const [graphData, setGraphData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setflag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(getHistoricalChart(id, days, currency));
      setflag(true);
      setGraphData(data.prices);
    };
    fetchData();
  }, [currency, days, id]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.container}>
        {!graphData | (flag === false) ? (
          <CircularProgress size={50} thickness={1} />
        ) : (
          <Line
            data={{
              labels: graphData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: graphData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#BB86FC",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
        {graphData && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setGraphData();
                  setDays(day.value);
                  setflag(false);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
