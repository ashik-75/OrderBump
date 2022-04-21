import { getSessionToken } from "@shopify/app-bridge-utils";
import axios from "axios";
import { useMutation } from "react-query";

const addBumpLocation = async ({ app, info }) => {
  const session = await getSessionToken(app);
  console.log({ session, info });
  return axios.put(`/api/orderBump/addLocation`, info, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session}`,
    },
  });
};

const useAddBumpLocation = () => {
  const { mutate, isLoading, isError, isSuccess, error, data } =
    useMutation(addBumpLocation);

  return { mutate, isLoading, isError, isSuccess, error, data };
};

export default useAddBumpLocation;
