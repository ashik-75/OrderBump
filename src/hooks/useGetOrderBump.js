import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useQuery } from "react-query";

const getOrderBump = async (app) => {
  const session = await getSessionToken(app);
  return axios.get("/api/orderBump", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useGetOrderBump = () => {
  const app = useAppBridge();
  const { data, isLoading, isSuccess, isError } = useQuery("orderBump", () =>
    getOrderBump(app)
  );

  return { data, isLoading, isSuccess, isError };
};

export default useGetOrderBump;
