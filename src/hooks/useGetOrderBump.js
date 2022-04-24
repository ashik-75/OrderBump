// import { useAppBridge } from "@shopify/app-bridge-react";
// import { getSessionToken } from "@shopify/app-bridge-utils";
// import axios from "axios";
// import { useQuery } from "react-query";

// const getOrderBump = async (app) => {
//   const session = await getSessionToken(app);
//   return axios.get("/api/orderBump", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${session}`,
//     },
//   });
// };

// const useGetOrderBump = () => {
//   const app = useAppBridge();
//   const { data, isLoading, isSuccess, isError } = useQuery("orderBump", () =>
//     getOrderBump(app)
//   );

//   return { data, isLoading, isSuccess, isError };
// };

// export default useGetOrderBump;

// TODO: Make a Request Using Procedural way

import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetOrderBump = () => {
  const app = useAppBridge();
  const [data, setData] = useState(null);
  const [isError, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const getOrderBump = async () => {
      const token = await getSessionToken(app);
      try {
        setLoading(true);
        const dt = await axios.get("/api/orderBump", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSuccess(true);
        setLoading(false);
        setData(dt);
      } catch (error) {
        setError(true);
        setLoading(false);
        setSuccess(false);
      }
    };

    getOrderBump();
  }, []);
  return { data, isError, isLoading, isSuccess };
};

export default useGetOrderBump;
