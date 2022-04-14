import { Button, Page } from "@shopify/polaris";
import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
const deleteBumps = (id) => {
  return axios.delete(`/api/bumps/delete/${id}`);
};
const Play = () => {
  const { mutate, isError, error, isLoading, data } = useMutation(deleteBumps);
  console.log({ isError, error, isLoading, data });
  return (
    <Page>
      <Button onClick={() => mutate(123)}>Delete Bumps</Button>
    </Page>
  );
};

export default Play;
