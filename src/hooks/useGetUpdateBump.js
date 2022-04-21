import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const updateSingleBump = async ({ manualBumpId, info, app }) => {
  const session = await getSessionToken(app);
  return axios.put(`/api/manualBump/${manualBumpId}/update`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useGetUpdateBump = () => {
  const { mutate, isLoading, isSuccess, data } = useMutation(updateSingleBump);
  return { mutate, isLoading, isSuccess, data };
};

export default useGetUpdateBump;
