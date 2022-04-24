import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Button, Page } from "@shopify/polaris";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const testSession = async (app) => {
  const session = await getSessionToken(app);
  console.log(session);
  return axios.get("/api/orderBump", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
};

const Play = () => {
  const app = useAppBridge();

  const { data, refetch } = useQuery("test", () => testSession(app), {
    enabled: false,
  });

  console.log({ data });
  return (
    <Page>
      <Button onClick={refetch}>Click</Button>
    </Page>
  );
};

export default Play;
