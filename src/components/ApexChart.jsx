import React from "react";
import Chart from "react-apexcharts";
const data = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  },
  series: [
    {
      name: "Manual",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "Auto",
      data: [50, 60, 75, 40, 59, 80, 90, 101],
    },
  ],
};
const ApexChart = () => {
  return (
    <div>
      <Chart
        options={data?.options}
        series={data?.series}
        type="line"
        width="100%"
        height={"300"}
      />
    </div>
  );
};

export default ApexChart;
