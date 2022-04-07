import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

const AutoBumpOffer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);
  console.log(product);

  return (
    <Card title="Fallback Product Offer" sectioned>
      <p style={{ marginBottom: "20px" }}>
        In the rare case that your store does not have enough sales or product
        data to generate an Auto Bump, you can manually set a fallback product
        offer to show your customers.
      </p>
      {product && (
        <Card title={product?.selection[0]?.title} sectioned>
          <img
            style={{ width: 100, height: 100 }}
            src={product?.selection[0]?.images[0]?.originalSrc}
            alt=""
          />
        </Card>
      )}
      <br />
      <div style={{ display: "flex", gap: 10 }}>
        <Button onClick={() => setIsOpen(true)}>
          {product ? "Change Product" : "Select Product "}
        </Button>
        {product && (
          <Button destructive={true} onClick={() => setProduct(null)}>
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
          setProduct(product);
        }}
      />
    </Card>
  );
};

export default AutoBumpOffer;
