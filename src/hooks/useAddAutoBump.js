import axios from "axios";
import { useMutation } from "react-query";

const addAutoBump = (info) => {
  return axios.post("/api/autoBump/add", info, {
    "Content-Type": "application/json",
  });
};

const useAddAutoBump = () => {
  const { data, isError, isLoading, error, mutate } = useMutation(addAutoBump);
  return { data, isError, isLoading, error, mutate };
};

export default useAddAutoBump;
