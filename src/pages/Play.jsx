import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Button, Page } from "@shopify/polaris";
import axios from "axios";
import React from "react";
import { useQuery, useQueryClient } from "react-query";

const testSession = async (app) => {
  const session = await getSessionToken(app);
  return axios.get("/api/manualBump", {
    headers: {
      Authorization: `Bearer ${session}`,
    },
  });
};

const Play = () => {
  const app = useAppBridge();
  const queryClient = useQueryClient();

  const { data, refetch, isSuccess, isLoading } = useQuery(
    "test",
    () => testSession(app),
    {
      enabled: true,
    }
  );

  const updateViewToServer = async (id) => {
    const session = await getSessionToken(app);
    const res = await axios.get(`/api/manualBump/${id}/views`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (res?.data) {
      queryClient.invalidateQueries("test");
    }

    console.log(res?.data);
  };

  const updateClickToServer = async (id) => {
    const session = await getSessionToken(app);
    const res = await axios.get(`/api/manualBump/${id}/click`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (res?.data) {
      queryClient.invalidateQueries("test");
    }

    console.log(res?.data);
  };

  return (
    <Page>
      <Button onClick={refetch}>Click</Button>

      {isLoading && <div>Loading...</div>}

      {isSuccess &&
        data?.data?.map((bump) => (
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <span>{bump?.title}</span>
            <span>{bump?.views}</span>
            <span>{bump?.click}</span>
            <Button onClick={() => updateViewToServer(bump?._id)}>
              Add Views
            </Button>
            <Button onClick={() => updateClickToServer(bump?._id)}>
              Click
            </Button>
          </div>
        ))}
    </Page>
  );
};

export default Play;
