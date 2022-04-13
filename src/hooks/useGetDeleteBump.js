import axios from "axios";
import { useMutation } from "react-query";

const deleteBumps = (id) => {
  return axios.delete(`/api/bumps/delete/${id}`);
};

const useGetDeleteBump = () => {
  const { mutate, isLoading, isSuccess } = useMutation(deleteBumps);
  return { mutate, isLoading, isSuccess };
};

export default useGetDeleteBump;
