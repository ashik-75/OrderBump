import axios from "axios";
import { useQuery } from "react-query";

const getAutoBumpInfo = (id) => {
  return axios.get(`/api/autoBump/${id}`);
};

const useFetchAutoBump = (id) => {
  const { data, isLoading, isSuccess, isError, error } = useQuery(
    ["autoBump", id],
    () => getAutoBumpInfo(id)
  );
  return { data, isLoading, isSuccess, isError, error };
};

export default useFetchAutoBump;
