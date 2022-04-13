import { Layout, Page } from "@shopify/polaris";
import React from "react";
import AutoBumpHead from "../components/AutoBumpHead";
import AutoBumpOffer from "../components/AutoBumpOffer";
import AutoBumpProducts from "../components/AutoBumpProducts";
import AutoBumpSettings from "../components/AutoBumpSettings";

const AutoBump = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <AutoBumpHead />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpSettings />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpOffer />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpProducts />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AutoBump;
