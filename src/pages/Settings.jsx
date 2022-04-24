import { useAppBridge } from "@shopify/app-bridge-react";
import { Card, FormLayout, Layout, Page, Select } from "@shopify/polaris";
import React, { useCallback, useEffect, useState } from "react";
import SettingSkeleton from "../components/SettingSkeleton";
import useAddBumpLocation from "../hooks/useAddBumpLocation";
import useGetOrderBump from "../hooks/useGetOrderBump";

const Settings = () => {
  const app = useAppBridge();

  const [saveOption, setSaveOption] = useState(true);
  const [bumpLocation, setBumpLocation] = useState("custom");

  // TODO: Get OrderBump Data
  const { data, isLoading, isSuccess } = useGetOrderBump();

  // TODO: Add Bump Location to OrderBump
  const { mutate, isLoading: isAddLoading } = useAddBumpLocation();

  const handleAction = () => {
    const info = { bumpLocation };
    mutate({ app, info });
  };

  const handleChange = useCallback((value) => {
    setBumpLocation(value);
    setSaveOption(false);
  }, []);

  useEffect(() => {
    if (data?.data && isSuccess) {
      setBumpLocation(data?.data?.bumpLocation);
    }
  }, [data]);

  const options = [
    { label: "Custom", value: "custom" },
    { label: "Main", value: "main" },
    { label: "Sidebar", value: "sidebar" },
  ];
  return isAddLoading || isLoading ? (
    <SettingSkeleton />
  ) : (
    <Page
      title="Global Settings"
      primaryAction={{
        content: "Save",
        disabled: saveOption,
        onAction: handleAction,
      }}
      // breadcrumbs={[{ content: "Products", onAction: () => navigate("/") }]}
    >
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Choose In-Checkout Bump Location"
          description="Where do you want your checkout bumps to appear?"
        >
          <Card sectioned>
            <FormLayout>
              <Select
                label="Store name"
                options={options}
                onChange={handleChange}
                value={bumpLocation}
                autoComplete="off"
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
};

export default Settings;
