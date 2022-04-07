import { Card, Layout, Page } from "@shopify/polaris";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

const BumpDetails = () => {
  const location = useLocation();
  const params = useParams();

  console.log({ location, params });
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>BumpDetails page - {params?.bumpId}</Card>;
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default BumpDetails;
