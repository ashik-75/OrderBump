import { Banner, Card, Layout, Page } from "@shopify/polaris";
import React from "react";
import BumpList from "../components/BumpList";

const ManualBump = () => {
  return (
    <Page>
      <Layout>
        {/* Banner one */}
        <Layout.Section>
          <Banner
            title="Looks like you haven’t added the checkout code snippet yet."
            onDismiss={() => {}}
            status="warning"
          >
            <p>
              Your checkout widget won’t show up until you do. Follow these
              instructions to get started.
            </p>
          </Banner>
        </Layout.Section>
        {/* Manual Bumps title */}
        <Layout.Section>
          <Card title="Manual Bumps" sectioned>
            <p>Manage the bumps that you manually set up here</p>
          </Card>
        </Layout.Section>
        {/* TODO: show All The Bumps */}
        <Layout.Section>
          <BumpList />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ManualBump;
