import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const getData = ({ queryKey }) => {
  console.log(queryKey);
  return axios.get("https://jsonplaceholder.typicode.com/posts");
};

const Play = () => {
  const { data, isLoading, isError } = useQuery(
    ["showdata", { x: 1 }],
    getData
  );

  console.log({ data, isLoading, isError });
  return <div>Play</div>;
};

export default Play;
