import React from "react";
import useGetOrderBump from "../hooks/useGetOrderBump";

const Play = () => {
  const { data, isLoading, isSuccess, isError } = useGetOrderBump();

  console.log({ data, isLoading, isSuccess, isError });
  return <div>Play</div>;
};

export default Play;
