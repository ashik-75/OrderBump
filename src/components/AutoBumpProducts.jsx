import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

const FilteredProduct = ({
  excludeProducts,
  settingsInfo,
  setSettingsInfo,
}) => {
  const handleRemove = (id) => {
    const filteredData = excludeProducts?.filter((dt) => {
      return dt?.id !== id;
    });

    setSettingsInfo({
      ...settingsInfo,
      excludeProducts: filteredData,
    });
  };
  return (
    <Card sectioned>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        {excludeProducts?.map((dt) => (
          <div key={dt?.id}>
            <div
              style={{
                position: "relative",
              }}
            >
              <img
                style={{
                  width: 100,
                  height: 100,
                }}
                src={dt?.images[0]?.originalSrc}
                alt=""
              />
              <span
                style={{
                  background: "#fff",
                  color: "black",
                  position: "absolute",
                  top: 10,
                  right: 10,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 20,
                  cursor: "pointer",
                }}
                onClick={() => handleRemove(dt?.id)}
              >
                X
              </span>
            </div>
            <div>{dt?.title}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const AutoBumpProducts = ({
  setSettingsInfo,
  settingsInfo,
  setIsDisableBtn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { excludeProducts } = settingsInfo;

  const initialIds = excludeProducts?.map((prod) => ({ id: prod?.id }));

  console.log({ initialIds });
  return (
    <Card title="Exclude Products" sectioned>
      <p style={{ marginBottom: "20px" }}>
        Products added here will be excluded from being shown by Auto Bumps.
      </p>

      {excludeProducts?.length > 0 && (
        <FilteredProduct
          setSettingsInfo={setSettingsInfo}
          excludeProducts={excludeProducts}
          settingsInfo={settingsInfo}
        />
      )}

      <br />

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <Button onClick={() => setIsOpen(true)}>
          {excludeProducts?.length > 0 ? "Edit Products" : "Select Product"}
        </Button>
        {excludeProducts?.length > 0 && (
          <Button
            destructive={true}
            onClick={() =>
              setSettingsInfo({ ...settingsInfo, excludeProducts: [] })
            }
          >
            Remove All
          </Button>
        )}
      </div>
      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        selectMultiple={true}
        initialSelectionIds={initialIds}
        onSelection={(product) => {
          setIsOpen(false);
          setIsDisableBtn(false);
          setSettingsInfo({
            ...settingsInfo,
            excludeProducts: product?.selection,
          });
        }}
      />
    </Card>
  );
};

export default AutoBumpProducts;
