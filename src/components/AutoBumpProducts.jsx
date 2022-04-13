import { ResourcePicker } from "@shopify/app-bridge-react";
import { Button, Card } from "@shopify/polaris";
import React, { useState } from "react";

const FilteredProduct = ({ products, setProducts }) => {
  const handleRemove = (id) => {
    const resultData = products.filter((dt, ind) => ind !== id);
    setProducts(resultData);
  };
  return (
    <Card sectioned>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        {products?.map((dt, ind) => (
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
                onClick={() => handleRemove(ind)}
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

const AutoBumpProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <Card title="Exclude Products" sectioned>
      <p style={{ marginBottom: "20px" }}>
        Products added here will be excluded from being shown by Auto Bumps.
      </p>

      {products?.length > 0 && (
        <FilteredProduct setProducts={setProducts} products={products} />
      )}

      <br />

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <Button onClick={() => setIsOpen(true)}>
          {products?.length > 0 ? "Edit Products" : "Select Product"}
        </Button>
        {products?.length > 0 && (
          <Button destructive={true} onClick={() => setProducts([])}>
            Remove All
          </Button>
        )}
      </div>
      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        selectMultiple={true}
        onSelection={(product) => {
          setIsOpen(false);
          setProducts(product?.selection);
        }}
      />
    </Card>
  );
};

export default AutoBumpProducts;
