import { Card, FormLayout, Layout, Page, Select } from "@shopify/polaris";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [saveOption, setSaveOption] = useState(true);
  const [bumpLocation, setBumpLocation] = useState("custom");
  const navigate = useNavigate();

  const handleAction = () => {
    console.log("action");
    console.log(bumpLocation);
  };

  const handleChange = (value) => {
    setBumpLocation(value);
    setSaveOption(false);
  };

  const options = [
    { label: "Custom", value: "custom" },
    { label: "Main", value: "main" },
    { label: "Sidebar", value: "Sidebar" },
  ];
  return (
    <Page
      title="Global Settings"
      primaryAction={{
        content: "Save",
        disabled: saveOption,
        onAction: handleAction,
      }}
      breadcrumbs={[{ content: "Products", onAction: () => navigate("/") }]}
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
