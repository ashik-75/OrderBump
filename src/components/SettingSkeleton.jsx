import { Card, Layout, SkeletonBodyText, SkeletonPage } from "@shopify/polaris";
import React from "react";

const SettingSkeleton = () => {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <SkeletonBodyText />
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
};

export default SettingSkeleton;
