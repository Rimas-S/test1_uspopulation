import axios from "axios";
import { FC, useEffect, useState } from "react";
import Chart from "./Chart";
import "../styles/PopulationGraph.css";

interface PopulationGraphType {
  country: string;
  url: string;
}

type Period = 3 | 5 | 10;

export const PopulationGraph: FC<PopulationGraphType> = ({ country, url }) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const [history, setHistory] = useState<Period>(10);

  const formatResponse = (response: any) => {
    const data = response?.map((data: any) => ({
      x: data["Year"],
      y: data["Population"] / 1000000,
    }));

    return data;
  };

  const dataForPeriod = (period: Period) => {
    const endYear = 2020;
    const startYear = endYear - period;
    const data = response?.filter((data: any) => data.x > startYear);

    const chartData = [
      {
        id: country,
        data: data,
      },
    ];

    return chartData;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(function (response) {
        setResponse(formatResponse(response.data.data.reverse()));
      })
      .catch(function (error) {
        console.log(error);
      });

    setLoading(false);

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="population-graph">
      <div>
        <label htmlFor="years">Choose length of the history: </label>
        <select
          name="history"
          id="history"
          value={history}
          onChange={(e: any) => setHistory(e.target.value)}
        >
          <option value={3}>3 years</option>
          <option value={5}>5 years</option>
          <option value={10}>10 years</option>
        </select>
      </div>

      {response && (
        <div className="population-graph__history">
          <Chart data={dataForPeriod(history)} />
        </div>
      )}
    </div>
  );
};
