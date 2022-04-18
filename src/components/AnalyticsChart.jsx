import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const data = [
  { name: "January", manual: 100, auto: 200 },
  { name: "February", manual: 40, auto: 100 },
  { name: "March", manual: 200, auto: 70 },
  { name: "April", manual: 250, auto: 200 },
];
const AnalyticsChart = () => {
  return (
    <LineChart
      width={900}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="manual" stroke="#8884d8" />
      <Line type="monotone" dataKey="auto" stroke="#82ca9d" />
    </LineChart>
  );
};

export default AnalyticsChart;
