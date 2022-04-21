import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const addBumpToBackend = async ({ info, app, merchantId }) => {
  const sessionToken = await getSessionToken(app);

  return axios.post(`/api/manualBump/create`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`,
    },
  });
};

const useAddBump = () => {
  const { mutate, isLoading, isError, isSuccess, data } =
    useMutation(addBumpToBackend);
  return { mutate, isLoading, isError, isSuccess, data };
};

export default useAddBump;
