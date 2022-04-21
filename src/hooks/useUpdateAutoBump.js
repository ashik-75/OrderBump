import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const updateAutoBump = async ({ autoBumpId, info, app }) => {
  const session = await getSessionToken(app);

  return axios.put(`/api/autoBump/${autoBumpId}/update`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useUpdateAutoBump = () => {
  const { mutate, isLoading, isSuccess, data } = useMutation(updateAutoBump);
  return { mutate, isLoading, isSuccess, data };
};

export default useUpdateAutoBump;
