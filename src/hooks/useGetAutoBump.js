import axios from "axios";
import { useMutation } from "react-query";

const getAutoBump = (id) => {
  return axios.get(`/api/autoBump/${id}`);
};

const useGetAutoBump = (id) => {
  const { mutate, isLoading, isSuccess, data } = useMutation(getAutoBump);
  return { mutate, isLoading, isSuccess, data };
};

export default useGetAutoBump;
