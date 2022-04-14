import { ResourcePicker } from "@shopify/app-bridge-react";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  FormLayout,
  Heading,
  Layout,
  Page,
  PageActions,
  Select,
  Stack,
  Subheading,
  TextField,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import BumpDetailsSkeleton from "../components/BumpDetailsSkeleton";
import DeleteBumpModal from "../components/DeleteBumpModal";
import processOutput from "../customFunction/processOutput";
import useGetSingleBump from "../hooks/useGetSingleBump";
import useGetUpdateBump from "../hooks/useGetUpdateBump";

const shape = {
  option1: "product_price",
  option2: "contains",
  data: "",
};

function Condition({ bumpInfo, setBumpInfo, setSaveOption }) {
  const [allCondition, setAllCondition] = useState([]);

  const addAnotherCondition = () => {
    setAllCondition([...allCondition, shape]);
  };

  const optionOne = [
    { label: "Product Price", value: "product_price" },
    { label: "Product Tag", value: "product_tag" },
    { label: "Product Title", value: "product_title" },
    { label: "Product Type", value: "product_type" },
    { label: "Product Vendor", value: "product_vendor" },
    { label: "Variant Sku", value: "variant_sku" },
    { label: "Variant Title", value: "variant_title" },
    { label: "Variant Weight", value: "variant_weight" },
  ];
  const optionTwo = [
    { label: "contains", value: "contains" },
    { label: "is equal to", value: "is_equal_to" },
    { label: "is greater than", value: "is_greater_than" },
    { label: "is less than", value: "is_less_than" },
    { label: "does not contain", value: "does_not_contain" },
    { label: "is in", value: "is_in" },
  ];

  const handleSelectChange = (value, field, index) => {
    setSaveOption(false);
    setAllCondition(
      allCondition?.map((el, id) =>
        id === index ? { ...el, [field]: value } : el
      )
    );
  };

  useEffect(() => {
    setBumpInfo({ ...bumpInfo, conditions: allCondition });
  }, [allCondition]);

  useEffect(() => {
    setAllCondition(bumpInfo?.conditions);
  }, []);

  return (
    <FormLayout>
      {allCondition?.map((condition, ind) => (
        <FormLayout.Group key={ind} condensed>
          <Select
            options={optionOne}
            onChange={(value) => handleSelectChange(value, "option1", ind)}
            value={condition?.option1}
          />
          <Select
            options={optionTwo}
            onChange={(value) => handleSelectChange(value, "option2", ind)}
            value={condition?.option2}
          />

          <TextField
            type="text"
            value={condition?.data}
            onChange={(value) => handleSelectChange(value, "data", ind)}
          />
        </FormLayout.Group>
      ))}
      <Button onClick={addAnotherCondition}>
        {allCondition?.length === 0 ? "Add Condition" : "Add Another Condition"}
      </Button>
    </FormLayout>
  );
}

const BumpDetails = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const bumpId = useParams()?.bumpId;
  const [saveoption, setSaveOption] = useState(true);
  const [bumpInfo, setBumpInfo] = useState({
    postpurchase: false,
    prepurchase: false,
    product: null,
    title: "",
    content: "",
    conditions: [],
  });

  // get single bumps by id
  const { data, isError, isLoading, isSuccess } = useGetSingleBump(bumpId);

  console.log({ data, isLoading, isSuccess });

  // update mutation
  const {
    mutate: updateMutation,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    data: updateData,
  } = useGetUpdateBump();

  const { postpurchase, prepurchase, title, content, product } = bumpInfo;

  const handleChange = (value, field) => {
    setSaveOption(false);
    setBumpInfo({ ...bumpInfo, [field]: value });
  };

  const handleUpdate = () => {
    const data = processOutput(bumpInfo);
    updateMutation({ id: bumpId, info: data });
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      setBumpInfo(data?.data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isUpdateSuccess) {
      queryClient.invalidateQueries("allBumps");
      setBumpInfo(updateData?.data);
    }
  }, [isUpdateSuccess]);

  console.log({ bump: bumpInfo });

  return isLoading || isUpdateLoading ? (
    <BumpDetailsSkeleton />
  ) : (
    <Page
      // divider
      primaryAction={{
        content: isUpdateLoading ? "Updating" : "Save",
        disabled: saveoption,
        onAction: handleUpdate,
      }}
      title={bumpInfo?.title || bumpInfo?.product?.selection[0]?.title}
      breadcrumbs={[{ content: "Products", onAction: () => navigate("/") }]}
      titleMetadata={
        <Badge status="warning">{isLoading ? "Loading" : "complete"}</Badge>
      }
      secondaryActions={[
        {
          content: "Enable",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      {/* bump option (checkbox) */}
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Choose a bump option"
          description="This is where your product offer will appear"
        >
          <Card sectioned>
            <FormLayout>
              <Checkbox
                label="Pre-purchase (checkout)"
                helpText="Feature your product offer in a widget on the checkout page of your store"
                checked={prepurchase}
                onChange={(value) => handleChange(value, "prepurchase")}
              />
              <Checkbox
                label="Post-purchase"
                helpText="Feature your product offer in a separate page after checkout and before the order status page"
                checked={postpurchase}
                onChange={(value) => handleChange(value, "postpurchase")}
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      {/* End bump option (checkbox) */}

      <br />

      {/* Resource picker for select product (button) */}
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Choose a bump product"
          description="This is the product offer that will be shown to customers"
        >
          <Card sectioned>
            {product && (
              <div>
                <Stack>
                  <Stack.Item>
                    <Thumbnail
                      source={
                        product?.selection[0]?.images[0]?.originalSrc || ""
                      }
                      alt="Black choker necklace"
                      size="large"
                    />
                  </Stack.Item>
                  <Stack.Item fill>
                    <Heading>{product?.selection[0]?.title}</Heading>
                    <Subheading>{product?.id}</Subheading>
                  </Stack.Item>
                  <Stack.Item>
                    <Heading>
                      ${product?.selection[0]?.variants[0]?.price}
                    </Heading>
                  </Stack.Item>
                </Stack>
                <br />
                <Stack.Item>
                  <TextStyle variation="subdued">
                    Alternate images shown on post-purchase page only
                  </TextStyle>
                </Stack.Item>
                <br />
                <Thumbnail
                  source={product?.selection[0]?.images[0]?.originalSrc || ""}
                  alt="Black choker necklace"
                  size="small"
                />
                <br />
              </div>
            )}
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => setIsOpen(true)}>
                {product ? "Change Product" : "Select Product "}
              </Button>
              {product && (
                <Button
                  destructive={true}
                  onClick={() => {
                    setSaveOption(false);
                    setBumpInfo({ ...bumpInfo, product: null });
                  }}
                >
                  Remove Product
                </Button>
              )}
            </div>
            <br />

            {product && (
              <Condition
                bumpInfo={bumpInfo}
                setBumpInfo={setBumpInfo}
                setSaveOption={setSaveOption}
              />
            )}

            <ResourcePicker
              resourceType="Product"
              open={isOpen}
              onCancel={() => setIsOpen(false)}
              selectMultiple={false}
              showVariants={true}
              onSelection={(product) => {
                setIsOpen(false);
                handleChange(product, "product");
                // setBumpInfo({ ...bumpInfo, product });
              }}
            />
          </Card>
        </Layout.AnnotatedSection>
      </Layout>

      {/* End Resource picker for select product (button) */}

      <br />
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Add a title - optional"
          description="This is the title of the product offer your customers will see"
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                value={title}
                label="Product Title"
                onChange={(value) => handleChange(value, "title")}
                autoComplete="off"
                placeholder="e.g A Compelling Title"
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Add a description - optional"
          description="Add a product description that will get your customers excited about your special offer"
        >
          <Card sectioned>
            <FormLayout>
              <TextField
                value={content}
                label="Store name here"
                onChange={(value) => handleChange(value, "content")}
                autoComplete="off"
                multiline={4}
                placeholder="e.g A descriptive product offer that really sells it"
              />
            </FormLayout>
          </Card>
        </Layout.AnnotatedSection>
      </Layout>

      <DeleteBumpModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        bumpId={bumpId}
      />
      <br />

      <PageActions
        primaryAction={{
          content: isUpdateLoading ? "Updating" : "Save",
          disabled: saveoption,
          onAction: handleUpdate,
        }}
        secondaryActions={[
          {
            content: "Delete",
            destructive: true,
            onAction: () => setIsModalOpen(true),
          },
        ]}
      />
    </Page>
  );
};

export default BumpDetails;
