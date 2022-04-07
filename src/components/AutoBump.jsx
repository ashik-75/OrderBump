import { Layout, Page } from "@shopify/polaris";
import React from "react";
import AutoBumHead from "./AutoBumHead";
import AutoBumpOffer from "./AutoBumpOffer";
import AutoBumProducts from "./AutoBumProducts";
import AutoBumSettings from "./AutoBumSettings";

const AutoBump = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <AutoBumHead />
        </Layout.Section>
        <Layout.Section>
          <AutoBumSettings />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpOffer />
        </Layout.Section>
        <Layout.Section>
          <AutoBumProducts />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AutoBump;
