import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Card, Thumbnail } from "@shopify/polaris";
import React, { useState } from "react";

const AutoBumpOffer = ({ setSettingsInfo, settingsInfo, setIsDisableBtn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { fallbackProduct } = settingsInfo;

  return (
    <Card title="Fallback Product Offer" sectioned>
      <p style={{ marginBottom: "20px" }}>
        In the rare case that your store does not have enough sales or product
        data to generate an Auto Bump, you can manually set a fallback product
        offer to show your customers.
      </p>
      {fallbackProduct && (
        <Card title={fallbackProduct?.title} sectioned>
          <Thumbnail
            source={fallbackProduct?.images[0]?.originalSrc || ""}
            alt="Black choker necklace"
          />
        </Card>
      )}
      <br />
      <div style={{ display: "flex", gap: 10 }}>
        <Button onClick={() => setIsOpen(true)}>
          {fallbackProduct ? "Change Product" : "Select Product "}
        </Button>
        {fallbackProduct && (
          <Button
            destructive={true}
            onClick={() =>
              setSettingsInfo({ ...settingsInfo, fallbackProduct: null })
            }
          >
            Remove Product
          </Button>
        )}
      </div>

      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        selectMultiple={false}
        onSelection={(product) => {
          setIsOpen(false);
          setIsDisableBtn(false);
          setSettingsInfo({
            ...settingsInfo,
            fallbackProduct: product?.selection[0],
          });
        }}
      />
    </Card>
  );
};

export default AutoBumpOffer;
