import { ResourcePicker, useAppBridge } from "@shopify/app-bridge-react";
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
  TextField,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
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

function Condition({ manualBumpInfo, setManualBumpInfo, setSaveOption }) {
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
    setManualBumpInfo({ ...manualBumpInfo, conditions: allCondition });
  }, [allCondition]);

  useEffect(() => {
    setAllCondition(manualBumpInfo?.conditions);
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
  const app = useAppBridge();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { manualBumpId } = useParams();

  const [saveoption, setSaveOption] = useState(true);
  const [manualBumpInfo, setManualBumpInfo] = useState({
    postPurchase: false,
    prePurchase: false,
    product: null,
    enable: false,
    title: "",
    content: "",
    conditions: [],
  });

  // TODO; EXTRACT BUMP INFO
  const { postPurchase, prePurchase, title, content, product, enable } =
    manualBumpInfo;

  // TODO: GET SINGLE BUMP DATA
  const { data, isError, isLoading, isSuccess } = useGetSingleBump({
    app,
    manualBumpId,
  });

  // TODO: UPDATE BUMP DATA (MUTATION)
  const {
    mutate: updateMutation,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
    data: updateData,
  } = useGetUpdateBump();

  const handleUpdate = () => {
    const data = processOutput(manualBumpInfo);
    console.log(data);
    updateMutation({ manualBumpId, info: data, app });
  };

  // TODO: HANDLER UPDATE BUMP INFO
  const handleChange = (value, field) => {
    setSaveOption(false);
    setManualBumpInfo({ ...manualBumpInfo, [field]: value });
  };

  useEffect(() => {
    if (isSuccess && data?.data) {
      setManualBumpInfo(data?.data);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setManualBumpInfo(updateData?.data);
    }
  }, [isUpdateSuccess]);

  const handleEnable = () => {
    setSaveOption(false);
    setManualBumpInfo({ ...manualBumpInfo, enable: !enable });
  };

  return isLoading || isUpdateLoading ? (
    <BumpDetailsSkeleton />
  ) : (
    <Page
      primaryAction={{
        content: isUpdateLoading ? "Updating" : "Save",
        disabled: saveoption,
        onAction: handleUpdate,
      }}
      title={
        manualBumpInfo?.title || manualBumpInfo?.product?.selection[0]?.title
      }
      breadcrumbs={[{ content: "Products", onAction: () => navigate("/") }]}
      titleMetadata={
        <Badge status="warning">{isLoading ? "Loading" : "complete"}</Badge>
      }
      secondaryActions={[
        {
          content: enable ? "Disable" : "Enable",
          accessibilityLabel: "Secondary action label",
          onAction: handleEnable,
        },
      ]}
    >
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
                checked={prePurchase}
                onChange={(value) => handleChange(value, "prePurchase")}
              />
              <Checkbox
                label="Post-purchase"
                helpText="Feature your product offer in a separate page after checkout and before the order status page"
                checked={postPurchase}
                onChange={(value) => handleChange(value, "postPurchase")}
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
                    setManualBumpInfo({ ...manualBumpInfo, product: null });
                  }}
                >
                  Remove Product
                </Button>
              )}
            </div>
            <br />

            {product && (
              <Condition
                manualBumpInfo={manualBumpInfo}
                setManualBumpInfo={setManualBumpInfo}
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
                // setManualBumpInfo({ ...manualBumpInfo, product });
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
        manualBumpId={manualBumpId}
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
