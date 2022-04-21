import {
  Avatar,
  Button,
  Card,
  EmptyState,
  Filters,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  Spinner,
  TextStyle,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetOrderBump from "../hooks/useGetOrderBump";

function renderItem({ item, navigate, merchantId }) {
  const { _id, title, content, handle, product } = item;
  const media = (
    <Avatar
      source={product && product?.selection[0]?.images[0]?.originalSrc}
      customer
      size="medium"
      name={handle}
    />
  );

  const handleDetails = () => {
    const data = `/bumpDetails/${_id}`;
    navigate(data);
  };

  return (
    <ResourceItem
      id={_id}
      //   url={url}
      media={media}
    >
      <div style={{ position: "relative" }}>
        <h3>
          <TextStyle variation="strong">
            {title || (product && product?.selection[0]?.title)}
          </TextStyle>
        </h3>
        <div>{content}</div>
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            background: "#dddd",
            padding: 5,
            borderRadius: 5,
          }}
          onClick={handleDetails}
        >
          Details
        </span>
      </div>
    </ResourceItem>
  );
}

const filters = [];

const BumpList = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [queryValue, setQueryValue] = useState("");

  // TODO : Get Current Merchant Shop data
  const { data, isLoading, isError, isSuccess } = useGetOrderBump();

  console.log({ data });

  // TODO: Set Filtering Value
  const handleFilterValue = (value) => {
    setQueryValue(value);
  };

  // TODO: Apply Remove BTN
  const handleQueryValueRemove = () => {
    setQueryValue("");
    setItems(totalItems);
  };

  // TODO: Search Functionality
  const handleSearch = () => {
    const filtered = totalItems?.filter((item) => {
      if (item?.title?.toLowerCase().includes(queryValue?.toLowerCase())) {
        return true;
      }
    });

    setItems(filtered);
  };

  // TODO: Data Hydrate after successfully fetch
  useEffect(() => {
    if (data?.data) {
      setItems(data?.data?.manualBumps);
      setTotalItems(data?.data?.manualBumps);
    }
  }, [data]);

  const filterControl = (
    <Filters
      disabled={totalItems && !totalItems?.length}
      queryValue={queryValue}
      filters={filters}
      onQueryChange={handleFilterValue}
      onQueryClear={handleQueryValueRemove}
    >
      <div style={{ paddingLeft: "8px" }}>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </Filters>
  );

  // TODO: when Data is empty show this state
  const emptyStateMarkup =
    totalItems && !totalItems?.length ? (
      <EmptyState
        heading="Upload a file to get started"
        action={{ content: "Upload files" }}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
      >
        <p>
          You can use the Files section to upload images, videos, and other
          documents
        </p>
      </EmptyState>
    ) : undefined;

  return (
    <Page
      title="All Bumps"
      primaryAction={{
        content: "Add New Bump",
        disabled: false,
        onAction: () => navigate("/add-bump"),
      }}
    >
      {/* <Button onClick={handleFetching}>Reftch</Button> */}
      <Layout>
        <Layout.Section>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner accessibilityLabel="Spinner example" size="large" />
            </div>
          ) : (
            <Card>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={items}
                renderItem={(item) => {
                  // console.log(item);
                  return renderItem({
                    item,
                    navigate,
                    merchantId: data?.data?._id,
                  });
                }}
                filterControl={filterControl}
                resourceName={{ singular: "file", plural: "files" }}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default BumpList;
