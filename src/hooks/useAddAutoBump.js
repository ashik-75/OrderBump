import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const addAutoBump = async ({ info, app }) => {
  const session = await getSessionToken(app);
  return axios.post(`/api/autoBump/create`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useAddAutoBump = () => {
  const { data, isError, isLoading, error, mutate, isSuccess } =
    useMutation(addAutoBump);
  return { data, isError, isLoading, error, mutate, isSuccess };
};

export default useAddAutoBump;
