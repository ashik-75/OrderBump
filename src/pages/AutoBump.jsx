import { Layout, Page, PageActions } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import AutoBumpHead from "../components/AutoBumpHead";
import AutoBumpOffer from "../components/AutoBumpOffer";
import AutoBumpProducts from "../components/AutoBumpProducts";
import AutoBumpSettings from "../components/AutoBumpSettings";
import AutoBumpSkeleton from "../components/AutoBumpSkeleton";
import processAutoBumpInput from "../customFunction/processAutoBumpInput";
import useAddAutoBump from "../hooks/useAddAutoBump";
import useFetchAutoBump from "../hooks/useFetchAutoBump";
import useUpdateAutoBump from "../hooks/useUpdateAutoBump";

const AutoBump = () => {
  const [autoBumpId, setAutoBumpId] = useState("6257f4e05b9b897dbfe08a44");

  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [settingsInfo, setSettingsInfo] = useState({
    skipDisplay: "",
    backup: false,
    prePurchase: false,
    postPurchase: false,
    discountAmount: null,
    discountType: "",
    fallbackProduct: null,
    fallbackProductHandle: "",
    selectedVariants: [],
    multiVariants: false,
    excludeProducts: [],
    excludeProductsHandles: [],
  });

  // query data

  // Add data
  const {
    data,
    mutate,
    isError,
    isLoading: isAddLoading,
    error,
  } = useAddAutoBump();

  // fetch data in traditional way:
  const {
    data: fetchData,
    isLoading: fetchLoading,
    isError: isFetchError,
    error: fetchError,
    isSuccess: fetchSuccess,
  } = useFetchAutoBump(autoBumpId);

  // Update data
  const {
    mutate: updateMutate,
    isLoading: isUpdateLoading,
    isSuccess: isUpdateSuccess,
    data: updateData,
  } = useUpdateAutoBump();

  // End Query data

  useEffect(() => {
    if (fetchData?.data && fetchSuccess) {
      setSettingsInfo(fetchData?.data);
    }
    if (data?.data) {
      setAutoBumpId(data?.data?._id);
    }
    if (updateData?.data && isUpdateSuccess) {
      setSettingsInfo(updateData?.data);
    }
  }, [isAddLoading, isUpdateLoading, fetchLoading]);

  const updateAutoBumpToServer = () => {
    const processedInput = processAutoBumpInput(settingsInfo);
    updateMutate({ id: autoBumpId, info: processedInput });
  };

  const saveDataToServer = () => {
    const processedInput = processAutoBumpInput(settingsInfo);
    mutate(processedInput);
    console.log(processedInput);
  };

  return isUpdateLoading || isAddLoading || fetchLoading ? (
    <AutoBumpSkeleton />
  ) : (
    <Page
      primaryAction={{
        content: autoBumpId ? "Update" : "Save",
        disabled: isDisableBtn,
        onAction: autoBumpId ? updateAutoBumpToServer : saveDataToServer,
      }}
    >
      <Layout>
        <Layout.Section>
          <AutoBumpHead />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpSettings
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpOffer
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
        <Layout.Section>
          <AutoBumpProducts
            setSettingsInfo={setSettingsInfo}
            settingsInfo={settingsInfo}
            setIsDisableBtn={setIsDisableBtn}
          />
        </Layout.Section>
      </Layout>

      <br />

      <PageActions
        primaryAction={{
          content: autoBumpId ? "Update" : "Save",
          disabled: isDisableBtn,
          onAction: autoBumpId ? updateAutoBumpToServer : saveDataToServer,
        }}
      />
    </Page>
  );
};

export default AutoBump;
