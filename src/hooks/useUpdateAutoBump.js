import axios from "axios";
import { useMutation } from "react-query";

const updateAutoBump = ({ id, info }) => {
  console.log({ id, info });
  return axios.put(`/api/autoBump/update/${id}`, info, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const useUpdateAutoBump = () => {
  const { mutate, isLoading, isSuccess, data } = useMutation(updateAutoBump);
  return { mutate, isLoading, isSuccess, data };
};

export default useUpdateAutoBump;
