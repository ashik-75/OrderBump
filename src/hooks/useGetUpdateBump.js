import axios from "axios";
import { useMutation } from "react-query";

const updateSingleBump = ({ id, info }) => {
  return axios.put(`/api/bumps/update/${id}`, info, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useGetUpdateBump = () => {
  const { mutate, isLoading, isSuccess, data } = useMutation(updateSingleBump);
  return { mutate, isLoading, isSuccess, data };
};

export default useGetUpdateBump;
