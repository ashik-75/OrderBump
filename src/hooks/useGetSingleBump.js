import axios from "axios";
import { useQuery } from "react-query";

const getSingleBumps = (id) => {
  return axios.get(`/api/bumps/${id}`);
};

const useGetSingleBump = (bumpId) => {
  const { data, isError, isLoading, isSuccess } = useQuery(
    ["allBumps", bumpId],
    () => getSingleBumps(bumpId)
  );
  return { data, isError, isLoading, isSuccess };
};

export default useGetSingleBump;
