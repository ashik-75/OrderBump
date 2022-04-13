import axios from "axios";
import { useQuery } from "react-query";

const getAllBumps = () => {
  return axios.get("/api/bumps/");
};
const useGetAllBumps = () => {
  const { data, isSuccess, isLoading, refetch } = useQuery(
    "allBumps",
    getAllBumps
  );
  return { data, isSuccess, isLoading };
};

export default useGetAllBumps;
