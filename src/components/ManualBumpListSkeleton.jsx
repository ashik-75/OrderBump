import { Card, Layout, Page, SkeletonBodyText } from "@shopify/polaris";
import React from "react";

const ManualBumpListSkeleton = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ManualBumpListSkeleton;
