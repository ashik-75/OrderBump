import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useQuery } from "react-query";

const getSingleBumps = async ({ app, manualBumpId }) => {
  const session = await getSessionToken(app);
  return axios.get(`/api/manualBump/${manualBumpId}`, {
    headers: {
      Authorization: `Bearer ${session}`,
      "Content-Type": "application/json",
    },
  });
};

const useGetSingleBump = ({ app, manualBumpId }) => {
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["allBumps", manualBumpId],
    () => getSingleBumps({ app, manualBumpId })
  );
  return { data, isError, isLoading, isSuccess };
};

export default useGetSingleBump;
