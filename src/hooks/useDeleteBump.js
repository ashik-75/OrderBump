import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const deleteBumps = async ({ manualBumpId, app }) => {
  const session = await getSessionToken(app);
  return axios.delete(`/api/manualBump/${manualBumpId}/delete`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useDeleteBump = () => {
  const { mutate, isLoading, isSuccess, isError, error } =
    useMutation(deleteBumps);
  return { mutate, isLoading, isSuccess, isError, error };
};

export default useDeleteBump;
