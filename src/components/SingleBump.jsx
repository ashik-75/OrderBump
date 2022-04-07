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
  TextStyle,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function renderItem({ item, navigate }) {
  const { id, url, name, location } = item;
  const media = <Avatar customer size="medium" name={name} />;

  const handleDetails = () => {
    const data = `/bumpDetails/${id}`;
    console.log(data);
    navigate(data);
  };

  return (
    <ResourceItem
      id={id}
      //   url={url}
      media={media}
    >
      <div style={{ position: "relative" }}>
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
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

const SingleBump = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState([]);
  const [queryValue, setQueryValue] = useState("");

  const handleFilterValue = (value) => {
    setQueryValue(value);
  };

  const handleQueryValueRemove = () => {
    setQueryValue("");
    setItems(totalItems);
  };

  const handleSearch = () => {
    const filtered = totalItems.filter((item) => {
      if (item?.name?.toLowerCase().includes(queryValue?.toLowerCase())) {
        return true;
      }
    });

    setItems(filtered);
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const items = [
        {
          id: 341,
          url: "customers/341",
          name: "Mae Jemison",
          location: "Decatur, USA",
        },
        {
          id: 256,
          url: "customers/256",
          name: "Ellen Ochoa",
          location: "Los Angeles, USA",
        },
      ];
      setItems(items);
      setTotalItems(items);
    }, 2000);

    return () => clearTimeout(interval);
  }, []);

  const filterControl = (
    <Filters
      disabled={!totalItems.length}
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

  const emptyStateMarkup = !totalItems.length ? (
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
    <Page title="All Bumps">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={(item) => {
                // console.log(item);
                return renderItem({ item, navigate });
              }}
              filterControl={filterControl}
              resourceName={{ singular: "file", plural: "files" }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default SingleBump;
